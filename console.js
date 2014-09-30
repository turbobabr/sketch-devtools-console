// console.js
// http://github.com/turbobabr/sketch-devtools-console
// (c) 2014 Andrey Shakhmin
// May be freely distributed under the MIT license.

(function(){

    var root = this;
    var console = {};

    var type = {
        isNSObject: function(obj) {
            return toString.call(obj)=="[object MOBoxedObject]";
        },
        isKindOfClass: function(obj,cls) {
            return obj.isKindOfClass(cls.class());
        },
        isObject: function(obj) {
            return toString.call(obj)=="[object Object]";
        },
        isArray: function(obj) {
            return toString.call(obj)=="[object Array]";
        },
        isFunction: function(obj) {
            return toString.call(obj)=="[object Function]";
        },
        isNumber: function(obj) {
            return toString.call(obj)=="[object Number]";
        },
        isBoolean: function(obj) {
            return toString.call(obj)=="[object Boolean]";
        },
        isRegExp: function(obj) {
            return toString.call(obj)=="[object RegExp]";
        },


        isUndefined: function(obj) {
            return obj === void 0;
        },
        isDefined: function(obj) {
            return !this.isUndefined(obj);
        },
        isNull: function(obj) {
            return false;
        }
    };


    var customClassRenderers = {
        "MSColor" : function(obj) {
            var hexValue=obj.hexValue();
            print("<span class='label' style='background-color: #"+hexValue+";'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> #"+hexValue);
        }

    };


    function escapeHTML(string) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;',
            "\n": "<br>",
            "    ": "&nbsp;&nbsp;&nbsp;&nbsp;"
        };

        return String(string).replace(new RegExp("[&<>\"'\/\\n]",'g'), function (s) {
            return entityMap[s];
        }).replace(/    /g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }

    function isDevToolsInitialized() {
        return NSClassFromString("SketchConsole")!=null;
    }

    console.clear = function() {
        if(isDevToolsInitialized()) {
            SketchConsole.clearConsole();
        }
    };

    console._indents=0;
    console.group = function(label) {
        this.log("<strong>"+label+"</strong>");
        this._indents++;
    };

    console.groupEnd = function() {
        this._indents--;
    };

    console.indent = function(times) {
        var times = type.isDefined(times) ? times : 1;
        this._indents+=times;
    };

    console.unindent = function(times) {
        var times = type.isDefined(times) ? times : 1;

        if(times!=0) this._indents-=times;
        else this._indents=0;
    };

    console._times = [];
    console.time = function(label) {
        this._times[label]=Date.now();
        return label;
    };

    console.timeEnd = function(label) {
        var time = this._times[label];
        if(!time) {
            throw new Error("Console Error - No such label: "+label);
        }

        var duration = Date.now()-time;
        print(label+": "+duration+"ms");
    };

    console.log =  function(obj) {

        if(type.isNSObject(obj) && type.isKindOfClass(obj,NSImage)) {
            this.logImage(obj);
            return;
        }

        if(type.isNSObject(obj) && false) {
            var className=obj.className();
            if(customClassRenderers[className]) {
                customClassRenderers[className](obj);
                return;
            }
        }

        if(this._indents>0) {
            var s="";
            for(var i=0;i<this._indents;i++) {
                s+="&nbsp;&nbsp;&nbsp;&nbsp;"
            }
            print(s+obj);
            return;
        }

        print(obj);
    };

    console.normalizeObject = function(obj) {

        if(toString.call(obj)=="[object MOBoxedObject]") {
            if (!obj.isKindOfClass(NSString.class())) {
                obj=obj.description();
            }
            obj = escapeHTML(obj);
        } else {
            obj=obj.toString();
        }

        return obj;
    };

    console.tag = function(tag,obj,level) {
        var level = level || "default";
        var obj = obj || "";
        obj = this.normalizeObject(obj);
        if(obj.indexOf("<br>")>-1) {
            obj="<br>"+obj;
        }
        print("<span class='label label-"+level+"'>"+tag+":</span> "+obj);
    };

    console.assert = function(condition,obj) {
        if(condition) return;
        print("<span style='color: #FF0000;'><i class='fa fa-times-circle'></i></span> <span style='color: #FF0000;'>"+this.normalizeObject(obj)+"</span>");
    };

    console.header = function(title,level) {
        var level = level || 5;
        var open="<h"+level+">", close="</h"+level+">";
        print(open+title+close);
    };

    console.h1 = function(title) { this.header(title,1); };
    console.h2 = function(title) { this.header(title,2); };
    console.h3 = function(title) { this.header(title,3); };
    console.h4 = function(title) { this.header(title,4); };
    console.h5 = function(title) { this.header(title,5); };
    console.h6 = function(title) { this.header(title,6); };


    console.quote = function(obj) {
        print("<blockquote>"+this.normalizeObject(obj)+"</blockquote>")
    };

    console.small = function(obj) {
        print("<small>"+this.normalizeObject(obj)+"</small>")
    };

    console.pre = function(obj) {
        print("<pre>"+this.normalizeObject(obj)+"</pre>")
    };


    console.model = function(obj) {
        if(obj.treeAsDictionary) {
            var tree=obj.treeAsDictionary();

            this.className(tree);
            // print(tree);

            function prepareObject(obj) {
                var str="<ul>";
                for(var prop in obj) {

                    str+="<li>";

                    if(prop=="<class>") {

                        // str+="class";
                    } else {
                        str+="<span>"+prop+": </span>"+obj[prop].class();
                    }

                    str+=prepareObject(obj[prop])


                    str+="</li>";
                }
                str+="</ul>";

                return str;
            }

            print(prepareObject(tree));
        }
    };

    console.className = function() {
        var label="Class Name";
        var obj = {};

        function logClassName() {
            if(type.isNSObject(obj) && obj.className) {
                print("<strong>"+label+": </strong>"+"<span class='label label-primary'>"+obj.className()+"</span>");
            } else {
                print("<strong>"+label+": </strong>"+"<span class='label label-primary'>"+toString.call(obj)+"</span>");
            }
        }

        if(arguments.length==1) {
            obj = arguments[0];
            label = !type.isNSObject(obj) ? "Object Type" : label;
            logClassName();
        } else if(arguments.length==2) {
            label = arguments[0];
            obj = arguments[1];
            logClassName();
        } else {
            this.assert(false,"console.className: Invalid arguments!");
        }
    };

    console.marker = function(marker,level) {
        print(marker);
    };

    console.logImage = function(img) {
        var imgRep = [[img representations] objectAtIndex: 0];
        var data = [imgRep representationUsingType: NSPNGFileType properties: nil];

        var str=[data base64EncodedStringWithOptions:0];

        var dataFormatString = "data:image/png;base64,%@";
        var dataString = [NSString stringWithFormat:dataFormatString, str];

        print("<img src='"+dataString+"'>");
    };

    console.callout = function(title,contents,level) {
        // var template="<div class='bs-callout bs-callout-{{level}}'><h4><span class='label label-{{level}}'>{{symbol}}</span> {{errorTitle}}: </h4><p>{{errorMessage}}</p> <p><a href='{{link}}'>{{fileName}}</a></p></div>";
        print("<div class='bs-callout bs-callout-warning'><h4>Title</h4></div>");
    };

    console.section = function(obj) {
        //this.h4(this.normalizeObject(obj));
        var html="<div class='text-center console-header console-header-success'>";
        html+="<h4>";
        html+=this.normalizeObject(obj);
        html+="</h4>";
        html+="</div>"
        this.customLog(html);
    };

    console.customLog = function(obj) {
        if(isDevToolsInitialized()) {
            SketchConsole.customPrint(obj);
        }
    };

    console.mixin = function(name,fn) {
        if(type.isDefined(this[name])) {
            throw new Error("Console: Function with name '"+name+"' is already defined.");
            return;
        }

        this[name]=fn;
    };

    console._counters={};
    console.count = function(label) {
        if(type.isDefined(this._counters[label])) {
            this._counters[label]++;
        } else {
            this._counters[label]=1;
        }

        print("<span class='text-primary'>"+label+":</span> <small><span class='badge'>"+this._counters[label]+"</span></small>");
    };

    root.console = console;

}).call(this);

