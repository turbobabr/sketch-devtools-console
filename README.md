sketch-devtools-console
=======================

A companion CocoaScript framework for Sketch DevTools Console module.

## Installation

TODO: Text goes here!

## Usage

```JavaScript
#import 'cocoascript_modules/console.js'
console.log("Hi Handsome! :)");
```

## Console API Reference

TODO: Text goes here!

### console.clear()

Clears the console.

```JavaScript
console.clear();
```

### console.count(label)

Writes the the number of times that `count()` has been invoked at the same line and with the same label.

```JavaScript
function processLayer(layer) {
    console.count("processLayer called");
    // processLayer() code...
}
```

### console.log(object [, object, ...])

TODO: Text goes here!

### console.indent(times)

TODO: Text goes here!

### console.unindent(times)

TODO: Text goes here!

### console.group(label)

TODO: Text goes here!

### console.groupEnd()

TODO: Text goes here!

### console.time(label)

Starts a new timer with an associated label. When `console.timeEnd()` is called with the same label, the timer is stopped the elapsed time displayed in the Console. Timer values are in milliseconds.

```JavaScript
console.time("Array initialize");

var data=[100000];
for(var i=0;i<100000;i++) {
    data[i]=new Object();
}

console.timeEnd("Array initialize");
```

TODO: Add sample image.

### console.timeEnd()

Stops the timer with the specified label and prints the elapsed time.

### console.tag(tag,str,level)

TODO: Text goes here!

### console.assert(condition,obj)

TODO: Text goes here!

### console.header(title,size)

TODO: Text goes here!

### console.model(obj)

TODO: Text goes here!

### console.className(label,obj)

TODO: Text goes here!

### console.logImage(image)

TODO: Text goes here!

### console.section(obj)

TODO: Text goes here!

### console.customLog(obj)

TODO: Text goes here!

### console.mixin(name,fn)

TODO: Text goes here!