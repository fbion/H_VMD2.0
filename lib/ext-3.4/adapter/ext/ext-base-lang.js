/*扩展ext的Array date function number object string*/
/**
 * @class Ext.String
 *
 * A collection of useful static methods to deal with strings.
 * @singleton
 */

Ext.String = (function () {
    var trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
        escapeRe = /('|\\)/g,
        formatRe = /\{(\d+)\}/g,
        escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g,
        basicTrimRe = /^\s+|\s+$/g,
        whitespaceRe = /\s+/,
        varReplace = /(^[^a-z]*|[^\w])/gi,
        charToEntity,
        entityToChar,
        charToEntityRegex,
        entityToCharRegex,
        htmlEncodeReplaceFn = function (match, capture) {
            return charToEntity[capture];
        },
        htmlDecodeReplaceFn = function (match, capture) {
            return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
        },
        boundsCheck = function (s, other) {
            if (s === null || s === undefined || other === null || other === undefined) {
                return false;
            }

            return other.length <= s.length;
        };

    return {

        /**
         * Inserts a substring into a string.
         * @param {String} s The original string.
         * @param {String} value The substring to insert.
         * @param {Number} index The index to insert the substring. Negative indexes will insert from the end of
         * the string. Example: 
         *
         *     Ext.String.insert("abcdefg", "h", -1); // abcdefhg
         *
         * @return {String} The value with the inserted substring
         */
        insert: function (s, value, index) {
            if (!s) {
                return value;
            }

            if (!value) {
                return s;
            }

            var len = s.length;

            if (!index && index !== 0) {
                index = len;
            }

            if (index < 0) {
                index *= -1;
                if (index >= len) {
                    // negative overflow, insert at start
                    index = 0;
                } else {
                    index = len - index;
                }
            }

            if (index === 0) {
                s = value + s;
            } else if (index >= s.length) {
                s += value;
            } else {
                s = s.substr(0, index) + value + s.substr(index);
            }
            return s;
        },

        /**
         * Checks if a string starts with a substring
         * @param {String} s The original string
         * @param {String} start The substring to check
         * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
         */
        startsWith: function (s, start, ignoreCase) {
            var result = boundsCheck(s, start);

            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    start = start.toLowerCase();
                }
                result = s.lastIndexOf(start, 0) === 0;
            }
            return result;
        },

        /**
         * Checks if a string ends with a substring
         * @param {String} s The original string
         * @param {String} start The substring to check
         * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
         */
        endsWith: function (s, end, ignoreCase) {
            var result = boundsCheck(s, end);

            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    end = end.toLowerCase();
                }
                result = s.indexOf(end, s.length - end.length) !== -1;
            }
            return result;
        },

        /**
         * Converts a string of characters into a legal, parse-able JavaScript `var` name as long as the passed
         * string contains at least one alphabetic character. Non alphanumeric characters, and *leading* non alphabetic
         * characters will be removed.
         * @param {String} s A string to be converted into a `var` name.
         * @return {String} A legal JavaScript `var` name.
         */
        createVarName: function (s) {
            return s.replace(varReplace, '');
        },

        /**
         * Convert certain characters (&, <, >, ', and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode.
         * @return {String} The encoded text.
         * @method
         */
        htmlEncode: function (value) {
            return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
        },

        /**
         * Convert certain characters (&, <, >, ', and ") from their HTML character equivalents.
         * @param {String} value The string to decode.
         * @return {String} The decoded text.
         * @method
         */
        htmlDecode: function (value) {
            return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
        },

        /**
         * Checks if a string has values needing to be html encoded.
         * @private
         * @param {String} The string to test
         * @return {Boolean} `true` if the string contains HTML characters
         */
        hasHtmlCharacters: function (s) {
            return charToEntityRegex.test(s);
        },

        /**
         * Adds a set of character entity definitions to the set used by
         * {@link Ext.String#htmlEncode} and {@link Ext.String#htmlDecode}.
         *
         * This object should be keyed by the entity name sequence,
         * with the value being the textual representation of the entity.
         *
         *      Ext.String.addCharacterEntities({
         *          '&amp;Uuml;':'Ü',
         *          '&amp;ccedil;':'ç',
         *          '&amp;ntilde;':'ñ',
         *          '&amp;egrave;':'è'
         *      });
         *      var s = Ext.String.htmlEncode("A string with entities: èÜçñ");
         *
         * __Note:__ the values of the character entities defined on this object are expected
         * to be single character values.  As such, the actual values represented by the
         * characters are sensitive to the character encoding of the JavaScript source
         * file when defined in string literal form. Script tags referencing server
         * resources with character entities must ensure that the 'charset' attribute
         * of the script node is consistent with the actual character encoding of the
         * server resource.
         *
         * The set of character entities may be reset back to the default state by using
         * the {@link Ext.String#resetCharacterEntities} method
         *
         * @param {Object} entities The set of character entities to add to the current
         * definitions.
         */
        addCharacterEntities: function (newEntities) {
            var charKeys = [],
                entityKeys = [],
                key, echar;
            for (key in newEntities) {
                echar = newEntities[key];
                entityToChar[key] = echar;
                charToEntity[echar] = key;
                charKeys.push(echar);
                entityKeys.push(key);
            }
            charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
            entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
        },

        /**
         * Resets the set of character entity definitions used by
         * {@link Ext.String#htmlEncode} and {@link Ext.String#htmlDecode} back to the
         * default state.
         */
        resetCharacterEntities: function () {
            charToEntity = {};
            entityToChar = {};
            // add the default set
            this.addCharacterEntities({
                '&amp;': '&',
                '&gt;': '>',
                '&lt;': '<',
                '&quot;': '"',
                '&#39;': "'"
            });
        },

        /**
         * Appends content to the query string of a URL, handling logic for whether to place
         * a question mark or ampersand.
         * @param {String} url The URL to append to.
         * @param {String} string The content to append to the URL.
         * @return {String} The resulting URL
         */
        urlAppend: function (url, string) {
            if (!Ext.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },

        /**
         * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
         *
         *     var s = '  foo bar  ';
         *     alert('-' + s + '-');                   //alerts "- foo bar -"
         *     alert('-' + Ext.String.trim(s) + '-');  //alerts "-foo bar-"
         *
         * @param {String} string The string to trim.
         * @return {String} The trimmed string.
         */
        trim: function (string) {
            return string.replace(trimRegex, "");
        },

        /**
         * Capitalize the given string
         * @param {String} string
         * @return {String}
         */
        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.substr(1);
        },

        /**
         * Uncapitalize the given string.
         * @param {String} string
         * @return {String}
         */
        uncapitalize: function (string) {
            return string.charAt(0).toLowerCase() + string.substr(1);
        },

        /**
         * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length.
         * @param {String} value The string to truncate.
         * @param {Number} length The maximum length to allow before truncating.
         * @param {Boolean} [word=false] `true` to try to find a common word break.
         * @return {String} The converted text.
         */
        ellipsis: function (value, len, word) {
            if (value && value.length > len) {
                if (word) {
                    var vs = value.substr(0, len - 2),
                    index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if (index !== -1 && index >= (len - 15)) {
                        return vs.substr(0, index) + "...";
                    }
                }
                return value.substr(0, len - 3) + "...";
            }
            return value;
        },

        /**
         * Escapes the passed string for use in a regular expression.
         * @param {String} string
         * @return {String}
         */
        escapeRegex: function (string) {
            return string.replace(escapeRegexRe, "\\$1");
        },

        /**
         * Escapes the passed string for ' and \
         * @param {String} string The string to escape
         * @return {String} The escaped string
         */
        escape: function (string) {
            return string.replace(escapeRe, "\\$1");
        },

        /**
         * Utility function that allows you to easily switch a string between two alternating values.  The passed value
         * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
         * they are already different, the first value passed in is returned.  Note that this method returns the new value
         * but does not change the current string.
         *
         *     // alternate sort directions
         *     sort = Ext.String.toggle(sort, 'ASC', 'DESC');
         *
         *     // instead of conditional logic:
         *     sort = (sort === 'ASC' ? 'DESC' : 'ASC');
         *
         * @param {String} string The current string.
         * @param {String} value The value to compare to the current string.
         * @param {String} other The new value to use if the string already equals the first value passed in.
         * @return {String} The new value.
         */
        toggle: function (string, value, other) {
            return string === value ? other : value;
        },

        /**
         * Pads the left side of a string with a specified character.  This is especially useful
         * for normalizing number and date strings.  Example usage:
         *
         *     var s = Ext.String.leftPad('123', 5, '0');
         *     // s now contains the string: '00123'
         *
         * @param {String} string The original string.
         * @param {Number} size The total length of the output string.
         * @param {String} [character=' '] (optional) The character with which to pad the original string.
         * @return {String} The padded string.
         */
        leftPad: function (string, size, character) {
            var result = String(string);
            character = character || " ";
            while (result.length < size) {
                result = character + result;
            }
            return result;
        },

        /**
         * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
         * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
         *
         *     var cls = 'my-class',
         *         text = 'Some text';
         *     var s = Ext.String.format('<div class="{0}">{1}</div>', cls, text);
         *     // s now contains the string: '<div class="my-class">Some text</div>'
         *
         * @param {String} string The tokenized string to be formatted.
         * @param {Mixed...} values The values to replace tokens `{0}`, `{1}`, etc in order.
         * @return {String} The formatted string.
         */
        format: function (format) {
            var args = Ext.Array.toArray(arguments, 1);
            return format.replace(formatRe, function (m, i) {
                return args[i];
            });
        },

        /**
         * Returns a string with a specified number of repetitions a given string pattern.
         * The pattern be separated by a different string.
         *
         *      var s = Ext.String.repeat('---', 4); // = '------------'
         *      var t = Ext.String.repeat('--', 3, '/'); // = '--/--/--'
         *
         * @param {String} pattern The pattern to repeat.
         * @param {Number} count The number of times to repeat the pattern (may be 0).
         * @param {String} sep An option string to separate each pattern.
         */
        repeat: function (pattern, count, sep) {
            if (count < 1) {
                count = 0;
            }
            for (var buf = [], i = count; i--;) {
                buf.push(pattern);
            }
            return buf.join(sep || '');
        },

        /**
         * Splits a string of space separated words into an array, trimming as needed. If the
         * words are already an array, it is returned.
         *
         * @param {String/Array} words
         */
        splitWords: function (words) {
            if (words && typeof words == 'string') {
                return words.replace(basicTrimRe, '').split(whitespaceRe);
            }
            return words || [];
        }
    };
}());

// initialize the default encode / decode entities
Ext.String.resetCharacterEntities();

/**
 * Old alias to {@link Ext.String#htmlEncode}
 * @deprecated Use {@link Ext.String#htmlEncode} instead
 * @method
 * @member Ext
 * @inheritdoc Ext.String#htmlEncode
 */
Ext.htmlEncode = Ext.String.htmlEncode;


/**
 * Old alias to {@link Ext.String#htmlDecode}
 * @deprecated Use {@link Ext.String#htmlDecode} instead
 * @method
 * @member Ext
 * @inheritdoc Ext.String#htmlDecode
 */
Ext.htmlDecode = Ext.String.htmlDecode;

/**
 * Old alias to {@link Ext.String#urlAppend}
 * @deprecated Use {@link Ext.String#urlAppend} instead
 * @method
 * @member Ext
 * @inheritdoc Ext.String#urlAppend
 */
Ext.urlAppend = Ext.String.urlAppend;

// @tag foundation,core
// @require String.js
// @define Ext.Number

/**
 * @class Ext.Number
 *
 * A collection of useful static methods to deal with numbers
 * @singleton
 */

Ext.Number = new function () {

    var me = this,
        isToFixedBroken = (0.9).toFixed() !== '1',
        math = Math;

    Ext.apply(this, {
        /**
         * Checks whether or not the passed number is within a desired range.  If the number is already within the
         * range it is returned, otherwise the min or max value is returned depending on which side of the range is
         * exceeded. Note that this method returns the constrained value but does not change the current number.
         * @param {Number} number The number to check
         * @param {Number} min The minimum number in the range
         * @param {Number} max The maximum number in the range
         * @return {Number} The constrained value if outside the range, otherwise the current value
         */
        constrain: function (number, min, max) {
            var x = parseFloat(number);

            // Watch out for NaN in Chrome 18
            // V8bug: http://code.google.com/p/v8/issues/detail?id=2056

            // Operators are faster than Math.min/max. See http://jsperf.com/number-constrain
            // ... and (x < Nan) || (x < undefined) == false
            // ... same for (x > NaN) || (x > undefined)
            // so if min or max are undefined or NaN, we never return them... sadly, this
            // is not true of null (but even Math.max(-1,null)==0 and isNaN(null)==false)
            return (x < min) ? min : ((x > max) ? max : x);
        },

        /**
         * Snaps the passed number between stopping points based upon a passed increment value.
         *
         * The difference between this and {@link #snapInRange} is that {@link #snapInRange} uses the minValue
         * when calculating snap points:
         *
         *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
         *
         *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
         *
         * @param {Number} value The unsnapped value.
         * @param {Number} increment The increment by which the value must move.
         * @param {Number} minValue The minimum value to which the returned value must be constrained. Overrides the increment.
         * @param {Number} maxValue The maximum value to which the returned value must be constrained. Overrides the increment.
         * @return {Number} The value of the nearest snap target.
         */
        snap: function (value, increment, minValue, maxValue) {
            var m;

            // If no value passed, or minValue was passed and value is less than minValue (anything < undefined is false)
            // Then use the minValue (or zero if the value was undefined)
            if (value === undefined || value < minValue) {
                return minValue || 0;
            }

            if (increment) {
                m = value % increment;
                if (m !== 0) {
                    value -= m;
                    if (m * 2 >= increment) {
                        value += increment;
                    } else if (m * 2 < -increment) {
                        value -= increment;
                    }
                }
            }
            return me.constrain(value, minValue, maxValue);
        },

        /**
         * Snaps the passed number between stopping points based upon a passed increment value.
         *
         * The difference between this and {@link #snap} is that {@link #snap} does not use the minValue
         * when calculating snap points:
         *
         *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
         *
         *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
         *
         * @param {Number} value The unsnapped value.
         * @param {Number} increment The increment by which the value must move.
         * @param {Number} [minValue=0] The minimum value to which the returned value must be constrained.
         * @param {Number} [maxValue=Infinity] The maximum value to which the returned value must be constrained.
         * @return {Number} The value of the nearest snap target.
         */
        snapInRange: function (value, increment, minValue, maxValue) {
            var tween;

            // default minValue to zero
            minValue = (minValue || 0);

            // If value is undefined, or less than minValue, use minValue
            if (value === undefined || value < minValue) {
                return minValue;
            }

            // Calculate how many snap points from the minValue the passed value is.
            if (increment && (tween = ((value - minValue) % increment))) {
                value -= tween;
                tween *= 2;
                if (tween >= increment) {
                    value += increment;
                }
            }

            // If constraining within a maximum, ensure the maximum is on a snap point
            if (maxValue !== undefined) {
                if (value > (maxValue = me.snapInRange(maxValue, increment, minValue))) {
                    value = maxValue;
                }
            }

            return value;
        },

        /**
         * Formats a number using fixed-point notation
         * @param {Number} value The number to format
         * @param {Number} precision The number of digits to show after the decimal point
         */
        toFixed: isToFixedBroken ? function (value, precision) {
            precision = precision || 0;
            var pow = math.pow(10, precision);
            return (math.round(value * pow) / pow).toFixed(precision);
        } : function (value, precision) {
            return value.toFixed(precision);
        },

        /**
         * Validate that a value is numeric and convert it to a number if necessary. Returns the specified default value if
         * it is not.

    Ext.Number.from('1.23', 1); // returns 1.23
    Ext.Number.from('abc', 1); // returns 1

         * @param {Object} value
         * @param {Number} defaultValue The value to return if the original value is non-numeric
         * @return {Number} value, if numeric, defaultValue otherwise
         */
        from: function (value, defaultValue) {
            if (isFinite(value)) {
                value = parseFloat(value);
            }

            return !isNaN(value) ? value : defaultValue;
        },

        /**
         * Returns a random integer between the specified range (inclusive)
         * @param {Number} from Lowest value to return.
         * @param {Number} to Highst value to return.
         * @return {Number} A random integer within the specified range.
         */
        randomInt: function (from, to) {
            return math.floor(math.random() * (to - from + 1) + from);
        },

        /**
         * Corrects floating point numbers that overflow to a non-precise
         * value because of their floating nature, for example `0.1 + 0.2`
         * @param {Number} The number
         * @return {Number} The correctly rounded number
         */
        correctFloat: function (n) {
            // This is to correct the type of errors where 2 floats end with
            // a long string of decimals, eg 0.1 + 0.2. When they overflow in this
            // manner, they usually go to 15-16 decimals, so we cut it off at 14.
            return parseFloat(n.toPrecision(14));
        }
    });

    /**
     * @deprecated 4.0.0 Please use {@link Ext.Number#from} instead.
     * @member Ext
     * @method num
     * @inheritdoc Ext.Number#from
     */
    Ext.num = function () {
        return me.from.apply(this, arguments);
    };
};

