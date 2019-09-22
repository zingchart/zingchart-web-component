import {zingchart, ZC} from './node_modules/zingchart/es6.js';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH, METHOD_NAMES, EVENT_NAMES} from './constants.js';

class ZingChart extends HTMLElement {
  constructor() {
    super();
    this.id = '';
    this.instance = {};
    this.count = 0;
    this.observer = null;
    this.ID_PREFIX = 'zingchart-wc';

    // User properties
    this.chartData = null;
    this.palette = null;
    this.series = null;
    this.defaults = null;
  }
  connectedCallback() {
    this.setup();
    this.parse();
    this.render();
    this.attachObservers();
  }

  attachObservers() {
    const data = {
      attributes: true,
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

  setup() {
    // Set the id for ZingChart to bind to
    this.id = `${this.ID_PREFIX}-${this.count++}`;
    this.setAttribute('id', this.id);

    // Apply all of ZingChart's methods directly to this element's instance
    METHOD_NAMES.forEach(name => {
      this[name] = args => {
        return zingchart.exec(id, name, args);
      };
    });

    // Attach given event names
    Object.keys(this.attributes).forEach(index => {
      const eventName = this.attributes[index].name;
      const functionName = this.attributes[index].value;
      // Bind all event names
      if(EVENT_NAMES.includes(eventName)) {
        zingchart.bind(id, eventName, result => {
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
      console.error('Invalid chart datauration')
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

    // Logic Validation - Check to see if there is a data - it's not required if the user is using a specific chart element. 
    if (!this.chartData && this.tagName === 'zing-chart') {
      throw new Error("A data is required to render a chart");
    } else if(!this.chartData && this.tagName !== 'zing-chart') {
      // Check to see if the user provided a series attribute.
      if(!series) {
        throw new Error("A series is required to render a chart");
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

    // Clear out any user provided syntax components.
    this.innerHTML = '';

    // Show the custom component
    this.style.visibility = 'initial';
  }

  parseChildren() {
    // return parse.call(this, this.children);
    return parse(this.children, this.chartData);

    function parse(children, chartData) {
      Array.from(children).forEach((element) => {
        const path = element.tagName.toLowerCase().replace('zc-', '').split('-');
  
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
          const value = element.attributes[index].value;
          // Skip over any event listeners
          if(!EVENT_NAMES.includes(attribute)) {
            configTarget[attribute] = value;
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
  }
}

export default ZingChart;