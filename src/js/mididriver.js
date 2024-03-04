// https://github.com/kchapelier/SimpleMidiInput.js/blob/master/README-MIDILEARN.md

// # SimpleMidiInput.js - MIDI Learn documentation

// MIDI Learn is a simple system used by many DAW and plugins to simplify the use of MIDI controllers.
// For web apps, the main advantage is that the MIDI binding doesn't have to be hardcoded.
// The users can effectively bind the parameters to the events of their choice.

// Example in Pro Tools : https://www.youtube.com/watch?v=fExGqNi4j5o

// SimpleMidiInput supports classic CC bindings as well as per-note velocity bindings
// (with support for aftertouch if the controller supports this feature).

// # Api reference

// ### smi.getMidiLearning(options)

// Returns an instance of MidiLearning.

// Must be called once per parameter so we have different instances for each of them.

// Options :

//  * id : A unique id for the parameter, can be any arbitrary string or number
//  * min : The minimum value of the parameter (will default to 0)
//  * max : The maximum value of the parameter (mandatory)
//  * value : The current value of the parameter
//  * events : An object containing the different events bound to the parameter

// Events :

//  * listen : Occurs when the parameter starts listening for a MIDI event to be bound to.
//  * cancel : Occurs when the parameter stops listening for a MIDI event to be bound to.
//  * bind : Occurs when the parameter is bound to a MIDI event.
//  * unbind : Occurs when the parameter is unbound.
//  * change : Occurs when the parameter is modified through the bound midi events. Receive the id and the value as arguments.

// ### midiLearning.startListening()

// Start listening for MIDI events to bind the parameter to.

// ### midiLearning.stopListening()

// Stop listening for MIDI events to bind the parameter to.

// ### midiLearning.unbind();

// Remove all the bindings of the parameter.

// # Example :

// ```html
// <input type="range" min="0" max="100" value="20" id="my-parameter" />
// <a id="my-parameter-learn">learn</a>
// <a id="my-parameter-clear">clear</a>
// ```

// ```js
// // standard instanciation of SimpleMidiInput
// var smi = new SimpleMidiInput();

// // get the DOM elements
// var input = document.getElementById('my-parameter');
// var learnButton = document.getElementById('my-parameter-learn');
// var clearButton = document.getElementById('my-parameter-clear');

// // custom function to handle the changes of value
// var change = function(value) {
//     console.log('parameter change:', value);
// };

// /** HERE STARTS THE ACTUAL CODE RELATED TO MIDI LEARN **/

// // we can set up the midi learning before smi is actually attached to a MIDIInput
// var midiLearning = smi.getMidiLearning({
//     id : input.id,
//     min : input.min,
//     max : input.max,
//     value : input.value,
//     events : {
//         bind : function() {
//             console.log('bind', arguments);
//         },
//         unbind : function() {
//             console.log('unbind', arguments);
//         },
//         listen : function() {
//             console.log('listen', arguments);
//         },
//         cancel : function() {
//             console.log('cancel', arguments);
//         },
//         change : function(id, value) {
//             console.log('change', arguments);
//             input.value = value;
//             change(value); // apply the change to our custom function
//         }
//     }
// });

// // start listening to midi events to bind the parameter to when clicking on 'learn'
// learnButton.addEventListener('click', function() {
//     midiLearning.startListening();
// });

// // clear the midi bindings (and cancel the listener) when clicking on 'clear'
// clearButton.addEventListener('click', function() {
//     midiLearning.unbind();
// });

// /** HERE ENDS THE ACTUAL CODE RELATED TO MIDI LEARN **/

// // make so direct changes to the input also affects the parameters
// input.addEventListener('change', function() {
//     change(input.value); // apply the change to our custom function
// });

// // attaching SMI to the MIDI inputs
// var onMIDIStarted = function(midi) {
//     console.log('onMIDIStarted', midi);
//     smi.attach(midi);
// };

// var onMIDISystemError = function() {
//     console.log('onMIDISystemError', arguments);
// };

// navigator.requestMIDIAccess().then( onMIDIStarted, onMIDISystemError );
// ```