// @tag foundation,core
// @require Number.js
// @define Ext.Array

/**
 * @class Ext.Array
 * @singleton
 * @author Jacky Nguyen <jacky@sencha.com>
 * @docauthor Jacky Nguyen <jacky@sencha.com>
 *
 * A set of useful static methods to deal with arrays; provide missing methods for older browsers.
 */
(function () {

    var arrayPrototype = Array.prototype,
        slice = arrayPrototype.slice,
        supportsSplice = (function () {
            var array = [],
                lengthBefore,
                j = 20;

            if (!array.splice) {
                return false;
            }

            // This detects a bug in IE8 splice method:
            // see http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/

            while (j--) {
                array.push("A");
            }

            array.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");

            lengthBefore = array.length; //41
            array.splice(13, 0, "XXX"); // add one element

            if (lengthBefore + 1 != array.length) {
                return false;
            }
            // end IE8 bug

            return true;
        }()),
        supportsForEach = 'forEach' in arrayPrototype,
        supportsMap = 'map' in arrayPrototype,
        supportsIndexOf = 'indexOf' in arrayPrototype,
        supportsEvery = 'every' in arrayPrototype,
        supportsSome = 'some' in arrayPrototype,
        supportsFilter = 'filter' in arrayPrototype,
        supportsSort = (function () {
            var a = [1, 2, 3, 4, 5].sort(function () { return 0; });
            return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
        }()),
        supportsSliceOnNodeList = true,
        ExtArray,
        erase,
        replace,
        splice;

    try {
        // IE 6 - 8 will throw an error when using Array.prototype.slice on NodeList
        if (typeof document !== 'undefined') {
            slice.call(document.getElementsByTagName('body'));
        }
    } catch (e) {
        supportsSliceOnNodeList = false;
    }

    function fixArrayIndex(array, index) {
        return (index < 0) ? Math.max(0, array.length + index)
                           : Math.min(array.length, index);
    }

    /*
    Does the same work as splice, but with a slightly more convenient signature. The splice
    method has bugs in IE8, so this is the implementation we use on that platform.

    The rippling of items in the array can be tricky. Consider two use cases:

                  index=2
                  removeCount=2
                 /=====\
        +---+---+---+---+---+---+---+---+
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        +---+---+---+---+---+---+---+---+
                         /  \/  \/  \/  \
                        /   /\  /\  /\   \
                       /   /  \/  \/  \   +--------------------------+
                      /   /   /\  /\   +--------------------------+   \
                     /   /   /  \/  +--------------------------+   \   \
                    /   /   /   /+--------------------------+   \   \   \
                   /   /   /   /                             \   \   \   \
                  v   v   v   v                               v   v   v   v
        +---+---+---+---+---+---+       +---+---+---+---+---+---+---+---+---+
        | 0 | 1 | 4 | 5 | 6 | 7 |       | 0 | 1 | a | b | c | 4 | 5 | 6 | 7 |
        +---+---+---+---+---+---+       +---+---+---+---+---+---+---+---+---+
        A                               B        \=========/
                                                 insert=[a,b,c]

    In case A, it is obvious that copying of [4,5,6,7] must be left-to-right so
    that we don't end up with [0,1,6,7,6,7]. In case B, we have the opposite; we
    must go right-to-left or else we would end up with [0,1,a,b,c,4,4,4,4].
    */
    function replaceSim(array, index, removeCount, insert) {
        var add = insert ? insert.length : 0,
            length = array.length,
            pos = fixArrayIndex(array, index),
            remove,
            tailOldPos,
            tailNewPos,
            tailCount,
            lengthAfterRemove,
            i;

        // we try to use Array.push when we can for efficiency...
        if (pos === length) {
            if (add) {
                array.push.apply(array, insert);
            }
        } else {
            remove = Math.min(removeCount, length - pos);
            tailOldPos = pos + remove;
            tailNewPos = tailOldPos + add - remove;
            tailCount = length - tailOldPos;
            lengthAfterRemove = length - remove;

            if (tailNewPos < tailOldPos) { // case A
                for (i = 0; i < tailCount; ++i) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            } else if (tailNewPos > tailOldPos) { // case B
                for (i = tailCount; i--;) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            } // else, add == remove (nothing to do)

            if (add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove; // truncate array
                array.push.apply(array, insert);
            } else {
                array.length = lengthAfterRemove + add; // reserves space
                for (i = 0; i < add; ++i) {
                    array[pos + i] = insert[i];
                }
            }
        }

        return array;
    }

    function replaceNative(array, index, removeCount, insert) {
        if (insert && insert.length) {
            // Inserting at index zero with no removing: use unshift
            if (index === 0 && !removeCount) {
                array.unshift.apply(array, insert);
            }
                // Inserting/replacing in middle of array
            else if (index < array.length) {
                array.splice.apply(array, [index, removeCount].concat(insert));
            }
                // Appending to array
            else {
                array.push.apply(array, insert);
            }
        } else {
            array.splice(index, removeCount);
        }
        return array;
    }

    function eraseSim(array, index, removeCount) {
        return replaceSim(array, index, removeCount);
    }

    function eraseNative(array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    }

    function spliceSim(array, index, removeCount) {
        var pos = fixArrayIndex(array, index),
            removed = array.slice(index, fixArrayIndex(array, pos + removeCount));

        if (arguments.length < 4) {
            replaceSim(array, pos, removeCount);
        } else {
            replaceSim(array, pos, removeCount, slice.call(arguments, 3));
        }

        return removed;
    }

    function spliceNative(array) {
        return array.splice.apply(array, slice.call(arguments, 1));
    }

    erase = supportsSplice ? eraseNative : eraseSim;
    replace = supportsSplice ? replaceNative : replaceSim;
    splice = supportsSplice ? spliceNative : spliceSim;

    // NOTE: from here on, use erase, replace or splice (not native methods)...

    ExtArray = Ext.Array = {
        /**
         * Iterates an array or an iterable value and invoke the given callback function for each item.
         *
         *     var countries = ['Vietnam', 'Singapore', 'United States', 'Russia'];
         *
         *     Ext.Array.each(countries, function(name, index, countriesItSelf) {
         *         console.log(name);
         *     });
         *
         *     var sum = function() {
         *         var sum = 0;
         *
         *         Ext.Array.each(arguments, function(value) {
         *             sum += value;
         *         });
         *
         *         return sum;
         *     };
         *
         *     sum(1, 2, 3); // returns 6
         *
         * The iteration can be stopped by returning false in the function callback.
         *
         *     Ext.Array.each(countries, function(name, index, countriesItSelf) {
         *         if (name === 'Singapore') {
         *             return false; // break here
         *         }
         *     });
         *
         * {@link Ext#each Ext.each} is alias for {@link Ext.Array#each Ext.Array.each}
         *
         * @param {Array/NodeList/Object} iterable The value to be iterated. If this
         * argument is not iterable, the callback function is called once.
         * @param {Function} fn The callback function. If it returns false, the iteration stops and this method returns
         * the current `index`.
         * @param {Object} fn.item The item at the current `index` in the passed `array`
         * @param {Number} fn.index The current `index` within the `array`
         * @param {Array} fn.allItems The `array` itself which was passed as the first argument
         * @param {Boolean} fn.return Return false to stop iteration.
         * @param {Object} scope (Optional) The scope (`this` reference) in which the specified function is executed.
         * @param {Boolean} reverse (Optional) Reverse the iteration order (loop from the end to the beginning)
         * Defaults false
         * @return {Boolean} See description for the `fn` parameter.
         */
        each: function (array, fn, scope, reverse) {
            array = ExtArray.from(array);

            var i,
                ln = array.length;

            if (reverse !== true) {
                for (i = 0; i < ln; i++) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }
            else {
                for (i = ln - 1; i > -1; i--) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }

            return true;
        },

        /**
         * Iterates an array and invoke the given callback function for each item. Note that this will simply
         * delegate to the native Array.prototype.forEach method if supported. It doesn't support stopping the
         * iteration by returning false in the callback function like {@link Ext.Array#each}. However, performance
         * could be much better in modern browsers comparing with {@link Ext.Array#each}
         *
         * @param {Array} array The array to iterate
         * @param {Function} fn The callback function.
         * @param {Object} fn.item The item at the current `index` in the passed `array`
         * @param {Number} fn.index The current `index` within the `array`
         * @param {Array}  fn.allItems The `array` itself which was passed as the first argument
         * @param {Object} scope (Optional) The execution scope (`this`) in which the specified function is executed.
         */
        forEach: supportsForEach ? function (array, fn, scope) {
            array.forEach(fn, scope);
        } : function (array, fn, scope) {
            var i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                fn.call(scope, array[i], i, array);
            }
        },

        /**
         * Get the index of the provided `item` in the given `array`, a supplement for the
         * missing arrayPrototype.indexOf in Internet Explorer.
         *
         * @param {Array} array The array to check
         * @param {Object} item The item to look for
         * @param {Number} from (Optional) The index at which to begin the search
         * @return {Number} The index of item in the array (or -1 if it is not found)
         */
        indexOf: supportsIndexOf ? function (array, item, from) {
            return arrayPrototype.indexOf.call(array, item, from);
        } : function (array, item, from) {
            var i, length = array.length;

            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }

            return -1;
        },

        /**
         * Checks whether or not the given `array` contains the specified `item`
         *
         * @param {Array} array The array to check
         * @param {Object} item The item to look for
         * @return {Boolean} True if the array contains the item, false otherwise
         */
        contains: supportsIndexOf ? function (array, item) {
            return arrayPrototype.indexOf.call(array, item) !== -1;
        } : function (array, item) {
            var i, ln;

            for (i = 0, ln = array.length; i < ln; i++) {
                if (array[i] === item) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Converts any iterable (numeric indices and a length property) into a true array.
         *
         *     function test() {
         *         var args = Ext.Array.toArray(arguments),
         *             fromSecondToLastArgs = Ext.Array.toArray(arguments, 1);
         *
         *         alert(args.join(' '));
         *         alert(fromSecondToLastArgs.join(' '));
         *     }
         *
         *     test('just', 'testing', 'here'); // alerts 'just testing here';
         *                                      // alerts 'testing here';
         *
         *     Ext.Array.toArray(document.getElementsByTagName('div')); // will convert the NodeList into an array
         *     Ext.Array.toArray('splitted'); // returns ['s', 'p', 'l', 'i', 't', 't', 'e', 'd']
         *     Ext.Array.toArray('splitted', 0, 3); // returns ['s', 'p', 'l']
         *
         * {@link Ext#toArray Ext.toArray} is alias for {@link Ext.Array#toArray Ext.Array.toArray}
         *
         * @param {Object} iterable the iterable object to be turned into a true Array.
         * @param {Number} start (Optional) a zero-based index that specifies the start of extraction. Defaults to 0
         * @param {Number} end (Optional) a 1-based index that specifies the end of extraction. Defaults to the last
         * index of the iterable value
         * @return {Array} array
         */
        toArray: function (iterable, start, end) {
            if (!iterable || !iterable.length) {
                return [];
            }

            if (typeof iterable === 'string') {
                iterable = iterable.split('');
            }

            if (supportsSliceOnNodeList) {
                return slice.call(iterable, start || 0, end || iterable.length);
            }

            var array = [],
                i;

            start = start || 0;
            end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;

            for (i = start; i < end; i++) {
                array.push(iterable[i]);
            }

            return array;
        },

        /**
         * Plucks the value of a property from each item in the Array. Example:
         *
         *     Ext.Array.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
         *
         * @param {Array/NodeList} array The Array of items to pluck the value from.
         * @param {String} propertyName The property name to pluck from each element.
         * @return {Array} The value from each item in the Array.
         */
        pluck: function (array, propertyName) {
            var ret = [],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                ret.push(item[propertyName]);
            }

            return ret;
        },

        /**
         * Creates a new array with the results of calling a provided function on every element in this array.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} [scope] Callback function scope
         * @return {Array} results
         */
        map: supportsMap ? function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.map must have a callback function passed as second argument.');
            }
            return array.map(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.map must have a callback function passed as second argument.');
            }
            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },

        /**
         * Executes the specified function for each array element until the function returns a falsy value.
         * If such an item is found, the function will return false immediately.
         * Otherwise, it will return true.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if no false value is returned by the callback function.
         */
        every: supportsEvery ? function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.every must have a callback function passed as second argument.');
            }
            return array.every(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.every must have a callback function passed as second argument.');
            }
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (!fn.call(scope, array[i], i, array)) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Executes the specified function for each array element until the function returns a truthy value.
         * If such an item is found, the function will return true immediately. Otherwise, it will return false.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if the callback function returns a truthy value.
         */
        some: supportsSome ? function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.some must have a callback function passed as second argument.');
            }
            return array.some(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.some must have a callback function passed as second argument.');
            }
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (fn.call(scope, array[i], i, array)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Shallow compares the contents of 2 arrays using strict equality.
         * @param {Array} array1
         * @param {Array} array2
         * @return {Boolean} `true` if the arrays are equal.
         */
        equals: function (array1, array2) {
            var len1 = array1.length,
                len2 = array2.length,
                i;

            // Short circuit if the same array is passed twice
            if (array1 === array2) {
                return true;
            }

            if (len1 !== len2) {
                return false;
            }

            for (i = 0; i < len1; ++i) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Filter through an array and remove empty item as defined in {@link Ext#isEmpty Ext.isEmpty}
         *
         * See {@link Ext.Array#filter}
         *
         * @param {Array} array
         * @return {Array} results
         */
        clean: function (array) {
            var results = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (!Ext.isEmpty(item)) {
                    results.push(item);
                }
            }

            return results;
        },

        /**
         * Returns a new array with unique items
         *
         * @param {Array} array
         * @return {Array} results
         */
        unique: function (array) {
            var clone = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (ExtArray.indexOf(clone, item) === -1) {
                    clone.push(item);
                }
            }

            return clone;
        },

        /**
         * Creates a new array with all of the elements of this array for which
         * the provided filtering function returns true.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Array} results
         */
        filter: supportsFilter ? function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.filter must have a filter function passed as second argument.');
            }
            return array.filter(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Ext.Error.raise('Ext.Array.filter must have a filter function passed as second argument.');
            }
            var results = [],
                i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                if (fn.call(scope, array[i], i, array)) {
                    results.push(array[i]);
                }
            }

            return results;
        },

        /**
         * Returns the first item in the array which elicits a true return value from the
         * passed selection function.
         * @param {Array} array The array to search
         * @param {Function} fn The selection function to execute for each item.
         * @param {Mixed} fn.item The array item.
         * @param {String} fn.index The index of the array item.
         * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the
         * function is executed. Defaults to the array
         * @return {Object} The first item in the array which returned true from the selection
         * function, or null if none was found.
         */
        findBy: function (array, fn, scope) {
            var i = 0,
                len = array.length;

            for (; i < len; i++) {
                if (fn.call(scope || array, array[i], i)) {
                    return array[i];
                }
            }
            return null;
        },

        /**
         * Converts a value to an array if it's not already an array; returns:
         *
         * - An empty array if given value is `undefined` or `null`
         * - Itself if given value is already an array
         * - An array copy if given value is {@link Ext#isIterable iterable} (arguments, NodeList and alike)
         * - An array with one item which is the given value, otherwise
         *
         * @param {Object} value The value to convert to an array if it's not already is an array
         * @param {Boolean} newReference (Optional) True to clone the given array and return a new reference if necessary,
         * defaults to false
         * @return {Array} array
         */
        from: function (value, newReference) {
            if (value === undefined || value === null) {
                return [];
            }

            if (Ext.isArray(value)) {
                return (newReference) ? slice.call(value) : value;
            }

            var type = typeof value;
            // Both strings and functions will have a length property. In phantomJS, NodeList
            // instances report typeof=='function' but don't have an apply method...
            if (value && value.length !== undefined && type !== 'string' && (type !== 'function' || !value.apply)) {
                return ExtArray.toArray(value);
            }

            return [value];
        },

        /**
         * Removes the specified item from the array if it exists
         *
         * @param {Array} array The array
         * @param {Object} item The item to remove
         * @return {Array} The passed array itself
         */
        remove: function (array, item) {
            var index = ExtArray.indexOf(array, item);

            if (index !== -1) {
                erase(array, index, 1);
            }

            return array;
        },

        /**
         * Push an item into the array only if the array doesn't contain it yet
         *
         * @param {Array} array The array
         * @param {Object} item The item to include
         */
        include: function (array, item) {
            if (!ExtArray.contains(array, item)) {
                array.push(item);
            }
        },

        /**
         * Clone a flat array without referencing the previous one. Note that this is different
         * from Ext.clone since it doesn't handle recursive cloning. It's simply a convenient, easy-to-remember method
         * for Array.prototype.slice.call(array)
         *
         * @param {Array} array The array
         * @return {Array} The clone array
         */
        clone: function (array) {
            return slice.call(array);
        },

        /**
         * Merge multiple arrays into one with unique items.
         *
         * {@link Ext.Array#union} is alias for {@link Ext.Array#merge}
         *
         * @param {Array} array1
         * @param {Array} array2
         * @param {Array} etc
         * @return {Array} merged
         */
        merge: function () {
            var args = slice.call(arguments),
                array = [],
                i, ln;

            for (i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return ExtArray.unique(array);
        },

        /**
         * Merge multiple arrays into one with unique items that exist in all of the arrays.
         *
         * @param {Array} array1
         * @param {Array} array2
         * @param {Array} etc
         * @return {Array} intersect
         */
        intersect: function () {
            var intersection = [],
                arrays = slice.call(arguments),
                arraysLength,
                array,
                arrayLength,
                minArray,
                minArrayIndex,
                minArrayCandidate,
                minArrayLength,
                element,
                elementCandidate,
                elementCount,
                i, j, k;

            if (!arrays.length) {
                return intersection;
            }

            // Find the smallest array
            arraysLength = arrays.length;
            for (i = minArrayIndex = 0; i < arraysLength; i++) {
                minArrayCandidate = arrays[i];
                if (!minArray || minArrayCandidate.length < minArray.length) {
                    minArray = minArrayCandidate;
                    minArrayIndex = i;
                }
            }

            minArray = ExtArray.unique(minArray);
            erase(arrays, minArrayIndex, 1);

            // Use the smallest unique'd array as the anchor loop. If the other array(s) do contain
            // an item in the small array, we're likely to find it before reaching the end
            // of the inner loop and can terminate the search early.
            minArrayLength = minArray.length;
            arraysLength = arrays.length;
            for (i = 0; i < minArrayLength; i++) {
                element = minArray[i];
                elementCount = 0;

                for (j = 0; j < arraysLength; j++) {
                    array = arrays[j];
                    arrayLength = array.length;
                    for (k = 0; k < arrayLength; k++) {
                        elementCandidate = array[k];
                        if (element === elementCandidate) {
                            elementCount++;
                            break;
                        }
                    }
                }

                if (elementCount === arraysLength) {
                    intersection.push(element);
                }
            }

            return intersection;
        },

        /**
         * Perform a set difference A-B by subtracting all items in array B from array A.
         *
         * @param {Array} arrayA
         * @param {Array} arrayB
         * @return {Array} difference
         */
        difference: function (arrayA, arrayB) {
            var clone = slice.call(arrayA),
                ln = clone.length,
                i, j, lnB;

            for (i = 0, lnB = arrayB.length; i < lnB; i++) {
                for (j = 0; j < ln; j++) {
                    if (clone[j] === arrayB[i]) {
                        erase(clone, j, 1);
                        j--;
                        ln--;
                    }
                }
            }

            return clone;
        },

        /**
         * Returns a shallow copy of a part of an array. This is equivalent to the native
         * call "Array.prototype.slice.call(array, begin, end)". This is often used when "array"
         * is "arguments" since the arguments object does not supply a slice method but can
         * be the context object to Array.prototype.slice.
         *
         * @param {Array} array The array (or arguments object).
         * @param {Number} begin The index at which to begin. Negative values are offsets from
         * the end of the array.
         * @param {Number} end The index at which to end. The copied items do not include
         * end. Negative values are offsets from the end of the array. If end is omitted,
         * all items up to the end of the array are copied.
         * @return {Array} The copied piece of the array.
         * @method slice
         */
        // Note: IE6 will return [] on slice.call(x, undefined).
        slice: ([1, 2].slice(1, undefined).length ?
            function (array, begin, end) {
                return slice.call(array, begin, end);
            } :
            // at least IE6 uses arguments.length for variadic signature
            function (array, begin, end) {
                // After tested for IE 6, the one below is of the best performance
                // see http://jsperf.com/slice-fix
                if (typeof begin === 'undefined') {
                    return slice.call(array);
                }
                if (typeof end === 'undefined') {
                    return slice.call(array, begin);
                }
                return slice.call(array, begin, end);
            }
        ),

        /**
         * Sorts the elements of an Array.
         * By default, this method sorts the elements alphabetically and ascending.
         *
         * @param {Array} array The array to sort.
         * @param {Function} sortFn (optional) The comparison function.
         * @param {Mixed} sortFn.a An item to compare.
         * @param {Mixed} sortFn.b Another item to compare.
         * @return {Array} The sorted array.
         */
        sort: supportsSort ? function (array, sortFn) {
            if (sortFn) {
                return array.sort(sortFn);
            } else {
                return array.sort();
            }
        } : function (array, sortFn) {
            var length = array.length,
                i = 0,
                comparison,
                j, min, tmp;

            for (; i < length; i++) {
                min = i;
                for (j = i + 1; j < length; j++) {
                    if (sortFn) {
                        comparison = sortFn(array[j], array[min]);
                        if (comparison < 0) {
                            min = j;
                        }
                    } else if (array[j] < array[min]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    tmp = array[i];
                    array[i] = array[min];
                    array[min] = tmp;
                }
            }

            return array;
        },

        /**
         * Recursively flattens into 1-d Array. Injects Arrays inline.
         *
         * @param {Array} array The array to flatten
         * @return {Array} The 1-d array.
         */
        flatten: function (array) {
            var worker = [];

            function rFlatten(a) {
                var i, ln, v;

                for (i = 0, ln = a.length; i < ln; i++) {
                    v = a[i];

                    if (Ext.isArray(v)) {
                        rFlatten(v);
                    } else {
                        worker.push(v);
                    }
                }

                return worker;
            }

            return rFlatten(array);
        },

        /**
         * Returns the minimum value in the Array.
         *
         * @param {Array/NodeList} array The Array from which to select the minimum value.
         * @param {Function} comparisonFn (optional) a function to perform the comparision which determines minimization.
         * If omitted the "<" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @param {Mixed} comparisonFn.min Current minimum value.
         * @param {Mixed} comparisonFn.item The value to compare with the current minimum.
         * @return {Object} minValue The minimum value
         */
        min: function (array, comparisonFn) {
            var min = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(min, item) === 1) {
                        min = item;
                    }
                }
                else {
                    if (item < min) {
                        min = item;
                    }
                }
            }

            return min;
        },

        /**
         * Returns the maximum value in the Array.
         *
         * @param {Array/NodeList} array The Array from which to select the maximum value.
         * @param {Function} comparisonFn (optional) a function to perform the comparision which determines maximization.
         * If omitted the ">" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @param {Mixed} comparisonFn.max Current maximum value.
         * @param {Mixed} comparisonFn.item The value to compare with the current maximum.
         * @return {Object} maxValue The maximum value
         */
        max: function (array, comparisonFn) {
            var max = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(max, item) === -1) {
                        max = item;
                    }
                }
                else {
                    if (item > max) {
                        max = item;
                    }
                }
            }

            return max;
        },

        /**
         * Calculates the mean of all items in the array.
         *
         * @param {Array} array The Array to calculate the mean value of.
         * @return {Number} The mean.
         */
        mean: function (array) {
            return array.length > 0 ? ExtArray.sum(array) / array.length : undefined;
        },

        /**
         * Calculates the sum of all items in the given array.
         *
         * @param {Array} array The Array to calculate the sum value of.
         * @return {Number} The sum.
         */
        sum: function (array) {
            var sum = 0,
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                sum += item;
            }

            return sum;
        },

        /**
         * Creates a map (object) keyed by the elements of the given array. The values in
         * the map are the index+1 of the array element. For example:
         * 
         *      var map = Ext.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: 1, B: 2, C: 3 };
         * 
         * @param {Array} array The Array to create the map from.
         * @param {String/Function} [getKey] Name of the object property to use
         * as a key or a function to extract the key.
         * @param {Object} [scope] Value of this inside callback.
         * @return {Object} The resulting map.
         */
        toMap: function (array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = i + 1;
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = i + 1;
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = i + 1;
                }
            }

            return map;
        },

        /**
         * Creates a map (object) keyed by a property of elements of the given array. The values in
         * the map are the array element. For example:
         * 
         *      var map = Ext.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 'a', b: 'b', c: 'c' };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: {name: 'a'}, b: {name: 'b'}, c: {name: 'c'} };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: {name: 'a'}, B: {name: 'b'}, C: {name: 'c'} };
         *
         * @param {Array} array The Array to create the map from.
         * @param {String/Function} [getKey] Name of the object property to use
         * as a key or a function to extract the key.
         * @param {Object} [scope] Value of this inside callback.
         * @return {Object} The resulting map.
         */
        toValueMap: function (array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = array[i];
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = array[i];
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = array[i];
                }
            }

            return map;
        },

        _replaceSim: replaceSim, // for unit testing
        _spliceSim: spliceSim,

        /**
         * Removes items from an array. This is functionally equivalent to the splice method
         * of Array, but works around bugs in IE8's splice method and does not copy the
         * removed elements in order to return them (because very often they are ignored).
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index.
         * @return {Array} The array passed.
         * @method
         */
        erase: erase,

        /**
         * Inserts items in to an array.
         *
         * @param {Array} array The Array in which to insert.
         * @param {Number} index The index in the array at which to operate.
         * @param {Array} items The array of items to insert at index.
         * @return {Array} The array passed.
         */
        insert: function (array, index, items) {
            return replace(array, index, 0, items);
        },

        /**
         * Replaces items in an array. This is functionally equivalent to the splice method
         * of Array, but works around bugs in IE8's splice method and is often more convenient
         * to call because it accepts an array of items to insert rather than use a variadic
         * argument list.
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index (can be 0).
         * @param {Array} insert (optional) An array of items to insert at index.
         * @return {Array} The array passed.
         * @method
         */
        replace: replace,

        /**
         * Replaces items in an array. This is equivalent to the splice method of Array, but
         * works around bugs in IE8's splice method. The signature is exactly the same as the
         * splice method except that the array is the first argument. All arguments following
         * removeCount are inserted in the array at index.
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index (can be 0).
         * @param {Object...} elements The elements to add to the array. If you don't specify
         * any elements, splice simply removes elements from the array.
         * @return {Array} An array containing the removed items.
         * @method
         */
        splice: splice,

        /**
         * Pushes new items onto the end of an Array.
         *
         * Passed parameters may be single items, or arrays of items. If an Array is found in the argument list, all its
         * elements are pushed into the end of the target Array.
         *
         * @param {Array} target The Array onto which to push new items
         * @param {Object...} elements The elements to add to the array. Each parameter may
         * be an Array, in which case all the elements of that Array will be pushed into the end of the
         * destination Array.
         * @return {Array} An array containing all the new items push onto the end.
         *
         */
        push: function (array) {
            var len = arguments.length,
                i = 1,
                newItem;

            if (array === undefined) {
                array = [];
            } else if (!Ext.isArray(array)) {
                array = [array];
            }
            for (; i < len; i++) {
                newItem = arguments[i];
                Array.prototype.push[Ext.isIterable(newItem) ? 'apply' : 'call'](array, newItem);
            }
            return array;
        }
    };

    /**
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#each
     */
    Ext.each = ExtArray.each;

    /**
     * @method
     * @member Ext.Array
     * @inheritdoc Ext.Array#merge
     */
    ExtArray.union = ExtArray.merge;

    /**
     * Old alias to {@link Ext.Array#min}
     * @deprecated 4.0.0 Use {@link Ext.Array#min} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#min
     */
    Ext.min = ExtArray.min;

    /**
     * Old alias to {@link Ext.Array#max}
     * @deprecated 4.0.0 Use {@link Ext.Array#max} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#max
     */
    Ext.max = ExtArray.max;

    /**
     * Old alias to {@link Ext.Array#sum}
     * @deprecated 4.0.0 Use {@link Ext.Array#sum} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#sum
     */
    Ext.sum = ExtArray.sum;

    /**
     * Old alias to {@link Ext.Array#mean}
     * @deprecated 4.0.0 Use {@link Ext.Array#mean} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#mean
     */
    Ext.mean = ExtArray.mean;

    /**
     * Old alias to {@link Ext.Array#flatten}
     * @deprecated 4.0.0 Use {@link Ext.Array#flatten} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#flatten
     */
    Ext.flatten = ExtArray.flatten;

    /**
     * Old alias to {@link Ext.Array#clean}
     * @deprecated 4.0.0 Use {@link Ext.Array#clean} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#clean
     */
    Ext.clean = ExtArray.clean;

    /**
     * Old alias to {@link Ext.Array#unique}
     * @deprecated 4.0.0 Use {@link Ext.Array#unique} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#unique
     */
    Ext.unique = ExtArray.unique;

    /**
     * Old alias to {@link Ext.Array#pluck Ext.Array.pluck}
     * @deprecated 4.0.0 Use {@link Ext.Array#pluck Ext.Array.pluck} instead
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#pluck
     */
    Ext.pluck = ExtArray.pluck;

    /**
     * @method
     * @member Ext
     * @inheritdoc Ext.Array#toArray
     */
    Ext.toArray = function () {
        return ExtArray.toArray.apply(ExtArray, arguments);
    };
}());

