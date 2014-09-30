sketch-devtools-console
=======================

A companion CocoaScript framework for Sketch DevTools Console module.

> *Note:* This framework is a part of [Sketch DevTools](http://github.com/turbobabr/sketch-devtools) project. Since this project is not released yet this framework is totally useless at the moment. Work in progress! :)

## Installation

TODO: Text goes here!

## Usage

```JavaScript
#import 'cocoascript_modules/console.js'
console.log("Hi Handsome! :)");
```

## Changelog

TODO: Text goes here!

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

## Contacts

## License

The MIT License (MIT)

Copyright (c) 2014 Andrey Shakhmin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.