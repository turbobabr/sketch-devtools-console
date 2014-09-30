// (control v)
#import './../cocoascript_modules/sketch-devtools-console/console.js'

var layer=selection.firstObject();
if(layer) {
    var frame=layer.frame();
    console.group("Layer Frame:");
    console.log("x: "+frame.x());
    console.log("y: "+frame.y());
    console.log("width: "+frame.width());
    console.log("height: "+frame.height());
    console.groupEnd();
}