// @tag foundation,core
// @require Array.js
// @define Ext.Function

/**
 * @class Ext.Function
 *
 * A collection of useful static methods to deal with function callbacks
 * @singleton
 * @alternateClassName Ext.util.Functions
 */
Ext.Function = {

    /**
     * A very commonly used method throughout the framework. It acts as a wrapper around another method
     * which originally accepts 2 arguments for `name` and `value`.
     * The wrapped function then allows "flexible" value setting of either:
     *
     * - `name` and `value` as 2 arguments
     * - one single object argument with multiple key - value pairs
     *
     * For example:
     *
     *     var setValue = Ext.Function.flexSetter(function(name, value) {
     *         this[name] = value;
     *     });
     *
     *     // Afterwards
     *     // Setting a single name - value
     *     setValue('name1', 'value1');
     *
     *     // Settings multiple name - value pairs
     *     setValue({
     *         name1: 'value1',
     *         name2: 'value2',
     *         name3: 'value3'
     *     });
     *
     * @param {Function} setter
     * @returns {Function} flexSetter
     */
    flexSetter: function (fn) {
        return function (a, b) {
            var k, i;

            if (a === null) {
                return this;
            }

            if (typeof a !== 'string') {
                for (k in a) {
                    if (a.hasOwnProperty(k)) {
                        fn.call(this, k, a[k]);
                    }
                }

                if (Ext.enumerables) {
                    for (i = Ext.enumerables.length; i--;) {
                        k = Ext.enumerables[i];
                        if (a.hasOwnProperty(k)) {
                            fn.call(this, k, a[k]);
                        }
                    }
                }
            } else {
                fn.call(this, a, b);
            }

            return this;
        };
    },

    /**
     * Create a new function from the provided `fn`, change `this` to the provided scope, optionally
     * overrides arguments for the call. (Defaults to the arguments passed by the caller)
     *
     * {@link Ext#bind Ext.bind} is alias for {@link Ext.Function#bind Ext.Function.bind}
     *
     * @param {Function} fn The function to delegate.
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the default global environment object (usually the browser window).**
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    bind: function (fn, scope, args, appendArgs) {
        if (arguments.length === 2) {
            return function () {
                return fn.apply(scope, arguments);
            };
        }

        var method = fn,
            slice = Array.prototype.slice;

        return function () {
            var callArgs = args || arguments;

            if (appendArgs === true) {
                callArgs = slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (typeof appendArgs == 'number') {
                callArgs = slice.call(arguments, 0); // copy arguments first
                Ext.Array.insert(callArgs, appendArgs, args);
            }

            return method.apply(scope || Ext.global, callArgs);
        };
    },

    /**
     * Create a new function from the provided `fn`, the arguments of which are pre-set to `args`.
     * New arguments passed to the newly created callback when it's invoked are appended after the pre-set ones.
     * This is especially useful when creating callbacks.
     *
     * For example:
     *
     *     var originalFunction = function(){
     *         alert(Ext.Array.from(arguments).join(' '));
     *     };
     *
     *     var callback = Ext.Function.pass(originalFunction, ['Hello', 'World']);
     *
     *     callback(); // alerts 'Hello World'
     *     callback('by Me'); // alerts 'Hello World by Me'
     *
     * {@link Ext#pass Ext.pass} is alias for {@link Ext.Function#pass Ext.Function.pass}
     *
     * @param {Function} fn The original function
     * @param {Array} args The arguments to pass to new callback
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * @return {Function} The new callback function
     */
    pass: function (fn, args, scope) {
        if (!Ext.isArray(args)) {
            if (Ext.isIterable(args)) {
                args = Ext.Array.clone(args);
            } else {
                args = args !== undefined ? [args] : [];
            }
        }

        return function () {
            var fnArgs = [].concat(args);
            fnArgs.push.apply(fnArgs, arguments);
            return fn.apply(scope || this, fnArgs);
        };
    },

    /**
     * Create an alias to the provided method property with name `methodName` of `object`.
     * Note that the execution scope will still be bound to the provided `object` itself.
     *
     * @param {Object/Function} object
     * @param {String} methodName
     * @return {Function} aliasFn
     */
    alias: function (object, methodName) {
        return function () {
            return object[methodName].apply(object, arguments);
        };
    },

    /**
     * Create a "clone" of the provided method. The returned method will call the given
     * method passing along all arguments and the "this" pointer and return its result.
     *
     * @param {Function} method
     * @return {Function} cloneFn
     */
    clone: function (method) {
        return function () {
            return method.apply(this, arguments);
        };
    },

    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     // create a new function that validates input without
     *     // directly modifying the original function:
     *     var sayHiToFriend = Ext.Function.createInterceptor(sayHi, function(name){
     *         return name == 'Brian';
     *     });
     *
     *     sayHiToFriend('Fred');  // no alert
     *     sayHiToFriend('Brian'); // alerts "Hi, Brian"
     *
     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to call before the original
     * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
     * **If omitted, defaults to the scope in which the original function is called or the browser window.**
     * @param {Object} [returnValue=null] The value to return if the passed function return false.
     * @return {Function} The new function
     */
    createInterceptor: function (origFn, newFn, scope, returnValue) {
        var method = origFn;
        if (!Ext.isFunction(newFn)) {
            return origFn;
        } else {
            returnValue = Ext.isDefined(returnValue) ? returnValue : null;
            return function () {
                var me = this,
                    args = arguments;

                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || Ext.global, args) !== false) ? origFn.apply(me || Ext.global, args) : returnValue;
            };
        }
    },

    /**
     * Creates a delegate (callback) which, when called, executes after a specific delay.
     *
     * @param {Function} fn The function which will be called on a delay when the returned function is called.
     * Optionally, a replacement (or additional) argument list may be specified.
     * @param {Number} delay The number of milliseconds to defer execution by whenever called.
     * @param {Object} scope (optional) The scope (`this` reference) used by the function at execution time.
     * @param {Array} args (optional) Override arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position.
     * @return {Function} A function which, when called, executes the original function after the specified delay.
     */
    createDelayed: function (fn, delay, scope, args, appendArgs) {
        if (scope || args) {
            fn = Ext.Function.bind(fn, scope, args, appendArgs);
        }

        return function () {
            var me = this,
                args = Array.prototype.slice.call(arguments);

            setTimeout(function () {
                fn.apply(me, args);
            }, delay);
        };
    },

    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     // executes immediately:
     *     sayHi('Fred');
     *
     *     // executes after 2 seconds:
     *     Ext.Function.defer(sayHi, 2000, this, ['Fred']);
     *
     *     // this syntax is sometimes useful for deferring
     *     // execution of an anonymous function:
     *     Ext.Function.defer(function(){
     *         alert('Anonymous');
     *     }, 100);
     *
     * {@link Ext#defer Ext.defer} is alias for {@link Ext.Function#defer Ext.Function.defer}
     *
     * @param {Function} fn The function to defer.
     * @param {Number} millis The number of milliseconds for the setTimeout call
     * (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the browser window.**
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer: function (fn, millis, scope, args, appendArgs) {
        fn = Ext.Function.bind(fn, scope, args, appendArgs);
        if (millis > 0) {
            return setTimeout(Ext.supports.TimeoutActualLateness ? function () {
                fn();
            } : fn, millis);
        }
        fn();
        return 0;
    },

    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     var sayGoodbye = Ext.Function.createSequence(sayHi, function(name){
     *         alert('Bye, ' + name);
     *     });
     *
     *     sayGoodbye('Fred'); // both alerts show
     *
     * @param {Function} originalFn The original function.
     * @param {Function} newFn The function to sequence
     * @param {Object} scope (optional) The scope (`this` reference) in which the passed function is executed.
     * If omitted, defaults to the scope in which the original function is called or the default global environment object (usually the browser window).
     * @return {Function} The new function
     */
    createSequence: function (originalFn, newFn, scope) {
        if (!newFn) {
            return originalFn;
        }
        else {
            return function () {
                var result = originalFn.apply(this, arguments);
                newFn.apply(scope || this, arguments);
                return result;
            };
        }
    },

    /**
     * Creates a delegate function, optionally with a bound scope which, when called, buffers
     * the execution of the passed function for the configured number of milliseconds.
     * If called again within that period, the impending invocation will be canceled, and the
     * timeout period will begin again.
     *
     * @param {Function} fn The function to invoke on a buffered timer.
     * @param {Number} buffer The number of milliseconds by which to buffer the invocation of the
     * function.
     * @param {Object} scope (optional) The scope (`this` reference) in which
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @param {Array} args (optional) Override arguments for the call. Defaults to the arguments
     * passed by the caller.
     * @return {Function} A function which invokes the passed function after buffering for the specified time.
     */
    createBuffered: function (fn, buffer, scope, args) {
        var timerId;

        return function () {
            var callArgs = args || Array.prototype.slice.call(arguments, 0),
                me = scope || this;

            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(function () {
                fn.apply(me, callArgs);
            }, buffer);
        };
    },

    /**
     * Creates a throttled version of the passed function which, when called repeatedly and
     * rapidly, invokes the passed function only after a certain interval has elapsed since the
     * previous invocation.
     *
     * This is useful for wrapping functions which may be called repeatedly, such as
     * a handler of a mouse move event when the processing is expensive.
     *
     * @param {Function} fn The function to execute at a regular time interval.
     * @param {Number} interval The interval **in milliseconds** on which the passed function is executed.
     * @param {Object} scope (optional) The scope (`this` reference) in which
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @returns {Function} A function which invokes the passed function at the specified interval.
     */
    createThrottled: function (fn, interval, scope) {
        var lastCallTime, elapsed, lastArgs, timer, execute = function () {
            fn.apply(scope || this, lastArgs);
            lastCallTime = Ext.Date.now();
        };

        return function () {
            elapsed = Ext.Date.now() - lastCallTime;
            lastArgs = arguments;

            clearTimeout(timer);
            if (!lastCallTime || (elapsed >= interval)) {
                execute();
            } else {
                timer = setTimeout(execute, interval - elapsed);
            }
        };
    },


    /**
     * Adds behavior to an existing method that is executed before the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Ext.Function.interceptBefore(soup, "add", function(ingredient){
     *         if (!this.contents.length && ingredient !== "water") {
     *             // Always add water to start with
     *             this.contents.push("water");
     *         }
     *     });
     *     soup.add("onions");
     *     soup.add("salt");
     *     soup.contents; // will contain: water, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptBefore: function (object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function () {
            var ret = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return ret;
        });
    },

    /**
     * Adds behavior to an existing method that is executed after the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Ext.Function.interceptAfter(soup, "add", function(ingredient){
     *         // Always add a bit of extra salt
     *         this.contents.push("salt");
     *     });
     *     soup.add("water");
     *     soup.add("onions");
     *     soup.contents; // will contain: water, salt, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptAfter: function (object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function () {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }
};

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#defer
 */
Ext.defer = Ext.Function.alias(Ext.Function, 'defer');

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#pass
 */
Ext.pass = Ext.Function.alias(Ext.Function, 'pass');

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#bind
 */
Ext.bind = Ext.Function.alias(Ext.Function, 'bind');

// @tag foundation,core
// @require Function.js
// @define Ext.Object

/**
 * @class Ext.Object
 *
 * A collection of useful static methods to deal with objects.
 *
 * @singleton
 */

(function () {

    // The "constructor" for chain:
    var TemplateClass = function () { },
        ExtObject = Ext.Object = {

            /**
             * Returns a new object with the given object as the prototype chain. This method is
             * designed to mimic the ECMA standard `Object.create` method and is assigned to that
             * function when it is available.
             * 
             * **NOTE** This method does not support the property definitions capability of the
             * `Object.create` method. Only the first argument is supported.
             * 
             * @param {Object} object The prototype chain for the new object.
             */
            chain: Object.create || function (object) {
                TemplateClass.prototype = object;
                var result = new TemplateClass();
                TemplateClass.prototype = null;
                return result;
            },

            /**
             * This method removes all keys from the given object.
             * @param {Object} object The object from which to remove all keys.
             * @return {Object} The given object.
             */
            clear: function (object) {
                var keys = ExtObject.getKeys(object),
                    n = keys.length;

                while (n--) {
                    delete object[keys[n]];
                }

                return object;
            },

            /**
             * Converts a `name` - `value` pair to an array of objects with support for nested structures. Useful to construct
             * query strings. For example:
             *
             *     var objects = Ext.Object.toQueryObjects('hobbies', ['reading', 'cooking', 'swimming']);
             *
             *     // objects then equals:
             *     [
             *         { name: 'hobbies', value: 'reading' },
             *         { name: 'hobbies', value: 'cooking' },
             *         { name: 'hobbies', value: 'swimming' },
             *     ];
             *
             *     var objects = Ext.Object.toQueryObjects('dateOfBirth', {
             *         day: 3,
             *         month: 8,
             *         year: 1987,
             *         extra: {
             *             hour: 4
             *             minute: 30
             *         }
             *     }, true); // Recursive
             *
             *     // objects then equals:
             *     [
             *         { name: 'dateOfBirth[day]', value: 3 },
             *         { name: 'dateOfBirth[month]', value: 8 },
             *         { name: 'dateOfBirth[year]', value: 1987 },
             *         { name: 'dateOfBirth[extra][hour]', value: 4 },
             *         { name: 'dateOfBirth[extra][minute]', value: 30 },
             *     ];
             *
             * @param {String} name
             * @param {Object/Array} value
             * @param {Boolean} [recursive=false] True to traverse object recursively
             * @return {Array}
             */
            toQueryObjects: function (name, value, recursive) {
                var self = ExtObject.toQueryObjects,
                    objects = [],
                    i, ln;

                if (Ext.isArray(value)) {
                    for (i = 0, ln = value.length; i < ln; i++) {
                        if (recursive) {
                            objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                        }
                        else {
                            objects.push({
                                name: name,
                                value: value[i]
                            });
                        }
                    }
                }
                else if (Ext.isObject(value)) {
                    for (i in value) {
                        if (value.hasOwnProperty(i)) {
                            if (recursive) {
                                objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                            }
                            else {
                                objects.push({
                                    name: name,
                                    value: value[i]
                                });
                            }
                        }
                    }
                }
                else {
                    objects.push({
                        name: name,
                        value: value
                    });
                }

                return objects;
            },

            /**
             * Takes an object and converts it to an encoded query string.
             *
             * Non-recursive:
             *
             *     Ext.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
             *     Ext.Object.toQueryString({foo: null, bar: 2}); // returns "foo=&bar=2"
             *     Ext.Object.toQueryString({'some price': '$300'}); // returns "some%20price=%24300"
             *     Ext.Object.toQueryString({date: new Date(2011, 0, 1)}); // returns "date=%222011-01-01T00%3A00%3A00%22"
             *     Ext.Object.toQueryString({colors: ['red', 'green', 'blue']}); // returns "colors=red&colors=green&colors=blue"
             *
             * Recursive:
             *
             *     Ext.Object.toQueryString({
             *         username: 'Jacky',
             *         dateOfBirth: {
             *             day: 1,
             *             month: 2,
             *             year: 1911
             *         },
             *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
             *     }, true); // returns the following string (broken down and url-decoded for ease of reading purpose):
             *     // username=Jacky
             *     //    &dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911
             *     //    &hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&hobbies[3][0]=nested&hobbies[3][1]=stuff
             *
             * @param {Object} object The object to encode
             * @param {Boolean} [recursive=false] Whether or not to interpret the object in recursive format.
             * (PHP / Ruby on Rails servers and similar).
             * @return {String} queryString
             */
            toQueryString: function (object, recursive) {
                var paramObjects = [],
                    params = [],
                    i, j, ln, paramObject, value;

                for (i in object) {
                    if (object.hasOwnProperty(i)) {
                        paramObjects = paramObjects.concat(ExtObject.toQueryObjects(i, object[i], recursive));
                    }
                }

                for (j = 0, ln = paramObjects.length; j < ln; j++) {
                    paramObject = paramObjects[j];
                    value = paramObject.value;

                    if (Ext.isEmpty(value)) {
                        value = '';
                    } else if (Ext.isDate(value)) {
                        value = Ext.Date.toString(value);
                    }

                    params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
                }

                return params.join('&');
            },

            /**
             * Converts a query string back into an object.
             *
             * Non-recursive:
             *
             *     Ext.Object.fromQueryString("foo=1&bar=2"); // returns {foo: '1', bar: '2'}
             *     Ext.Object.fromQueryString("foo=&bar=2"); // returns {foo: null, bar: '2'}
             *     Ext.Object.fromQueryString("some%20price=%24300"); // returns {'some price': '$300'}
             *     Ext.Object.fromQueryString("colors=red&colors=green&colors=blue"); // returns {colors: ['red', 'green', 'blue']}
             *
             * Recursive:
             *
             *     Ext.Object.fromQueryString(
             *         "username=Jacky&"+
             *         "dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911&"+
             *         "hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&"+
             *         "hobbies[3][0]=nested&hobbies[3][1]=stuff", true);
             *
             *     // returns
             *     {
             *         username: 'Jacky',
             *         dateOfBirth: {
             *             day: '1',
             *             month: '2',
             *             year: '1911'
             *         },
             *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
             *     }
             *
             * @param {String} queryString The query string to decode
             * @param {Boolean} [recursive=false] Whether or not to recursively decode the string. This format is supported by
             * PHP / Ruby on Rails servers and similar.
             * @return {Object}
             */
            fromQueryString: function (queryString, recursive) {
                var parts = queryString.replace(/^\?/, '').split('&'),
                    object = {},
                    temp, components, name, value, i, ln,
                    part, j, subLn, matchedKeys, matchedName,
                    keys, key, nextKey;

                for (i = 0, ln = parts.length; i < ln; i++) {
                    part = parts[i];

                    if (part.length > 0) {
                        components = part.split('=');
                        name = decodeURIComponent(components[0]);
                        value = (components[1] !== undefined) ? decodeURIComponent(components[1]) : '';

                        if (!recursive) {
                            if (object.hasOwnProperty(name)) {
                                if (!Ext.isArray(object[name])) {
                                    object[name] = [object[name]];
                                }

                                object[name].push(value);
                            }
                            else {
                                object[name] = value;
                            }
                        }
                        else {
                            matchedKeys = name.match(/(\[):?([^\]]*)\]/g);
                            matchedName = name.match(/^([^\[]+)/);

                            if (!matchedName) {
                                throw new Error('[Ext.Object.fromQueryString] Malformed query string given, failed parsing name from "' + part + '"');
                            }

                            name = matchedName[0];
                            keys = [];

                            if (matchedKeys === null) {
                                object[name] = value;
                                continue;
                            }

                            for (j = 0, subLn = matchedKeys.length; j < subLn; j++) {
                                key = matchedKeys[j];
                                key = (key.length === 2) ? '' : key.substring(1, key.length - 1);
                                keys.push(key);
                            }

                            keys.unshift(name);

                            temp = object;

                            for (j = 0, subLn = keys.length; j < subLn; j++) {
                                key = keys[j];

                                if (j === subLn - 1) {
                                    if (Ext.isArray(temp) && key === '') {
                                        temp.push(value);
                                    }
                                    else {
                                        temp[key] = value;
                                    }
                                }
                                else {
                                    if (temp[key] === undefined || typeof temp[key] === 'string') {
                                        nextKey = keys[j + 1];

                                        temp[key] = (Ext.isNumeric(nextKey) || nextKey === '') ? [] : {};
                                    }

                                    temp = temp[key];
                                }
                            }
                        }
                    }
                }

                return object;
            },

            /**
             * Iterates through an object and invokes the given callback function for each iteration.
             * The iteration can be stopped by returning `false` in the callback function. For example:
             *
             *     var person = {
             *         name: 'Jacky'
             *         hairColor: 'black'
             *         loves: ['food', 'sleeping', 'wife']
             *     };
             *
             *     Ext.Object.each(person, function(key, value, myself) {
             *         console.log(key + ":" + value);
             *
             *         if (key === 'hairColor') {
             *             return false; // stop the iteration
             *         }
             *     });
             *
             * @param {Object} object The object to iterate
             * @param {Function} fn The callback function.
             * @param {String} fn.key
             * @param {Object} fn.value
             * @param {Object} fn.object The object itself
             * @param {Object} [scope] The execution scope (`this`) of the callback function
             */
            each: function (object, fn, scope) {
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (fn.call(scope || object, property, object[property], object) === false) {
                            return;
                        }
                    }
                }
            },

            /**
             * Merges any number of objects recursively without referencing them or their children.
             *
             *     var extjs = {
             *         companyName: 'Ext JS',
             *         products: ['Ext JS', 'Ext GWT', 'Ext Designer'],
             *         isSuperCool: true,
             *         office: {
             *             size: 2000,
             *             location: 'Palo Alto',
             *             isFun: true
             *         }
             *     };
             *
             *     var newStuff = {
             *         companyName: 'Sencha Inc.',
             *         products: ['Ext JS', 'Ext GWT', 'Ext Designer', 'Sencha Touch', 'Sencha Animator'],
             *         office: {
             *             size: 40000,
             *             location: 'Redwood City'
             *         }
             *     };
             *
             *     var sencha = Ext.Object.merge(extjs, newStuff);
             *
             *     // extjs and sencha then equals to
             *     {
             *         companyName: 'Sencha Inc.',
             *         products: ['Ext JS', 'Ext GWT', 'Ext Designer', 'Sencha Touch', 'Sencha Animator'],
             *         isSuperCool: true,
             *         office: {
             *             size: 40000,
             *             location: 'Redwood City',
             *             isFun: true
             *         }
             *     }
             *
             * @param {Object} destination The object into which all subsequent objects are merged.
             * @param {Object...} object Any number of objects to merge into the destination.
             * @return {Object} merged The destination object with all passed objects merged in.
             */
            merge: function (destination) {
                var i = 1,
                    ln = arguments.length,
                    mergeFn = ExtObject.merge,
                    cloneFn = Ext.clone,
                    object, key, value, sourceKey;

                for (; i < ln; i++) {
                    object = arguments[i];

                    for (key in object) {
                        value = object[key];
                        if (value && value.constructor === Object) {
                            sourceKey = destination[key];
                            if (sourceKey && sourceKey.constructor === Object) {
                                mergeFn(sourceKey, value);
                            }
                            else {
                                destination[key] = cloneFn(value);
                            }
                        }
                        else {
                            destination[key] = value;
                        }
                    }
                }

                return destination;
            },

            /**
             * @private
             * @param destination
             */
            mergeIf: function (destination) {
                var i = 1,
                    ln = arguments.length,
                    cloneFn = Ext.clone,
                    object, key, value;

                for (; i < ln; i++) {
                    object = arguments[i];

                    for (key in object) {
                        if (!(key in destination)) {
                            value = object[key];

                            if (value && value.constructor === Object) {
                                destination[key] = cloneFn(value);
                            }
                            else {
                                destination[key] = value;
                            }
                        }
                    }
                }

                return destination;
            },

            /**
             * Returns the first matching key corresponding to the given value.
             * If no matching value is found, null is returned.
             *
             *     var person = {
             *         name: 'Jacky',
             *         loves: 'food'
             *     };
             *
             *     alert(Ext.Object.getKey(person, 'food')); // alerts 'loves'
             *
             * @param {Object} object
             * @param {Object} value The value to find
             */
            getKey: function (object, value) {
                for (var property in object) {
                    if (object.hasOwnProperty(property) && object[property] === value) {
                        return property;
                    }
                }

                return null;
            },

            /**
             * Gets all values of the given object as an array.
             *
             *     var values = Ext.Object.getValues({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // ['Jacky', 'food']
             *
             * @param {Object} object
             * @return {Array} An array of values from the object
             */
            getValues: function (object) {
                var values = [],
                    property;

                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        values.push(object[property]);
                    }
                }

                return values;
            },

            /**
             * Gets all keys of the given object as an array.
             *
             *     var values = Ext.Object.getKeys({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // ['name', 'loves']
             *
             * @param {Object} object
             * @return {String[]} An array of keys from the object
             * @method
             */
            getKeys: (typeof Object.keys == 'function')
                ? function (object) {
                    if (!object) {
                        return [];
                    }
                    return Object.keys(object);
                }
                : function (object) {
                    var keys = [],
                        property;

                    for (property in object) {
                        if (object.hasOwnProperty(property)) {
                            keys.push(property);
                        }
                    }

                    return keys;
                },

            /**
             * Gets the total number of this object's own properties
             *
             *     var size = Ext.Object.getSize({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // size equals 2
             *
             * @param {Object} object
             * @return {Number} size
             */
            getSize: function (object) {
                var size = 0,
                    property;

                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        size++;
                    }
                }

                return size;
            },

            /**
             * Checks if there are any properties on this object.
             * @param {Object} object
             * @return {Boolean} `true` if there no properties on the object.
             */
            isEmpty: function (object) {
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            },

            /**
             * Shallow compares the contents of 2 objects using strict equality. Objects are
             * considered equal if they both have the same set of properties and the
             * value for those properties equals the other in the corresponding object.
             * 
             *     // Returns true
             *     Ext.Object.equals({
             *         foo: 1,
             *         bar: 2
             *     }, {
             *         foo: 1,
             *         bar: 2
             *     });
             * 
             * @param {Object} object1
             * @param {Object} object2
             * @return {Boolean} `true` if the objects are equal.
             */
            equals: (function () {
                var check = function (o1, o2) {
                    var key;

                    for (key in o1) {
                        if (o1.hasOwnProperty(key)) {
                            if (o1[key] !== o2[key]) {
                                return false;
                            }
                        }
                    }
                    return true;
                };

                return function (object1, object2) {

                    // Short circuit if the same object is passed twice
                    if (object1 === object2) {
                        return true;
                    } if (object1 && object2) {
                        // Do the second check because we could have extra keys in
                        // object2 that don't exist in object1.
                        return check(object1, object2) && check(object2, object1);
                    } else if (!object1 && !object2) {
                        return object1 === object2;
                    } else {
                        return false;
                    }
                };
            })(),

            /**
             * @private
             */
            classify: function (object) {
                var prototype = object,
                    objectProperties = [],
                    propertyClassesMap = {},
                    objectClass = function () {
                        var i = 0,
                            ln = objectProperties.length,
                            property;

                        for (; i < ln; i++) {
                            property = objectProperties[i];
                            this[property] = new propertyClassesMap[property]();
                        }
                    },
                    key, value;

                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        value = object[key];

                        if (value && value.constructor === Object) {
                            objectProperties.push(key);
                            propertyClassesMap[key] = ExtObject.classify(value);
                        }
                    }
                }

                objectClass.prototype = prototype;

                return objectClass;
            }
        };

    /**
     * A convenient alias method for {@link Ext.Object#merge}.
     *
     * @member Ext
     * @method merge
     * @inheritdoc Ext.Object#merge
     */
    Ext.merge = Ext.Object.merge;

    /**
     * @private
     * @member Ext
     */
    Ext.mergeIf = Ext.Object.mergeIf;

    /**
     *
     * @member Ext
     * @method urlEncode
     * @inheritdoc Ext.Object#toQueryString
     * @deprecated 4.0.0 Use {@link Ext.Object#toQueryString} instead
     */
    Ext.urlEncode = function () {
        var args = Ext.Array.from(arguments),
            prefix = '';

        // Support for the old `pre` argument
        if ((typeof args[1] === 'string')) {
            prefix = args[1] + '&';
            args[1] = false;
        }

        return prefix + ExtObject.toQueryString.apply(ExtObject, args);
    };

    /**
     * Alias for {@link Ext.Object#fromQueryString}.
     *
     * @member Ext
     * @method urlDecode
     * @inheritdoc Ext.Object#fromQueryString
     * @deprecated 4.0.0 Use {@link Ext.Object#fromQueryString} instead
     */
    Ext.urlDecode = function () {
        return ExtObject.fromQueryString.apply(ExtObject, arguments);
    };

}());
Ext.Date = new function () {
    var utilDate = this,
        stripEscapeRe = /(\\.)/g,
        hourInfoRe = /([gGhHisucUOPZ]|MS)/,
        dateInfoRe = /([djzmnYycU]|MS)/,
        slashRe = /\\/gi,
        numberTokenRe = /\{(\d+)\}/g,
        MSFormatRe = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/'),
        code = [
          // date calculations (note: the code below creates a dependency on Ext.Number.from())
          "var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday, daysInMonth, dayMatched,",
              "def = me.defaults,",
              "from = Ext.Number.from,",
              "results = String(input).match(me.parseRegexes[{0}]);", // either null, or an array of matched strings

          "if(results){",
              "{1}",

              "if(u != null){", // i.e. unix time is defined
                  "v = new Date(u * 1000);", // give top priority to UNIX time
              "}else{",
                  // create Date object representing midnight of the current day;
                  // this will provide us with our date defaults
                  // (note: clearTime() handles Daylight Saving Time automatically)
                  "dt = me.clearTime(new Date);",

                  "y = from(y, from(def.y, dt.getFullYear()));",
                  "m = from(m, from(def.m - 1, dt.getMonth()));",
                  "dayMatched = d !== undefined;",
                  "d = from(d, from(def.d, dt.getDate()));",

                  // Attempt to validate the day. Since it defaults to today, it may go out
                  // of range, for example parsing m/Y where the value is 02/2000 on the 31st of May.
                  // It will attempt to parse 2000/02/31, which will overflow to March and end up
                  // returning 03/2000. We only do this when we default the day. If an invalid day value
                  // was set to be parsed by the user, continue on and either let it overflow or return null
                  // depending on the strict value. This will be in line with the normal Date behaviour.

                  "if (!dayMatched) {",
                      "dt.setDate(1);",
                      "dt.setMonth(m);",
                      "dt.setFullYear(y);",

                      "daysInMonth = me.getDaysInMonth(dt);",
                      "if (d > daysInMonth) {",
                          "d = daysInMonth;",
                      "}",
                  "}",

                  "h  = from(h, from(def.h, dt.getHours()));",
                  "i  = from(i, from(def.i, dt.getMinutes()));",
                  "s  = from(s, from(def.s, dt.getSeconds()));",
                  "ms = from(ms, from(def.ms, dt.getMilliseconds()));",

                  "if(z >= 0 && y >= 0){",
                      // both the year and zero-based day of year are defined and >= 0.
                      // these 2 values alone provide sufficient info to create a full date object

                      // create Date object representing January 1st for the given year
                      // handle years < 100 appropriately
                      "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",

                      // then add day of year, checking for Date "rollover" if necessary
                      "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);",
                  "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){", // check for Date "rollover"
                      "v = null;", // invalid date, so return null
                  "}else{",
                      "if (W) {", // support ISO-8601
                          // http://en.wikipedia.org/wiki/ISO_week_date
                          //
                          // Mutually equivalent definitions for week 01 are:
                          // a. the week starting with the Monday which is nearest in time to 1 January
                          // b. the week with 4 January in it
                          // ... there are many others ...
                          //
                          // We'll use letter b above to determine the first week of the year.
                          //
                          // So, first get a Date object for January 4th of whatever calendar year is desired.
                          //
                          // Then, the first Monday of the year can easily be determined by (operating on this Date):
                          // 1. Getting the day of the week.
                          // 2. Subtracting that by one.
                          // 3. Multiplying that by 86400000 (one day in ms).
                          // 4. Subtracting this number of days (in ms) from the January 4 date (represented in ms).
                          // 
                          // Example #1 ...
                          //
                          //       January 2012
                          //   Su Mo Tu We Th Fr Sa
                          //    1  2  3  4  5  6  7
                          //    8  9 10 11 12 13 14
                          //   15 16 17 18 19 20 21
                          //   22 23 24 25 26 27 28
                          //   29 30 31
                          //
                          // 1. January 4th is a Wednesday.
                          // 2. Its day number is 3.
                          // 3. Simply substract 2 days from Wednesday.
                          // 4. The first week of the year begins on Monday, January 2. Simple!
                          //
                          // Example #2 ...
                          //       January 1992
                          //   Su Mo Tu We Th Fr Sa
                          //             1  2  3  4
                          //    5  6  7  8  9 10 11
                          //   12 13 14 15 16 17 18
                          //   19 20 21 22 23 24 25
                          //   26 27 28 29 30 31
                          // 
                          // 1. January 4th is a Saturday.
                          // 2. Its day number is 6.
                          // 3. Simply subtract 5 days from Saturday.
                          // 4. The first week of the year begins on Monday, December 30. Simple!
                          //
                          // v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000)));
                          // (This is essentially doing the same thing as above but for the week rather than the day)
                          "year = y || (new Date()).getFullYear(),",
                          "jan4 = new Date(year, 0, 4, 0, 0, 0),",
                          "week1monday = new Date(jan4.getTime() - ((jan4.getDay() - 1) * 86400000));",
                          "v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000)));",
                      "} else {",
                          // plain old Date object
                          // handle years < 100 properly
                          "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",
                      "}",
                  "}",
              "}",
          "}",

          "if(v){",
              // favor UTC offset over GMT offset
              "if(zz != null){",
                  // reset to UTC, then add offset
                  "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);",
              "}else if(o){",
                  // reset to GMT, then add offset
                  "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
              "}",
          "}",

          "return v;"
        ].join('\n');

    // create private copy of Ext JS's `Ext.util.Format.format()` method
    // - to remove unnecessary dependency
    // - to resolve namespace conflict with MS-Ajax's implementation
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(numberTokenRe, function (m, i) {
            return args[i];
        });
    }

    Ext.apply(utilDate, {
        /**
         * Returns the current timestamp.
         * @return {Number} Milliseconds since UNIX epoch.
         * @method
         */
        now: Date.now || function () {
            return +new Date();
        },

        /**
         * @private
         * Private for now
         */
        toString: function (date) {
            var pad = Ext.String.leftPad;

            return date.getFullYear() + "-"
                + pad(date.getMonth() + 1, 2, '0') + "-"
                + pad(date.getDate(), 2, '0') + "T"
                + pad(date.getHours(), 2, '0') + ":"
                + pad(date.getMinutes(), 2, '0') + ":"
                + pad(date.getSeconds(), 2, '0');
        },

        /**
         * Returns the number of milliseconds between two dates.
         * @param {Date} dateA The first date.
         * @param {Date} [dateB=new Date()] (optional) The second date.
         * @return {Number} The difference in milliseconds
         */
        getElapsed: function (dateA, dateB) {
            return Math.abs(dateA - (dateB || utilDate.now()));
        },

        /**
         * Global flag which determines if strict date parsing should be used.
         * Strict date parsing will not roll-over invalid dates, which is the
         * default behavior of JavaScript Date objects.
         * (see {@link #parse} for more information)
         * @type Boolean
        */
        useStrict: false,

        // private
        formatCodeToRegex: function (character, currentGroup) {
            // Note: currentGroup - position in regex result array (see notes for Ext.Date.parseCodes below)
            var p = utilDate.parseCodes[character];

            if (p) {
                p = typeof p == 'function' ? p() : p;
                utilDate.parseCodes[character] = p; // reassign function result to prevent repeated execution
            }

            return p ? Ext.applyIf({
                c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
            }, p) : {
                g: 0,
                c: null,
                s: Ext.String.escapeRegex(character) // treat unrecognized characters as literals
            };
        },

        /**
         * An object hash in which each property is a date parsing function. The property name is the
         * format string which that function parses.
         *
         * This object is automatically populated with date parsing functions as
         * date formats are requested for Ext standard formatting strings.
         *
         * Custom parsing functions may be inserted into this object, keyed by a name which from then on
         * may be used as a format string to {@link #parse}.
         *
         * Example:
         *
         *     Ext.Date.parseFunctions['x-date-format'] = myDateParser;
         *
         * A parsing function should return a Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
         * <li><code>date</code> : String<div class="sub-desc">The date string to parse.</div></li>
         * <li><code>strict</code> : Boolean<div class="sub-desc">True to validate date strings while parsing
         * (i.e. prevent JavaScript Date "rollover") (The default must be `false`).
         * Invalid date strings should return `null` when parsed.</div></li>
         * </ul></div>
         *
         * To enable Dates to also be _formatted_ according to that format, a corresponding
         * formatting function must be placed into the {@link #formatFunctions} property.
         * @property parseFunctions
         * @type Object
         */
        parseFunctions: {
            "MS": function (input, strict) {
                // note: the timezone offset is ignored since the MS Ajax server sends
                // a UTC milliseconds-since-Unix-epoch value (negative values are allowed)
                var r = (input || '').match(MSFormatRe);
                return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
            },
            "time": function (input, strict) {
                var num = parseInt(input, 10);
                if (num || num === 0) {
                    return new Date(num);
                }
                return null;
            },
            "timestamp": function (input, strict) {
                var num = parseInt(input, 10);
                if (num || num === 0) {
                    return new Date(num * 1000);
                }
                return null;
            }
        },
        parseRegexes: [],

        /**
         * An object hash in which each property is a date formatting function. The property name is the
         * format string which corresponds to the produced formatted date string.
         *
         * This object is automatically populated with date formatting functions as
         * date formats are requested for Ext standard formatting strings.
         *
         * Custom formatting functions may be inserted into this object, keyed by a name which from then on
         * may be used as a format string to {@link #format}.
         *
         * Example:
         *
         *     Ext.Date.formatFunctions['x-date-format'] = myDateFormatter;
         *
         * A formatting function should return a string representation of the passed Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
         * <li><code>date</code> : Date<div class="sub-desc">The Date to format.</div></li>
         * </ul></div>
         *
         * To enable date strings to also be _parsed_ according to that format, a corresponding
         * parsing function must be placed into the {@link #parseFunctions} property.
         * @property formatFunctions
         * @type Object
         */
        formatFunctions: {
            "MS": function () {
                // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
                return '\\/Date(' + this.getTime() + ')\\/';
            },
            "time": function () {
                return this.getTime().toString();
            },
            "timestamp": function () {
                return utilDate.format(this, 'U');
            }
        },

        y2kYear: 50,

        /**
         * Date interval constant
         * @type String
         */
        MILLI: "ms",

        /**
         * Date interval constant
         * @type String
         */
        SECOND: "s",

        /**
         * Date interval constant
         * @type String
         */
        MINUTE: "mi",

        /** Date interval constant
         * @type String
         */
        HOUR: "h",

        /**
         * Date interval constant
         * @type String
         */
        DAY: "d",

        /**
         * Date interval constant
         * @type String
         */
        MONTH: "mo",

        /**
         * Date interval constant
         * @type String
         */
        YEAR: "y",

        /**
         * An object hash containing default date values used during date parsing.
         * 
         * The following properties are available:<div class="mdetail-params"><ul>
         * <li><code>y</code> : Number<div class="sub-desc">The default year value. (defaults to undefined)</div></li>
         * <li><code>m</code> : Number<div class="sub-desc">The default 1-based month value. (defaults to undefined)</div></li>
         * <li><code>d</code> : Number<div class="sub-desc">The default day value. (defaults to undefined)</div></li>
         * <li><code>h</code> : Number<div class="sub-desc">The default hour value. (defaults to undefined)</div></li>
         * <li><code>i</code> : Number<div class="sub-desc">The default minute value. (defaults to undefined)</div></li>
         * <li><code>s</code> : Number<div class="sub-desc">The default second value. (defaults to undefined)</div></li>
         * <li><code>ms</code> : Number<div class="sub-desc">The default millisecond value. (defaults to undefined)</div></li>
         * </ul></div>
         * 
         * Override these properties to customize the default date values used by the {@link #parse} method.
         * 
         * __Note:__ In countries which experience Daylight Saving Time (i.e. DST), the `h`, `i`, `s`
         * and `ms` properties may coincide with the exact time in which DST takes effect.
         * It is the responsibility of the developer to account for this.
         *
         * Example Usage:
         * 
         *     // set default day value to the first day of the month
         *     Ext.Date.defaults.d = 1;
         *
         *     // parse a February date string containing only year and month values.
         *     // setting the default day value to 1 prevents weird date rollover issues
         *     // when attempting to parse the following date string on, for example, March 31st 2009.
         *     Ext.Date.parse('2009-02', 'Y-m'); // returns a Date object representing February 1st 2009
         *
         * @property defaults
         * @type Object
         */
        defaults: {},

        //<locale type="array">
        /**
         * @property {String[]} dayNames
         * An array of textual day names.
         * Override these values for international dates.
         *
         * Example:
         *
         *     Ext.Date.dayNames = [
         *         'SundayInYourLang',
         *         'MondayInYourLang'
         *         // ...
         *     ];
         */
        dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        //</locale>

        //<locale type="array">
        /**
         * @property {String[]} monthNames
         * An array of textual month names.
         * Override these values for international dates.
         *
         * Example:
         *
         *     Ext.Date.monthNames = [
         *         'JanInYourLang',
         *         'FebInYourLang'
         *         // ...
         *     ];
         */
        monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        //</locale>

        //<locale type="object">
        /**
         * @property {Object} monthNumbers
         * An object hash of zero-based JavaScript month numbers (with short month names as keys. **Note:** keys are case-sensitive).
         * Override these values for international dates.
         *
         * Example:
         *
         *     Ext.Date.monthNumbers = {
         *         'LongJanNameInYourLang': 0,
         *         'ShortJanNameInYourLang':0,
         *         'LongFebNameInYourLang':1,
         *         'ShortFebNameInYourLang':1
         *         // ...
         *     };
         */
        monthNumbers: {
            January: 0,
            Jan: 0,
            February: 1,
            Feb: 1,
            March: 2,
            Mar: 2,
            April: 3,
            Apr: 3,
            May: 4,
            June: 5,
            Jun: 5,
            July: 6,
            Jul: 6,
            August: 7,
            Aug: 7,
            September: 8,
            Sep: 8,
            October: 9,
            Oct: 9,
            November: 10,
            Nov: 10,
            December: 11,
            Dec: 11
        },
        //</locale>

        //<locale>
        /**
         * @property {String} defaultFormat
         * The date format string that the {@link Ext.util.Format#dateRenderer}
         * and {@link Ext.util.Format#date} functions use.  See {@link Ext.Date} for details.
         *
         * This may be overridden in a locale file.
         */
        defaultFormat: "m/d/Y",
        //</locale>
        //<locale type="function">
        /**
         * Get the short month name for the given month number.
         * Override this function for international dates.
         * @param {Number} month A zero-based JavaScript month number.
         * @return {String} The short month name.
         */
        getShortMonthName: function (month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        },
        //</locale>

        //<locale type="function">
        /**
         * Get the short day name for the given day number.
         * Override this function for international dates.
         * @param {Number} day A zero-based JavaScript day number.
         * @return {String} The short day name.
         */
        getShortDayName: function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        },
        //</locale>

        //<locale type="function">
        /**
         * Get the zero-based JavaScript month number for the given short/full month name.
         * Override this function for international dates.
         * @param {String} name The short/full month name.
         * @return {Number} The zero-based JavaScript month number.
         */
        getMonthNumber: function (name) {
            // handle camel casing for English month names (since the keys for the Ext.Date.monthNumbers hash are case sensitive)
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },
        //</locale>

        /**
         * Checks if the specified format contains hour information
         * @param {String} format The format to check
         * @return {Boolean} True if the format contains hour information
         * @method
         */
        formatContainsHourInfo: function (format) {
            return hourInfoRe.test(format.replace(stripEscapeRe, ''));
        },

        /**
         * Checks if the specified format contains information about
         * anything other than the time.
         * @param {String} format The format to check
         * @return {Boolean} True if the format contains information about
         * date/day information.
         * @method
         */
        formatContainsDateInfo: function (format) {
            return dateInfoRe.test(format.replace(stripEscapeRe, ''));
        },

        /**
         * Removes all escaping for a date format string. In date formats,
         * using a '\' can be used to escape special characters.
         * @param {String} format The format to unescape
         * @return {String} The unescaped format
         * @method
         */
        unescapeFormat: function (format) {
            // Escape the format, since \ can be used to escape special
            // characters in a date format. For example, in a Spanish
            // locale the format may be: 'd \\de F \\de Y'
            return format.replace(slashRe, '');
        },

        /**
         * The base format-code to formatting-function hashmap used by the {@link #format} method.
         * Formatting functions are strings (or functions which return strings) which
         * will return the appropriate value when evaluated in the context of the Date object
         * from which the {@link #format} method is called.
         * Add to / override these mappings for custom date formatting.
         *
         * __Note:__ Ext.Date.format() treats characters as literals if an appropriate mapping cannot be found.
         *
         * Example:
         *
         *     Ext.Date.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
         *     console.log(Ext.Date.format(new Date(), 'X'); // returns the current day of the month
         * @type Object
         */
        formatCodes: {
            d: "Ext.String.leftPad(this.getDate(), 2, '0')",
            D: "Ext.Date.getShortDayName(this.getDay())", // get localized short day name
            j: "this.getDate()",
            l: "Ext.Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "Ext.Date.getSuffix(this)",
            w: "this.getDay()",
            z: "Ext.Date.getDayOfYear(this)",
            W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')",
            F: "Ext.Date.monthNames[this.getMonth()]",
            m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Ext.Date.getShortMonthName(this.getMonth())", // get localized short month name
            n: "(this.getMonth() + 1)",
            t: "Ext.Date.getDaysInMonth(this)",
            L: "(Ext.Date.isLeapYear(this) ? 1 : 0)",
            o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.String.leftPad(this.getHours(), 2, '0')",
            i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "Ext.Date.getGMTOffset(this)",
            P: "Ext.Date.getGMTOffset(this, true)",
            T: "Ext.Date.getTimezone(this)",
            Z: "(this.getTimezoneOffset() * -60)",

            c: function () { // ISO-8601 -- GMT format
                var c, code, i, l, e;
                for (c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    e = c.charAt(i);
                    code.push(e == "T" ? "'T'" : utilDate.getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },
            /*
            c: function() { // ISO-8601 -- UTC format
                return [
                  "this.getUTCFullYear()", "'-'",
                  "Ext.util.Format.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
                  "Ext.util.Format.leftPad(this.getUTCDate(), 2, '0')",
                  "'T'",
                  "Ext.util.Format.leftPad(this.getUTCHours(), 2, '0')", "':'",
                  "Ext.util.Format.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
                  "Ext.util.Format.leftPad(this.getUTCSeconds(), 2, '0')",
                  "'Z'"
                ].join(" + ");
            },
            */

            U: "Math.round(this.getTime() / 1000)"
        },

        /**
         * Checks if the passed Date parameters will cause a JavaScript Date "rollover".
         * @param {Number} year 4-digit year
         * @param {Number} month 1-based month-of-year
         * @param {Number} day Day of month
         * @param {Number} hour (optional) Hour
         * @param {Number} minute (optional) Minute
         * @param {Number} second (optional) Second
         * @param {Number} millisecond (optional) Millisecond
         * @return {Boolean} `true` if the passed parameters do not cause a Date "rollover", `false` otherwise.
         */
        isValid: function (y, m, d, h, i, s, ms) {
            // setup defaults
            h = h || 0;
            i = i || 0;
            s = s || 0;
            ms = ms || 0;

            // Special handling for year < 100
            var dt = utilDate.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), utilDate.YEAR, y < 100 ? y - 100 : 0);

            return y == dt.getFullYear() &&
                m == dt.getMonth() + 1 &&
                d == dt.getDate() &&
                h == dt.getHours() &&
                i == dt.getMinutes() &&
                s == dt.getSeconds() &&
                ms == dt.getMilliseconds();
        },

        /**
         * Parses the passed string using the specified date format.
         * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
         * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
         * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
         * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
         * Keep in mind that the input date string must precisely match the specified format string
         * in order for the parse operation to be successful (failed parse operations return a null value).
         * 
         * Example:
         *
         *     //dt = Fri May 25 2007 (current date)
         *     var dt = new Date();
         *     
         *     //dt = Thu May 25 2006 (today&#39;s month/day in 2006)
         *     dt = Ext.Date.parse("2006", "Y");
         *     
         *     //dt = Sun Jan 15 2006 (all date parts specified)
         *     dt = Ext.Date.parse("2006-01-15", "Y-m-d");
         *     
         *     //dt = Sun Jan 15 2006 15:20:01
         *     dt = Ext.Date.parse("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");
         *     
         *     // attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
         *     dt = Ext.Date.parse("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // returns null
         *
         * @param {String} input The raw date string.
         * @param {String} format The expected date string format.
         * @param {Boolean} [strict=false] (optional) `true` to validate date strings while parsing (i.e. prevents JavaScript Date "rollover").
         * Invalid date strings will return `null` when parsed.
         * @return {Date} The parsed Date.
         */
        parse: function (input, format, strict) {
            var p = utilDate.parseFunctions;
            if (p[format] == null) {
                utilDate.createParser(format);
            }
            return p[format].call(utilDate, input, Ext.isDefined(strict) ? strict : utilDate.useStrict);
        },

        // Backwards compat
        parseDate: function (input, format, strict) {
            return utilDate.parse(input, format, strict);
        },


        // private
        getFormatCode: function (character) {
            var f = utilDate.formatCodes[character];

            if (f) {
                f = typeof f == 'function' ? f() : f;
                utilDate.formatCodes[character] = f; // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + Ext.String.escape(character) + "'");
        },

        // private
        createFormat: function (format) {
            var code = [],
                special = false,
                ch = '',
                i;

            for (i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    code.push("'" + Ext.String.escape(ch) + "'");
                } else {
                    code.push(utilDate.getFormatCode(ch));
                }
            }
            utilDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
        },

        // private
        createParser: function (format) {
            var regexNum = utilDate.parseRegexes.length,
                currentGroup = 1,
                calc = [],
                regex = [],
                special = false,
                ch = "",
                i = 0,
                len = format.length,
                atEnd = [],
                obj;

            for (; i < len; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    regex.push(Ext.String.escape(ch));
                } else {
                    obj = utilDate.formatCodeToRegex(ch, currentGroup);
                    currentGroup += obj.g;
                    regex.push(obj.s);
                    if (obj.g && obj.c) {
                        if (obj.calcAtEnd) {
                            atEnd.push(obj.c);
                        } else {
                            calc.push(obj.c);
                        }
                    }
                }
            }

            calc = calc.concat(atEnd);

            utilDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
            utilDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
        },

        // private
        parseCodes: {
            /*
             * Notes:
             * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
             * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
             * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
             */
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|0[1-9])" // day of month with leading zeroes (01 - 31)
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|[1-9])" // day of month without leading zeroes (1 - 31)
            },
            D: function () {
                for (var a = [], i = 0; i < 7; a.push(utilDate.getShortDayName(i)), ++i); // get localised short day names
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                };
            },
            l: function () {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + utilDate.dayNames.join("|") + ")"
                };
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            //<locale type="object" property="parseCodes">
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            //</locale>
            w: {
                g: 0,
                c: null,
                s: "[0-6]" // JavaScript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g: 1,
                c: "W = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // ISO-8601 week number (with leading zero)
            },
            F: function () {
                return {
                    g: 1,
                    c: "m = parseInt(me.getMonthNumber(results[{0}]), 10);\n", // get localised month number
                    s: "(" + utilDate.monthNames.join("|") + ")"
                };
            },
            M: function () {
                for (var a = [], i = 0; i < 12; a.push(utilDate.getShortMonthName(i)), ++i); // get localised short month names
                return Ext.applyIf({
                    s: "(" + a.join("|") + ")"
                }, utilDate.formatCodeToRegex("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|0[1-9])" // month number with leading zeros (01 - 12)
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|[1-9])" // month number without leading zeros (1 - 12)
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // no. of days in the month (28 - 31)
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})" // ISO-8601 year number (with leading zero)

            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})" // 4-digit year
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
                    + "y = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n", // 2-digit year
                s: "(\\d{1,2})"
            },
            /*
             * In the am/pm parsing routines, we allow both upper and lower case
             * even though it doesn't exactly match the spec. It gives much more flexibility
             * in being able to specify case insensitive regexes.
             */
            //<locale type="object" property="parseCodes">
            a: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
                    + "if (!h || h == 12) { h = 0; }\n"
                    + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm|AM|PM)",
                calcAtEnd: true
            },
            //</locale>
            //<locale type="object" property="parseCodes">
            A: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
                    + "if (!h || h == 12) { h = 0; }\n"
                    + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM|am|pm)",
                calcAtEnd: true
            },
            //</locale>
            g: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|[0-9])" //  12-hr format of an hour without leading zeroes (1 - 12)
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|1[0-9]|[0-9])" // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|0[1-9])" //  12-hr format of an hour with leading zeroes (01 - 12)
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|[0-1][0-9])" //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])" // minutes with leading zeros (00 - 59)
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])" // seconds with leading zeros (00 - 59)
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g: 1,
                c: [
                    "o = results[{0}];",
                    "var sn = o.substring(0,1),", // get + / - sign
                        "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                        "mn = o.substring(3,5) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{4})" // GMT offset in hrs and mins
            },
            P: {
                g: 1,
                c: [
                    "o = results[{0}];",
                    "var sn = o.substring(0,1),", // get + / - sign
                        "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                        "mn = o.substring(4,6) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,5}" // timezone abbrev. may be between 1 - 5 chars
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
                      + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
            },
            c: function () {
                var calc = [],
                    arr = [
                        utilDate.formatCodeToRegex("Y", 1), // year
                        utilDate.formatCodeToRegex("m", 2), // month
                        utilDate.formatCodeToRegex("d", 3), // day
                        utilDate.formatCodeToRegex("H", 4), // hour
                        utilDate.formatCodeToRegex("i", 5), // minute
                        utilDate.formatCodeToRegex("s", 6), // second
                        { c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n" }, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                        {
                            c: [ // allow either "Z" (i.e. UTC) or "-0530" or "+08:00" (i.e. UTC offset) timezone delimiters. assumes local timezone if no timezone is specified
                               "if(results[8]) {", // timezone specified
                                   "if(results[8] == 'Z'){",
                                       "zz = 0;", // UTC
                                   "}else if (results[8].indexOf(':') > -1){",
                                       utilDate.formatCodeToRegex("P", 8).c, // timezone offset with colon separator
                                   "}else{",
                                       utilDate.formatCodeToRegex("O", 8).c, // timezone offset without colon separator
                                   "}",
                               "}"
                            ].join('\n')
                        }
                    ],
                    i,
                    l;

                for (i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: [
                        arr[0].s, // year (required)
                        "(?:", "-", arr[1].s, // month (optional)
                            "(?:", "-", arr[2].s, // day (optional)
                                "(?:",
                                    "(?:T| )?", // time delimiter -- either a "T" or a single blank space
                                    arr[3].s, ":", arr[4].s,  // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
                                    "(?::", arr[5].s, ")?", // seconds (optional)
                                    "(?:(?:\\.|,)(\\d+))?", // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
                                    "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
                                ")?",
                            ")?",
                        ")?"
                    ].join("")
                };
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
            }
        },

        //Old Ext.Date prototype methods.
        // private
        dateFormat: function (date, format) {
            return utilDate.format(date, format);
        },

        /**
         * Compares if two dates are equal by comparing their values.
         * @param {Date} date1
         * @param {Date} date2
         * @return {Boolean} `true` if the date values are equal
         */
        isEqual: function (date1, date2) {
            // check we have 2 date objects
            if (date1 && date2) {
                return (date1.getTime() === date2.getTime());
            }
            // one or both isn't a date, only equal if both are falsey
            return !(date1 || date2);
        },

        /**
         * Formats a date given the supplied format string.
         * @param {Date} date The date to format
         * @param {String} format The format string
         * @return {String} The formatted date or an empty string if date parameter is not a JavaScript Date object
         */
        format: function (date, format) {
            var formatFunctions = utilDate.formatFunctions;

            if (!Ext.isDate(date)) {
                return '';
            }

            if (formatFunctions[format] == null) {
                utilDate.createFormat(format);
            }

            return formatFunctions[format].call(date) + '';
        },

        /**
         * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
         *
         * __Note:__ The date string returned by the JavaScript Date object's `toString()` method varies
         * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
         * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
         * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
         * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
         * from the GMT offset portion of the date string.
         * @param {Date} date The date
         * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
         */
        getTimezone: function (date) {
            // the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
            //
            // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
            // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
            // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
            // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
            // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
            //
            // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
            // step 1: (?:\((.*)\) -- find timezone in parentheses
            // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
            // step 3: remove all non uppercase characters found in step 1 and 2
            return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
        },

        /**
         * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
         * @param {Date} date The date
         * @param {Boolean} [colon=false] (optional) true to separate the hours and minutes with a colon.
         * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
         */
        getGMTOffset: function (date, colon) {
            var offset = date.getTimezoneOffset();
            return (offset > 0 ? "-" : "+")
                + Ext.String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0")
                + (colon ? ":" : "")
                + Ext.String.leftPad(Math.abs(offset % 60), 2, "0");
        },

        /**
         * Get the numeric day number of the year, adjusted for leap year.
         * @param {Date} date The date
         * @return {Number} 0 to 364 (365 in leap years).
         */
        getDayOfYear: function (date) {
            var num = 0,
                d = Ext.Date.clone(date),
                m = date.getMonth(),
                i;

            for (i = 0, d.setDate(1), d.setMonth(0) ; i < m; d.setMonth(++i)) {
                num += utilDate.getDaysInMonth(d);
            }
            return num + date.getDate() - 1;
        },

        /**
         * Get the numeric ISO-8601 week number of the year.
         * (equivalent to the format specifier 'W', but without a leading zero).
         * @param {Date} date The date
         * @return {Number} 1 to 53
         * @method
         */
        getWeekOfYear: (function () {
            // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
            var ms1d = 864e5, // milliseconds in a day
                ms7d = 7 * ms1d; // milliseconds in a week

            return function (date) { // return a closure so constants get calculated only once
                var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Number
                    AWN = Math.floor(DC3 / 7), // an Absolute Week Number
                    Wyr = new Date(AWN * ms7d).getUTCFullYear();

                return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
            };
        }()),

        /**
         * Checks if the current date falls within a leap year.
         * @param {Date} date The date
         * @return {Boolean} True if the current date falls within a leap year, false otherwise.
         */
        isLeapYear: function (date) {
            var year = date.getFullYear();
            return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
        },

        /**
         * Get the first day of the current month, adjusted for leap year.  The returned value
         * is the numeric day index within the week (0-6) which can be used in conjunction with
         * the {@link #monthNames} array to retrieve the textual day name.
         *
         * Example:
         *
         *     var dt = new Date('1/10/2007'),
         *         firstDay = Ext.Date.getFirstDayOfMonth(dt);
         *     console.log(Ext.Date.dayNames[firstDay]); // output: 'Monday'
         *
         * @param {Date} date The date
         * @return {Number} The day number (0-6).
         */
        getFirstDayOfMonth: function (date) {
            var day = (date.getDay() - (date.getDate() - 1)) % 7;
            return (day < 0) ? (day + 7) : day;
        },

        /**
         * Get the last day of the current month, adjusted for leap year.  The returned value
         * is the numeric day index within the week (0-6) which can be used in conjunction with
         * the {@link #monthNames} array to retrieve the textual day name.
         *
         * Example:
         *
         *     var dt = new Date('1/10/2007'),
         *         lastDay = Ext.Date.getLastDayOfMonth(dt);
         *     console.log(Ext.Date.dayNames[lastDay]); // output: 'Wednesday'
         *
         * @param {Date} date The date
         * @return {Number} The day number (0-6).
         */
        getLastDayOfMonth: function (date) {
            return utilDate.getLastDateOfMonth(date).getDay();
        },


        /**
         * Get the date of the first day of the month in which this date resides.
         * @param {Date} date The date
         * @return {Date}
         */
        getFirstDateOfMonth: function (date) {
            return new Date(date.getFullYear(), date.getMonth(), 1);
        },

        /**
         * Get the date of the last day of the month in which this date resides.
         * @param {Date} date The date
         * @return {Date}
         */
        getLastDateOfMonth: function (date) {
            return new Date(date.getFullYear(), date.getMonth(), utilDate.getDaysInMonth(date));
        },

        /**
         * Get the number of days in the current month, adjusted for leap year.
         * @param {Date} date The date
         * @return {Number} The number of days in the month.
         * @method
         */
        getDaysInMonth: (function () {
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            return function (date) { // return a closure for efficiency
                var m = date.getMonth();

                return m == 1 && utilDate.isLeapYear(date) ? 29 : daysInMonth[m];
            };
        }()),

        //<locale type="function">
        /**
         * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
         * @param {Date} date The date
         * @return {String} 'st, 'nd', 'rd' or 'th'.
         */
        getSuffix: function (date) {
            switch (date.getDate()) {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        },
        //</locale>

        /**
         * Creates and returns a new Date instance with the exact same date value as the called instance.
         * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
         * variable will also be changed.  When the intention is to create a new variable that will not
         * modify the original instance, you should create a clone.
         *
         * Example of correctly cloning a date:
         *
         *     //wrong way:
         *     var orig = new Date('10/1/2006');
         *     var copy = orig;
         *     copy.setDate(5);
         *     console.log(orig);  // returns 'Thu Oct 05 2006'!
         *
         *     //correct way:
         *     var orig = new Date('10/1/2006'),
         *         copy = Ext.Date.clone(orig);
         *     copy.setDate(5);
         *     console.log(orig);  // returns 'Thu Oct 01 2006'
         *
         * @param {Date} date The date.
         * @return {Date} The new Date instance.
         */
        clone: function (date) {
            return new Date(date.getTime());
        },

        /**
         * Checks if the current date is affected by Daylight Saving Time (DST).
         * @param {Date} date The date
         * @return {Boolean} `true` if the current date is affected by DST.
         */
        isDST: function (date) {
            // adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
            // courtesy of @geoffrey.mcgill
            return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
        },

        /**
         * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
         * automatically adjusting for Daylight Saving Time (DST) where applicable.
         *
         * __Note:__ DST timezone information for the browser's host operating system is assumed to be up-to-date.
         * @param {Date} date The date
         * @param {Boolean} [clone=false] `true` to create a clone of this date, clear the time and return it.
         * @return {Date} this or the clone.
         */
        clearTime: function (date, clone) {
            if (clone) {
                return Ext.Date.clearTime(Ext.Date.clone(date));
            }

            // get current date before clearing time
            var d = date.getDate(),
                hr,
                c;

            // clear time
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            if (date.getDate() != d) { // account for DST (i.e. day of month changed when setting hour = 0)
                // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
                // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

                // increment hour until cloned date == current date
                for (hr = 1, c = utilDate.add(date, Ext.Date.HOUR, hr) ; c.getDate() != d; hr++, c = utilDate.add(date, Ext.Date.HOUR, hr));

                date.setDate(d);
                date.setHours(c.getHours());
            }

            return date;
        },

        /**
         * Provides a convenient method for performing basic date arithmetic. This method
         * does not modify the Date instance being called - it creates and returns
         * a new Date instance containing the resulting date value.
         *
         * Examples:
         *
         *     // Basic usage:
         *     var dt = Ext.Date.add(new Date('10/29/2006'), Ext.Date.DAY, 5);
         *     console.log(dt); // returns 'Fri Nov 03 2006 00:00:00'
         *
         *     // Negative values will be subtracted:
         *     var dt2 = Ext.Date.add(new Date('10/1/2006'), Ext.Date.DAY, -5);
         *     console.log(dt2); // returns 'Tue Sep 26 2006 00:00:00'
         *
         *      // Decimal values can be used:
         *     var dt3 = Ext.Date.add(new Date('10/1/2006'), Ext.Date.DAY, 1.25);
         *     console.log(dt3); // returns 'Mon Oct 02 2006 06:00:00'
         *
         * @param {Date} date The date to modify
         * @param {String} interval A valid date interval enum value.
         * @param {Number} value The amount to add to the current date.
         * @return {Date} The new Date instance.
         */
        add: function (date, interval, value) {
            var d = Ext.Date.clone(date),
                Date = Ext.Date,
                day, decimalValue, base = 0;
            if (!interval || value === 0) {
                return d;
            }

            decimalValue = value - parseInt(value, 10);
            value = parseInt(value, 10);

            if (value) {
                switch (interval.toLowerCase()) {
                    // See EXTJSIV-7418. We use setTime() here to deal with issues related to
                    // the switchover that occurs when changing to daylight savings and vice
                    // versa. setTime() handles this correctly where setHour/Minute/Second/Millisecond
                    // do not. Let's assume the DST change occurs at 2am and we're incrementing using add
                    // for 15 minutes at time. When entering DST, we should see:
                    // 01:30am
                    // 01:45am
                    // 03:00am // skip 2am because the hour does not exist
                    // ...
                    // Similarly, leaving DST, we should see:
                    // 01:30am
                    // 01:45am
                    // 01:00am // repeat 1am because that's the change over
                    // 01:30am
                    // 01:45am
                    // 02:00am
                    // ....
                    // 
                    case Ext.Date.MILLI:
                        d.setTime(d.getTime() + value);
                        break;
                    case Ext.Date.SECOND:
                        d.setTime(d.getTime() + value * 1000);
                        break;
                    case Ext.Date.MINUTE:
                        d.setTime(d.getTime() + value * 60 * 1000);
                        break;
                    case Ext.Date.HOUR:
                        d.setTime(d.getTime() + value * 60 * 60 * 1000);
                        break;
                    case Ext.Date.DAY:
                        d.setDate(d.getDate() + value);
                        break;
                    case Ext.Date.MONTH:
                        day = date.getDate();
                        if (day > 28) {
                            day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), Ext.Date.MONTH, value)).getDate());
                        }
                        d.setDate(day);
                        d.setMonth(date.getMonth() + value);
                        break;
                    case Ext.Date.YEAR:
                        day = date.getDate();
                        if (day > 28) {
                            day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), Ext.Date.YEAR, value)).getDate());
                        }
                        d.setDate(day);
                        d.setFullYear(date.getFullYear() + value);
                        break;
                }
            }

            if (decimalValue) {
                switch (interval.toLowerCase()) {
                    case Ext.Date.MILLI: base = 1; break;
                    case Ext.Date.SECOND: base = 1000; break;
                    case Ext.Date.MINUTE: base = 1000 * 60; break;
                    case Ext.Date.HOUR: base = 1000 * 60 * 60; break;
                    case Ext.Date.DAY: base = 1000 * 60 * 60 * 24; break;

                    case Ext.Date.MONTH:
                        day = utilDate.getDaysInMonth(d);
                        base = 1000 * 60 * 60 * 24 * day;
                        break;

                    case Ext.Date.YEAR:
                        day = (utilDate.isLeapYear(d) ? 366 : 365);
                        base = 1000 * 60 * 60 * 24 * day;
                        break;
                }
                if (base) {
                    d.setTime(d.getTime() + base * decimalValue);
                }
            }

            return d;
        },

        /**
         * Provides a convenient method for performing basic date arithmetic. This method
         * does not modify the Date instance being called - it creates and returns
         * a new Date instance containing the resulting date value.
         * 
         * Examples:
         *
         *     // Basic usage:
         *     var dt = Ext.Date.subtract(new Date('10/29/2006'), Ext.Date.DAY, 5);
         *     console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'
         *
         *     // Negative values will be added:
         *     var dt2 = Ext.Date.subtract(new Date('10/1/2006'), Ext.Date.DAY, -5);
         *     console.log(dt2); // returns 'Fri Oct 6 2006 00:00:00'
         *
         *      // Decimal values can be used:
         *     var dt3 = Ext.Date.subtract(new Date('10/1/2006'), Ext.Date.DAY, 1.25);
         *     console.log(dt3); // returns 'Fri Sep 29 2006 06:00:00'
         * 
         * @param {Date} date The date to modify
         * @param {String} interval A valid date interval enum value.
         * @param {Number} value The amount to subtract from the current date.
         * @return {Date} The new Date instance.
         */
        subtract: function (date, interval, value) {
            return utilDate.add(date, interval, -value);
        },

        /**
         * Checks if a date falls on or between the given start and end dates.
         * @param {Date} date The date to check
         * @param {Date} start Start date
         * @param {Date} end End date
         * @return {Boolean} `true` if this date falls on or between the given start and end dates.
         */
        between: function (date, start, end) {
            var t = date.getTime();
            return start.getTime() <= t && t <= end.getTime();
        },

        //Maintains compatibility with old static and prototype window.Date methods.
        compat: function () {
            var nativeDate = window.Date,
                p,
                statics = ['useStrict', 'formatCodeToRegex', 'parseFunctions', 'parseRegexes', 'formatFunctions', 'y2kYear', 'MILLI', 'SECOND', 'MINUTE', 'HOUR', 'DAY', 'MONTH', 'YEAR', 'defaults', 'dayNames', 'monthNames', 'monthNumbers', 'getShortMonthName', 'getShortDayName', 'getMonthNumber', 'formatCodes', 'isValid', 'parseDate', 'getFormatCode', 'createFormat', 'createParser', 'parseCodes'],
                proto = ['dateFormat', 'format', 'getTimezone', 'getGMTOffset', 'getDayOfYear', 'getWeekOfYear', 'isLeapYear', 'getFirstDayOfMonth', 'getLastDayOfMonth', 'getDaysInMonth', 'getSuffix', 'clone', 'isDST', 'clearTime', 'add', 'between'],
                sLen = statics.length,
                pLen = proto.length,
                stat, prot, s;

            //Append statics
            for (s = 0; s < sLen; s++) {
                stat = statics[s];
                nativeDate[stat] = utilDate[stat];
            }

            //Append to prototype
            for (p = 0; p < pLen; p++) {
                prot = proto[p];
                nativeDate.prototype[prot] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(this);
                    return utilDate[prot].apply(utilDate, args);
                };
            }
        }
    });
};