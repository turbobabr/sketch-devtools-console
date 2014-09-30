// (control v)
#import './../cocoascript_modules/sketch-devtools-console/console.js'

var layer=selection.firstObject();
if(layer) {

    console.className(layer);
    console.className("Selected layer class: ",layer);
    console.className(layer.style().fill());
    console.className(selection);

    console.className([1,2,3,4,5]);
    console.className({
        type: "log",
        value: "Sample Log"
    });
    console.className("Yo!");
    console.className(function(){ print("Yo!"); });
}