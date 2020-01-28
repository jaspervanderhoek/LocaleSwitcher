/*global logger*/
/*
    LocaleTester
    ========================

    @file      : LocaleTester.js
    @version   : 
    @author    : Jasper van der Hoek
    @date      : Thu, 28 Jan 2016 04:09:01 GMT
    @copyright : 
    @license   : MIT License 

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "LocaleTester/lib/jquery-1.11.2",
    "LocaleTester/lib/jstz",
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery, jstz) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("LocaleTester.widget.LocaleTester", [ _WidgetBase ], {
        // DOM elements
        inputNodes: null,
        colorSelectNode: null,
        colorInputNode: null,
        infoTextNode: null,

        // Parameters configured in the Modeler.
        mfToExecute: "",
        messageString: "",
        backgroundColor: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,
        blocked: false,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            // Uncomment the following line to enable debug messages
            //logger.level(logger.DEBUG);
            logger.debug(this.id + ".constructor");
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            logger.debug(this.id + ".postCreate");
//            this._evaluateLocale();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            //Don't subscribe we don't care about future updates
            //this._resetSubscriptions();
            this._evaluateLocale();

            callback();
        },

        // Rerender the interface.
        _evaluateLocale: function() {
            logger.debug(this.id + "._evaluateLocale");

            if( !this._contextObj ) {
                return;
            }
            
            var curJsTz = jstz.determine().name();
            
            var diff = this._contextObj.get( this.Timezone ) != curJsTz || this._contextObj.get( this.Locale ) != navigator.language;
            
            if( !this.blocked ) {
                this._contextObj.set( this.Timezone, curJsTz );
                this._contextObj.set( this.Locale, navigator.language );

                if( this.microflow ) {
                    this._execMf();
                }
            }
        },

        _execMf: function () { 
            console.log(this.id + '._execMf');
            
            var self = this,
                guids = [this._contextObj.getGuid()],
                mf = this.microflow;
                mx.data.action({
                    params: {
                        applyto: "selection",
                        actionname: mf,
                        guids: guids
                    },
                    callback: function (result) {
                        //this._blocked = false;
                        if( result != '' )
                            try {
                                eval( result );
                            }
                            catch( e ) {
                                console.error('Unable to process the result from mf: ' + self.mf + ' instructions: [' + result + '] ', error);
                            }
                    },
                    error: function (error) {
                        //this._blocked = false;
                        console.warn('Error executing mf: ' + self.mf, error);
                    }
                });
        },
        
        // Reset subscriptions.
        _resetSubscriptions: function() {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            if (this._handles) {
                dojoArray.forEach(this._handles, function (handle) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                var objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: dojoLang.hitch(this, function(guid) {
                        this._evaluateLocale();
                    })
                });


                this._handles = [ objectHandle ];
            }
        }
    });
});

require(["LocaleTester/widget/LocaleTester"], function() {
    "use strict";
});
