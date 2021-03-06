import {DEFAULT_HEIGHT, DEFAULT_WIDTH, METHOD_NAMES, EVENT_NAMES} from './constants.js';

// One time setup globally to handle all zingchart-react objects in the app space.
if (!window.ZCWC) {
  window.ZCWC = {
    instances: {},
    count: 0
  };
  const wcStyle = document.createElement('style');
  wcStyle.innerHTML = '.zingchart-wc > * {visibility: hidden;}';
  document.head.appendChild(wcStyle);
}

class ZingChart extends HTMLElement {
  constructor() {
    super();
    this.id = '';
    this.observer = null;
    this.ID_PREFIX = 'zingchart-wc';

    // User properties
    this.chartData = null;
    this.palette = null;
    this.series = null;
    this.defaults = null;

    // Add the webcomponent class
    this.classList.add('zingchart-wc');
  }
  connectedCallback() {
    this.setup();
    this.parse();
    this.render();
    this.attachObservers();
  }

  attachObservers() {
    const data = {
      childList: true,
      attributes: true,
      subtree: true,
    }
    const callback = (mutationsList, observer) => {
      for(let mutation of mutationsList) {
        if(mutation.type === 'attributes') {
          switch(mutation.attributeName) {
            case 'data':
              this.rerender();
            break;
            case 'height':
            case 'width': 
              this.modifyDimensions();
            break;
            case 'values': 
              this.updateValues(mutation);
            break;
            case 'series' :
              this.updateSeries(mutation);
            break;
          }
        }
      }
    }
    this.observer = new MutationObserver(callback);
    this.observer.observe(this, data);
  }
  destroy() {
    // Destroy zingchart
    zingchart.exec(this.id, 'destroy');
    // Deattach the mutation observer
    this.observer.disconnect();

  }
  updateValues(mutation) {
    let target = mutation.target;
    const tagName = target.tagName.toLowerCase();
    if(tagName.includes('zc-series')) {
      const series = {
        values: JSON.parse(target.getAttribute('values')),
      }
      // If the binding occurs on a series entry rather than the entire series, we need the index.
      if(tagName.includes('zc-series-')) {
        series.plotindex = tagName.replace('zc-series-', '');
      }
      this.setseriesvalues(series);
    }
  }
  updateSeries(mutation) {
    let target = mutation.target;
    const tagName = target.tagName.toLowerCase();
    if(tagName.includes('zc-series')) {
      const config = {
        data: JSON.parse(target.getAttribute('series'))
      };
      // If the binding occurs on a series entry rather than the entire series, we need the index.
      if(tagName.includes('zc-series-')) {
        config.plotindex = tagName.replace('zc-series-', '');
      }
      this.setseriesdata(config);
    }
  }
  setup() {
    // Set the id for ZingChart to bind to
    this.id = `${this.ID_PREFIX}-${window.ZCWC.count++}`;
    this.setAttribute('id', this.id);

    // Apply all of ZingChart's methods directly to this element's instance
    METHOD_NAMES.forEach(name => {
      this[name] = args => {
        return zingchart.exec(this.id, name, args);
      };
    });

    // Attach given event names
    Object.keys(this.attributes).forEach(index => {
      const eventName = this.attributes[index].name;
      const functionName = this.attributes[index].value;
      // Bind all event names
      if(EVENT_NAMES.includes(eventName)) {
        zingchart.bind(this.id, eventName, result => {
          window[functionName](result);
        });
      }
    });

  }
  modifyDimensions() {
    zingchart.exec(this.id, "resize", {
      width: this.getAttribute('width') || DEFAULT_WIDTH,
      height: this.getAttribute('height') || DEFAULT_HEIGHT,
    });
  }
  rerender() {
    let data = this.getAttribute('data');
    try {
      zingchart.exec(this.id, 'setdata', {
        data: JSON.parse(data),
      });
    } catch(error) {
      console.log(error);
      console.error('Invalid chart configuration')
    }
  }
  parse() {
    // Check the user's properties
    this.chartData = this.getAttribute('data');
    let series = this.getAttribute('series');

    // Parse to JSON.
    if(this.chartData) {
      try {
        this.chartData = JSON.parse(this.chartData);
      } catch(error) {
        throw new Error('The provided data is not a proper JSON');
      }
    }
    if(series) {
      try {
        series = JSON.parse(series);
      } catch(error) {
        throw new Error('The provided series is not a proper JSON');
      }
    }

    // Merge the series and data
    if(!this.chartData) {
      this.chartData = {
        series,
      };
    } else if(this.chartData && series) {
      this.chartData.series = series;
    }

    // Inject the type from chart-specific components.
    if(this.type) {
      this.chartData.type = this.type;
    } 
    this.defaults = this.getAttribute('defaults');

    // Parse any innerhtml that the user provided that is prefixed with "zc" and convert it to json.
    this.parseChildren();

  }

  parseChildren() {
    return parse(this.children, this.chartData);

    function parse(children, chartData) {
      Array.from(children).forEach((element) => {
        let path = element.tagName.toLowerCase().replace('zc-', '').split('-');
        // Check the path for any -x/-y/-r etc properties. If there are, then we attach them back to the previous fragment.
        path = path.reduce((acc, part, index) => {
          if(part.length === 1) {
            acc[index-1] += '-' + part;
          } else {
            acc.push(part);
          }
          return acc;
        },[]);
        
  
        /* For every path, we add it's attributes to the config object. 
        If there are children elements, we tail-end recurse. 
        Otherwise we append the text if found/appropriate*/
  
        // Find the element
        let configTarget;
        if(Array.isArray(chartData)) {
          configTarget = {};
          chartData.push(configTarget);
        } else {
          configTarget = path.reduce((obj, tag) => {
            // Determine if the missing object should be an array or object. Thank you zingchart and the english language for ending plurals with an 's'!
            if(!obj[tag]) {
              obj[tag] = (tag.slice(-1) === 's') ? [] : {};
            } 
            return obj[tag];
          }, chartData);
        }

        /* 
          Determine if the terminating target should be an array or object, or has text.
          In the zingchart syntax, array based configs such as labels will have multiple instances.
        */
        // Add the attributes from the current
        Object.keys(element.attributes).forEach(index => {
          const attribute = element.attributes[index].name;
          let value = element.attributes[index].value;
          // Skip over any event listeners and any zing-data- properties
          if(!EVENT_NAMES.includes(attribute) && !attribute.includes('zing-data-')) {
            // Parse values in the case of series.
            if(typeof value === 'string' && value[0] === '[') {
              value = JSON.parse(value);
            }
            configTarget[attribute] = value || true;
          }
        });

        if(element.childNodes.length === 1 && element.childNodes[0].nodeName === '#text') {
          configTarget.text = element.childNodes[0].textContent;
        } 
        
        // Check to see if there are any children elements and recurse
        if(element.children) {

          parse(element.children, configTarget);
        }
      })
    }

  }

  render() {
    const config = {
      id: this.id,
      data: this.chartData,
      width: this.getAttribute('width') || DEFAULT_WIDTH,
      height: this.getAttribute('height') || DEFAULT_HEIGHT,
    };
    if(this.defaults) {
      config.defaults = defaults;
    }
    zingchart.render(config);

    // Only set the wrapper to visibility initial. We want to keep all other pseudo-components hidden
    this.querySelector(`#${this.id}-wrapper`).style.visibility = 'initial';
  }
}

export {ZingChart as default};
