// (control v)
#import './../cocoascript_modules/sketch-devtools-console/console.js'

var layer=selection.firstObject();
if(layer) {

    console.className(layer,"default");
    console.className(layer,"primary");
    console.className(layer,"success");
    console.className(layer,"warning");
    console.className(layer,"info");
    console.className(layer,"danger");
}