(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleMidiInput = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
    
    module.exports = require('./src/simple-midi-input');
    
    },{"./src/simple-midi-input":4}],2:[function(require,module,exports){
    "use strict";
    
    var MidiLearning = require('./midi-learning');
    
    var MidiLearn = function (smi) {
        this.smi = smi;
        this.bindings = {};
    };
    
    MidiLearn.prototype.smi = null;
    MidiLearn.prototype.currentMidiLearning = null;
    MidiLearn.prototype.bindings = null;
    
    MidiLearn.prototype.getMidiLearning = function (options) {
        return new MidiLearning(this, options);
    };
    
    MidiLearn.prototype.listenerForBinding = function (event) {
        if (this.currentMidiLearning && event) {
            var midiLearning = this.currentMidiLearning;
    
            midiLearning.events.bind(event);
    
            this.stopListeningForBinding();
    
            this.addBinding(midiLearning, event);
        }
    };
    
    MidiLearn.prototype.startListeningForBinding = function (midiLearning) {
        this.stopListeningForBinding();
        this.currentMidiLearning = midiLearning;
    
        midiLearning.listener = this.listenerForBinding.bind(this);
    
        midiLearning.events.listen(midiLearning);
    
        this.smi.on('global', midiLearning.listener);
    };
    
    MidiLearn.prototype.stopListeningForBinding = function (midiLearning) {
        if (this.currentMidiLearning !== null && (!midiLearning || this.currentMidiLearning === midiLearning)) {
            this.smi.off('global', this.currentMidiLearning.listener);
            this.currentMidiLearning.events.cancel();
            this.currentMidiLearning = null;
        }
    };
    
    MidiLearn.prototype.setCallback = function (midiLearning, eventName, func) {
        midiLearning.activeCallbacks[eventName] = func;
        this.smi.on(eventName, midiLearning.channel, func);
    };
    
    MidiLearn.prototype.removeBinding = function (midiLearning) {
        if (midiLearning && midiLearning.activeCallbacks) {
            var callbacks = midiLearning.activeCallbacks;
    
            for (var key in callbacks) {
                if (callbacks.hasOwnProperty(key)) {
                    this.smi.off(key, midiLearning.channel, callbacks[key]);
                }
            }
    
            midiLearning.activeCallbacks = {};
        }
    
        delete this.bindings[midiLearning.id];
    };
    
    MidiLearn.prototype.addBinding = function (midiLearning, event) {
        this.removeBinding(midiLearning);
    
        this.bindings[midiLearning.id] = midiLearning;
    
        if (event.event === 'cc') {
            this.addCCBinding(midiLearning, event);
        } else if (event.event === 'noteOn') {
            this.addNoteBinding(midiLearning, event);
        }
    };
    
    MidiLearn.prototype.addNoteBinding = function (midiLearning, event) {
        midiLearning.channel = event.channel;
    
        this.setCallback(midiLearning, 'noteOn', function (e) {
            if (e.key === event.key) {
                midiLearning.setValue(e, 'velocity');
            }
        });
    
        this.setCallback(midiLearning, 'noteOff', function (e) {
            if (e.key === event.key) {
                midiLearning.setValue();
            }
        });
    
        this.setCallback(midiLearning, 'polyphonicAftertouch', function (e) {
            if (e.key === event.key) {
                midiLearning.setValue(e, 'pressure');
            }
        });
    };
    
    MidiLearn.prototype.addCCBinding = function (midiLearning, event) {
        midiLearning.channel = event.channel;
    
        this.setCallback(midiLearning, 'cc' + event.cc, function (e) {
            midiLearning.setValue(e, 'value');
        });
    };
    
    module.exports = MidiLearn;
    
    },{"./midi-learning":3}],3:[function(require,module,exports){
    "use strict";
    
    /**
     * Generate a random id
     * @returns {Number}
     */
    var generateRandomId = function () {
        return (new Date()).getTime() + Math.floor(Math.random() * 1000000);
    };
    
    var scale = function scale (value, min, max, dstMin, dstMax) {
        value = (max === min ? 0 : (Math.max(min, Math.min(max, value)) / (max - min)));
    
        return value * (dstMax - dstMin) + dstMin;
    };
    
    var limit = function limit (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };
    
    var MidiLearning = function (midiLearn, options) {
        var noop = function () {};
    
        this.midiLearn = midiLearn;
    
        this.id = options.id || generateRandomId();
        this.min = parseFloat(options.min || 0);
        this.max = parseFloat(options.max);
        this.channel = null;
        this.activeCallbacks = {};
    
        this.events = {
            change: options.events.change || noop,
            bind: options.events.bind || noop,
            unbind: options.events.unbind || noop,
            cancel: options.events.cancel || noop,
            listen: options.events.listen || noop
        };
    
        this.setValue(limit(parseFloat(options.value || 0), this.min, this.max));
    };
    
    MidiLearning.prototype.id = null;
    MidiLearning.prototype.min = null;
    MidiLearning.prototype.max = null;
    MidiLearning.prototype.value = null;
    MidiLearning.prototype.channel = null;
    MidiLearning.prototype.activeCallbacks = null;
    MidiLearning.prototype.events = null;
    
    MidiLearning.prototype.unbind = function () {
        this.midiLearn.removeBinding(this);
    };
    
    MidiLearning.prototype.startListening = function () {
        this.midiLearn.startListeningForBinding(this);
    };
    
    MidiLearning.prototype.stopListening = function () {
        this.midiLearn.startListeningForBinding(this);
    };
    
    MidiLearning.prototype.setValue = function (event, property) {
        var value;
    
        if (event && property) {
            value = scale(event[property], 0, 127, this.min, this.max);
        } else if (typeof event === 'number') {
            value = event;
        } else {
            value = this.min;
        }
    
        if (value !== this.value) {
            this.value = value;
            this.events.change(this.id, value);
        }
    };
    
    module.exports = MidiLearning;
    
    },{}],4:[function(require,module,exports){
    "use strict";
    
    // TOUPDATE get rid of gulp altogether
    // TOUPDATE const, let
    // TOUPDATE use more modern js
    // TOUPDATE do away with the var XX = function ...
    
    var MidiLearn = require('./midi-learn');
    
    /**
     * Returns whether a value is numeric
     * @param {*} value
     * @returns {boolean}
     */
    var isNumeric = function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    
    /**
     * Returns whether a value is an array
     * @param {*} value
     * @returns {boolean}
     */
    var isArray = function (value) {
        // TOUPDATE use Array.isArray
        return Object.prototype.toString.call(value) === '[object Array]';
    };
    
    /**
     * Returns whether a value is a MIDIInputMap
     * @param {*} value
     * @returns {boolean}
     */
    var isMIDIInputMap = function (value) {
        return Object.prototype.toString.call(value) === '[object MIDIInputMap]';
    };
    
    /**
     * Returns whether a value is a MIDIInput
     * @param {*} value
     * @returns {boolean}
     */
    var isMIDIInput = function (value) {
        return Object.prototype.toString.call(value) === '[object MIDIInput]';
    };
    
    /**
     * Returns whether a value is a MIDIAccess
     * @param {*} value
     * @returns {boolean}
     */
    var isMIDIAccess = function (value) {
        return Object.prototype.toString.call(value) === '[object MIDIAccess]';
    };
    
    /**
     * Returns whether a value is a function
     * @param {*} value
     * @returns {boolean}
     */
    var isFunction = function (value) {
        return typeof value === 'function';
    };
    
    /**
     * Returns whether a value is an iterator
     * @param {*} value
     * @returns {boolean}
     */
    var isIterator = function (value) {
        // TOUPDATE use better way to check for iterator, without regex
        var objectString = Object.prototype.toString.call(value);
        return objectString === '[object Iterator]' || !!objectString.match(/^\[object( | [^ ]+ )Iterator\]$/);
    };
    
    /**
     * Force whatever it receive to an array of MIDIInput when possible
     * @param {Function|Iterator|MIDIAccess|MIDIInputMap|MIDIInput|MIDIInput[]} source
     * @returns {MIDIInput[]} Array of MIDIInput
     */
    var normalizeInputs = function (source) {
        var inputs = [],
            input;
    
        if (isMIDIInput(source)) {
            inputs.push(source);
        } else {
            if (isMIDIAccess(source)) {
                source = source.inputs;
            }
    
            if (isFunction(source)) {
                source = source();
            } else if (isMIDIInputMap(source)) {
                source = source.values();
            }
    
            if (isArray(source)) {
                inputs = source;
            } else if (isIterator(source)) {
                // TOUPDATE use Array.from()
                while (input = source.next().value) {
                    inputs.push(input);
                }
            }
        }
    
        return inputs;
    };
    
    /**
     * Convert Variable Length Quantity to integer
     * @param {int} first LSB
     * @param {int} second MSB
     * @returns {int} Standard integer
     */
    var readVLQ = function (first, second) {
        return (second << 7) + (first & 0x7F);
    };
    
    /**
     * Instanciate a SimpleMidiInput object
     * @param {MIDIInput|MIDIInput[]} [midiInput]
     * @constructor
     */
    var SimpleMidiInput = function (midiInput) {
        this.events = {};
        this.innerEventListeners = {};
    
        if (midiInput) {
            this.attach(midiInput);
        }
    };
    
    SimpleMidiInput.prototype.filter = null;
    SimpleMidiInput.prototype.events = null;
    SimpleMidiInput.prototype.innerEventListeners = null;
    
    /**
     * Attach this instance to one or several MIDIInput
     * @param {MIDIAccess|MIDIInputMap|MIDIInput|MIDIInput[]} midiInput
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.attach = function (midiInput) {
        var inputs = normalizeInputs(midiInput);
    
        for (var i = 0; i < inputs.length; i++) {
            this.attachIndividual(inputs[i]);
        }
    
        return this;
    };
    
    /**
     * Attach this instance to a given MIDIInput
     * @private
     * @param {MIDIInput} midiInput
     */
    SimpleMidiInput.prototype.attachIndividual = function (midiInput) {
        if (!this.innerEventListeners[midiInput.id]) {
            var originalListener = midiInput.onmidimessage,
                listener,
                self = this;
    
            if (typeof originalListener === 'function') {
                listener = function (event) {
                    originalListener(event);
                    self.processMidiMessage(event.data);
                };
            } else {
                listener = function (event) {
                    self.processMidiMessage(event.data);
                };
            }
    
            midiInput.onmidimessage = listener;
    
            this.innerEventListeners[midiInput.id] = {
                input: midiInput,
                listener: listener
            };
        }
    };
    
    /**
     * Detach this instance from one or several MIDIInput
     * @param {MIDIAccess|MIDIInputMap|MIDIInput|MIDIInput[]} midiInput
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.detach = function (midiInput) {
        var inputs = normalizeInputs(midiInput);
    
        for (var i = 0; i < inputs.length; i++) {
            this.detachIndividual(inputs[i]);
        }
    
        return this;
    };
    
    /**
     * Detach this instance from a given MIDIInput
     * @private
     * @param {MIDIInput} midiInput
     */
    SimpleMidiInput.prototype.detachIndividual = function (midiInput) {
        if (!!this.innerEventListeners[midiInput.id]) {
            var listener = this.innerEventListeners[midiInput.id].listener;
            midiInput = this.innerEventListeners[midiInput.id].input;
    
            midiInput.removeEventListener("midimessage", listener);
            delete this.innerEventListeners[midiInput.id];
        }
    };
    
    /**
     * Detach this instance from everything
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.detachAll = function () {
        for (var id in this.innerEventListeners) {
            if (this.innerEventListeners.hasOwnProperty(id)) {
                var midiInput = this.innerEventListeners[midiInput.id].input;
                var listener = this.innerEventListeners[midiInput.id].listener;
    
                midiInput.removeEventListener("midimessage", listener);
            }
        }
    
        this.innerEventListeners = {};
    
        return this;
    };
    
    /**
     * Parse an incoming midi message
     * @private
     * @param {UInt8Array} data - Midi mesage data
     * @returns {Object} Midi event, as a readable object
     */
    SimpleMidiInput.prototype.parseMidiMessage = function (data) {
        
        //Uncomment to monitor all raw midi messages. by Eddy K. Dong
        //console.log(data);

        var event;
        switch (data[0]) {
            case 0x00:
                //some iOS app are sending a massive amount of seemingly empty messages, ignore them
                return null;
            case 0xF2:
                event = {
                    event: 'songPosition',
                    position: readVLQ(data[1], data[2]),
                    data: data
                };
                break;
            case 0xF3:
                event = {
                    event: 'songSelect',
                    song: data[1],
                    data: data
                };
                break;
            case 0xF6:
                event = {
                    event: 'tuneRequest',
                    data: data
                };
                break;
            case 0xF8:
                event = {
                    event: 'clock',
                    command: 'clock',
                    data: data
                };
                break;
            case 0xFA:
                event = {
                    event: 'clock',
                    command: 'start',
                    data: data
                };
                break;
            case 0xFB:
                event = {
                    event: 'clock',
                    command: 'continue',
                    data: data
                };
                break;
            case 0xFC:
                event = {
                    event: 'clock',
                    command: 'stop',
                    data: data
                };
                break;
            case 0xFE:
                event = {
                    event: 'activeSensing',
                    data: data
                };
                break;
            case 0xFF:
                event = {
                    event: 'reset',
                    data: data
                };
                break;
        }
    
        if (data[0] >= 0xE0 && data[0] < 0xF0) {
            event = {
                event: 'pitchWheel',
                channel: 1 + data[0] - 0xE0,
                value: readVLQ(data[1], data[2]) - 0x2000,
                data: data
            };
        } else if (data[0] >= 0xD0 && data[0] < 0xE0) {
            event = {
                event: 'channelAftertouch',
                channel: 1 + data[0] - 0xD0,
                pressure: data[1],
                data: data
            };
        } else if (data[0] >= 0xC0 && data[0] < 0xD0) {
            event = {
                event: 'programChange',
                channel: 1 + data[0] - 0xC0,
                program: data[1],
                data: data
            };
        } else if (data[0] >= 0xB0 && data[0] < 0xC0) {
            // New event added by Eddy K. Dong
            event = {
                event: 'control',
                channel: 1 + data[0] - 0xB0,
                controlId: data[1],
                value: data[2]
            }
            // For event "control": controlID for Arturia MiniLab3 Midi Keyboard

            // The Black Knob truning: 114;
            // Assigned with Channel 1, value ranging from 61 ~ 66
            // The Black Knob pressing: 115;
            // Assigned with Channel 1, values includes 0 and 127

            // Knob 1: 74;	Knob 2: 71; Knob 3: 76; Knob 4: 77;
            // Knob 5: 93;	Knob 6: 18; Knob 7: 19; Knob 8: 16;
            // Fader 1: 82; Fader 2: 83; Fader 3: 85; Fader 4: 17;
            // Assigned with Channel 1, value ranging from 0 ~ 127

            // Main Volume: 1; 
            // Assigned with Selected Channel, value ranging from 0 ~ 127

            // Repeat Button (Hold Shift to access): 105; Stop Button: 106; Play Button: 107; Record Button: 108;
            // Assigned with Channel 1, values include 0 (key release) and 127 (key press)

            // Shift Button: 9;
            // Assigned with Channel 1, values include 0 (key release) and 127 (key press)

            // Original code from the author - not working properly...
            // event = {
            //     event: 'cc',
            //     channel: 1 + data[0] - 0xB0,
            //     cc: data[1],
            //     value: data[2],
            //     data: data
            // };
        } else if (data[0] >= 0xA0 && data[0] < 0xB0) {
            event = {
                event: 'polyphonicAftertouch',
                channel: 1 + data[0] - 0xA0,
                key: data[1],
                pressure: data[2],
                data: data
            };
        } else if (data[0] >= 0x90 && data[0] < 0xA0) {
            event = {
                event: 'noteOn',
                channel: 1 + data[0] - 0x90,
                key: data[1],
                velocity: data[2],
                data: data
            };
    
            //abstracting the fact that a noteOn with a velocity of 0 is supposed to be equal to a noteOff message
            if (event.velocity === 0) {
                event.velocity = 127;
                event.event = 'noteOff';
            }
        } else if (data[0] >= 0x80 && data[0] < 0x90) {
            event = {
                event: 'noteOff',
                channel: 1 + data[0] - 0x80,
                key: data[1],
                velocity: data[2],
                data: data
            };
        } 
    
        if (!event) {
            event = {
                event: 'unknown',
                data: data
            };
        }
    
        return event;
    };
    
    /**
     * Process an incoming midi message and trigger the matching event
     * @private
     * @param {UInt8Array} data - Midi mesage data
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.processMidiMessage = function (data) {
        var event = this.parseMidiMessage(data);
    
        if (event) {
            if (this.filter) {
                if (this.filter(event) === false) {
                    return this;
                }
            }
    
            if (!!event.cc) {
                this.trigger(event.event + event.cc, event);
                this.trigger(event.channel + '.' + event.event + event.cc, event);
            } else {
                this.trigger(event.event, event);
                if (!!event.channel) {
                    this.trigger(event.channel + '.' + event.event, event);
                }
            }
    
            this.trigger('global', event);
        }
    
        return this;
    };
    
    /**
     * Set the filter function
     * @param {Function} [filter] - Filter function
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.setFilter = function (filter) {
        if (isFunction(filter)) {
            this.filter = filter;
        } else {
            delete this.filter;
        }
    
        return this;
    };
    
    /**
     * Subscribe to an event
     * @param {String} event - Name of the event
     * @param {Number} [channel] - Channel of the event
     * @param {Function} func - Callback for the event
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.on = function (event, channel, func) {
        if (isFunction(channel)) {
            func = channel;
        } else if (isNumeric(channel)) {
            event = channel + '.' + event;
        }
    
        if (!this.events[event]) {
            this.events[event] = [];
        }
    
        this.events[event].push(func);
    
        return this;
    };
    
    /**
     * Unsubscribe to an event
     * @param {String} event - Name of the event
     * @param {Number} [channel] - Channel of the event
     * @param {Function} [func] - Callback to remove (if none, all are removed)
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.off = function (event, channel, func) {
        if (isFunction(channel)) {
            func = channel;
        } else if (isNumeric(channel)) {
            event = channel + '.' + event;
        }
    
        if (!func) {
            delete this.events[event];
        } else {
            var pos = this.events[event].indexOf(func);
            if (pos >= 0) {
                this.events[event].splice(pos, 1);
            }
        }
    
        return this;
    };
    
    /**
     * Trigger an event
     * @param {String} event - Name of the event
     * @param {Array} args - Arguments to pass to the callbacks
     * @returns {SimpleMidiInput} Instance for method chaining
     */
    SimpleMidiInput.prototype.trigger = function (event, args) {
        if (!!this.events[event] && this.events[event].length) {
            for (var l = this.events[event].length; l--;) {
                this.events[event][l].call(this, args);
            }
        }
    
        return this;
    };
    
    /**
     * Return an instance of the MidiLearn handling class
     * @private
     * @returns {MidiLearn} Instance of MidiLearn
     */
    SimpleMidiInput.prototype.getMidiLearnInstance = function () {
        if (!this.midiLearn) {
            this.midiLearn = new MidiLearn(this);
        }
    
        return this.midiLearn;
    };
    
    /**
     * Return an instance of MidiLearning for a given parameter
     * @param {Object} options - Options of the parameter (id, min, max, value, events)
     * @returns {MidiLearning}
     */
    SimpleMidiInput.prototype.getMidiLearning = function (options) {
        return this.getMidiLearnInstance().getMidiLearning(options);
    };
    
    module.exports = SimpleMidiInput;
    
    },{"./midi-learn":2}]},{},[1])(1)
    });
