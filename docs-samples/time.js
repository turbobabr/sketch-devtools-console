// (control v)
#import './../cocoascript_modules/sketch-devtools-console/console.js'

console.time("Array initialize");

var data=[100000];
for(var i=0;i<100000;i++) {
    data[i]=new Object();
}

console.timeEnd("Array initialize");