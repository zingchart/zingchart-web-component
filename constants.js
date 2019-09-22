const DEFAULT_WIDTH = "100%";
const DEFAULT_HEIGHT = 480;
const EVENT_NAMES = [
  "animation_end",
  "animation_start",
  "animation_step",
  "modify",
  "node_add",
  "node_remove",
  "plot_add",
  "plot_modify",
  "plot_remove",
  "reload",
  "setdata",
  "data_export",
  "image_save",
  "print",
  "feed_clear",
  "feed_interval_modify",
  "feed_start",
  "feed_stop",
  "beforedestroy",
  "click",
  "complete",
  "dataparse",
  "dataready",
  "destroy",
  "guide_mousemove",
  "load",
  "menu_item_click",
  "resize",
  "Graph Events",
  "gcomplete",
  "gload",
  "History Events",
  "history_back",
  "history_forward",
  "Interactive Events",
  "node_deselect",
  "node_select",
  "plot_deselect",
  "plot_select",
  "legend_item_click",
  "legend_marker_click",
  "node_click",
  "node_doubleclick",
  "node_mouseout",
  "node_mouseover",
  "node_set",
  "label_click",
  "label_mousedown",
  "label_mouseout",
  "label_mouseover",
  "label_mouseup",
  "legend_marker_click",
  "shape_click",
  "shape_mousedown",
  "shape_mouseout",
  "shape_mouseover",
  "shape_mouseup",
  "plot_add",
  "plot_click",
  "plot_doubleclick",
  "plot_modify",
  "plot_mouseout",
  "plot_mouseover",
  "plot_remove",
  "about_hide",
  "about_show",
  "bugreport_hide",
  "bugreport_show",
  "dimension_change",
  "legend_hide",
  "legend_maximize",
  "legend_minimize",
  "legend_show",
  "lens_hide",
  "lens_show",
  "plot_hide",
  "plot_show",
  "source_hide",
  "source_show"
];
const METHOD_NAMES =[
  "addnode",
  "addplot",
  "appendseriesdata",
  "appendseriesvalues",
  "getseriesdata",
  "getseriesvalues",
  "modifyplot",
  "removenode",
  "removeplot",
  "set3dview",
  "setnodevalue",
  "setseriesdata",
  "setseriesvalues",
  "exportdata",
  "getimagedata",
  "print",
  "saveasimage",
  "Feed",
  "clearfeed",
  "getinterval",
  "setinterval",
  "startfeed",
  "stopfeed",
  "getcharttype",
  "getdata",
  "getgraphlength",
  "getnodelength",
  "getnodevalue",
  "getobjectinfo",
  "getplotlength",
  "getplotvalues",
  "getrender",
  "getrules",
  "getscales",
  "getversion",
  "getxyinfo",
  "get3dview"
];

export {DEFAULT_HEIGHT, DEFAULT_WIDTH, METHOD_NAMES, EVENT_NAMES};