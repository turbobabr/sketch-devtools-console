// (control v)
#import './../cocoascript_modules/sketch-devtools-console/console.js'

var layer=selection.firstObject();
if(layer) {
    var frame=layer.frame();

    console.group("Layer Info:");
    console.log("name: "+layer.name());
    console.log("type: "+layer.className());

    console.group("Frame:");
    console.log("x: "+frame.x());
    console.log("y: "+frame.y());
    console.log("width: "+frame.width());
    console.log("height: "+frame.height());
    console.groupEnd();

    console.group("Fill:");
    console.log("color: #"+layer.style().fill().color().hexValue());
    console.log("fillType: "+layer.style().fill().fillType());
    console.groupEnd();

    console.log("We're done!");
}