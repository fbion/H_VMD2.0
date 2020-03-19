/*扩展ext的Array date function number object string*/
/**
 * @class Vmd.String
 *
 * A collection of useful static methods to deal with strings.
 * @singleton
 */

Vmd.String = (function () {
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
         *     Vmd.String.insert("abcdefg", "h", -1); // abcdefhg
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
         * {@link Vmd.String#htmlEncode} and {@link Vmd.String#htmlDecode}.
         *
         * This object should be keyed by the entity name sequence,
         * with the value being the textual representation of the entity.
         *
         *      Vmd.String.addCharacterEntities({
         *          '&amp;Uuml;':'Ü',
         *          '&amp;ccedil;':'ç',
         *          '&amp;ntilde;':'ñ',
         *          '&amp;egrave;':'è'
         *      });
         *      var s = Vmd.String.htmlEncode("A string with entities: èÜçñ");
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
         * the {@link Vmd.String#resetCharacterEntities} method
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
         * {@link Vmd.String#htmlEncode} and {@link Vmd.String#htmlDecode} back to the
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
            if (!Vmd.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },

        /**
         * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
         *
         *     var s = '  foo bar  ';
         *     alert('-' + s + '-');                   //alerts "- foo bar -"
         *     alert('-' + Vmd.String.trim(s) + '-');  //alerts "-foo bar-"
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
         *     sort = Vmd.String.toggle(sort, 'ASC', 'DESC');
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
         *     var s = Vmd.String.leftPad('123', 5, '0');
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
         *     var s = Vmd.String.format('<div class="{0}">{1}</div>', cls, text);
         *     // s now contains the string: '<div class="my-class">Some text</div>'
         *
         * @param {String} string The tokenized string to be formatted.
         * @param {Mixed...} values The values to replace tokens `{0}`, `{1}`, etc in order.
         * @return {String} The formatted string.
         */
        format: function (format) {
            var args = Vmd.Array.toArray(arguments, 1);
            return format.replace(formatRe, function (m, i) {
                return args[i];
            });
        },

        /**
         * Returns a string with a specified number of repetitions a given string pattern.
         * The pattern be separated by a different string.
         *
         *      var s = Vmd.String.repeat('---', 4); // = '------------'
         *      var t = Vmd.String.repeat('--', 3, '/'); // = '--/--/--'
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
Vmd.String.resetCharacterEntities();


/**
 * @class Vmd.Array
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

    ExtArray = Vmd.Array = {
        /**
         * Iterates an array or an iterable value and invoke the given callback function for each item.
         *
         *     var countries = ['Vietnam', 'Singapore', 'United States', 'Russia'];
         *
         *     Vmd.Array.each(countries, function(name, index, countriesItSelf) {
         *         console.log(name);
         *     });
         *
         *     var sum = function() {
         *         var sum = 0;
         *
         *         Vmd.Array.each(arguments, function(value) {
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
         *     Vmd.Array.each(countries, function(name, index, countriesItSelf) {
         *         if (name === 'Singapore') {
         *             return false; // break here
         *         }
         *     });
         *
         * {@link Vmd#each Vmd.each} is alias for {@link Vmd.Array#each Vmd.Array.each}
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
         * iteration by returning false in the callback function like {@link Vmd.Array#each}. However, performance
         * could be much better in modern browsers comparing with {@link Vmd.Array#each}
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
         *         var args = Vmd.Array.toArray(arguments),
         *             fromSecondToLastArgs = Vmd.Array.toArray(arguments, 1);
         *
         *         alert(args.join(' '));
         *         alert(fromSecondToLastArgs.join(' '));
         *     }
         *
         *     test('just', 'testing', 'here'); // alerts 'just testing here';
         *                                      // alerts 'testing here';
         *
         *     Vmd.Array.toArray(document.getElementsByTagName('div')); // will convert the NodeList into an array
         *     Vmd.Array.toArray('splitted'); // returns ['s', 'p', 'l', 'i', 't', 't', 'e', 'd']
         *     Vmd.Array.toArray('splitted', 0, 3); // returns ['s', 'p', 'l']
         *
         * {@link Vmd#toArray Vmd.toArray} is alias for {@link Vmd.Array#toArray Vmd.Array.toArray}
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
         *     Vmd.Array.pluck(Vmd.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
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
                Vmd.Error.raise('Vmd.Array.map must have a callback function passed as second argument.');
            }
            return array.map(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.map must have a callback function passed as second argument.');
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
                Vmd.Error.raise('Vmd.Array.every must have a callback function passed as second argument.');
            }
            return array.every(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.every must have a callback function passed as second argument.');
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
                Vmd.Error.raise('Vmd.Array.some must have a callback function passed as second argument.');
            }
            return array.some(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.some must have a callback function passed as second argument.');
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
         * Filter through an array and remove empty item as defined in {@link Vmd#isEmpty Vmd.isEmpty}
         *
         * See {@link Vmd.Array#filter}
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

                if (!Vmd.isEmpty(item)) {
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
                Vmd.Error.raise('Vmd.Array.filter must have a filter function passed as second argument.');
            }
            return array.filter(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.filter must have a filter function passed as second argument.');
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
         * - An array copy if given value is {@link Vmd#isIterable iterable} (arguments, NodeList and alike)
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

            if (Vmd.isArray(value)) {
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
         * from Vmd.clone since it doesn't handle recursive cloning. It's simply a convenient, easy-to-remember method
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
         * {@link Vmd.Array#union} is alias for {@link Vmd.Array#merge}
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

                    if (Vmd.isArray(v)) {
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
         *      var map = Vmd.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Vmd.Array.toMap([
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
         *      var map = Vmd.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 'a', b: 'b', c: 'c' };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: {name: 'a'}, b: {name: 'b'}, c: {name: 'c'} };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Vmd.Array.toMap([
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
            } else if (!Vmd.isArray(array)) {
                array = [array];
            }
            for (; i < len; i++) {
                newItem = arguments[i];
                Array.prototype.push[Vmd.isIterable(newItem) ? 'apply' : 'call'](array, newItem);
            }
            return array;
        }
    };

    /**
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#each
     */
    Vmd.each = ExtArray.each;

    /**
     * @method
     * @member Vmd.Array
     * @inheritdoc Vmd.Array#merge
     */
    ExtArray.union = ExtArray.merge;

    /**
     * Old alias to {@link Vmd.Array#min}
     * @deprecated 4.0.0 Use {@link Vmd.Array#min} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#min
     */
    Vmd.min = ExtArray.min;

    /**
     * Old alias to {@link Vmd.Array#max}
     * @deprecated 4.0.0 Use {@link Vmd.Array#max} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#max
     */
    Vmd.max = ExtArray.max;

    /**
     * Old alias to {@link Vmd.Array#sum}
     * @deprecated 4.0.0 Use {@link Vmd.Array#sum} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#sum
     */
    Vmd.sum = ExtArray.sum;

    /**
     * Old alias to {@link Vmd.Array#mean}
     * @deprecated 4.0.0 Use {@link Vmd.Array#mean} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#mean
     */
    Vmd.mean = ExtArray.mean;

    /**
     * Old alias to {@link Vmd.Array#flatten}
     * @deprecated 4.0.0 Use {@link Vmd.Array#flatten} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#flatten
     */
    Vmd.flatten = ExtArray.flatten;

    /**
     * Old alias to {@link Vmd.Array#clean}
     * @deprecated 4.0.0 Use {@link Vmd.Array#clean} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#clean
     */
    Vmd.clean = ExtArray.clean;

    /**
     * Old alias to {@link Vmd.Array#unique}
     * @deprecated 4.0.0 Use {@link Vmd.Array#unique} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#unique
     */
    Vmd.unique = ExtArray.unique;

    /**
     * Old alias to {@link Vmd.Array#pluck Vmd.Array.pluck}
     * @deprecated 4.0.0 Use {@link Vmd.Array#pluck Vmd.Array.pluck} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#pluck
     */
    Vmd.pluck = ExtArray.pluck;

    /**
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#toArray
     */
    Vmd.toArray = function () {
        return ExtArray.toArray.apply(ExtArray, arguments);
    };
}());

// @tag foundation,core
// @require Array.js
// @define Vmd.Function

/**
 * @class Vmd.Function
 *
 * A collection of useful static methods to deal with function callbacks
 * @singleton
 * @alternateClassName Vmd.util.Functions
 */
Vmd.Function = {

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
     *     var setValue = Vmd.Function.flexSetter(function(name, value) {
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

                if (Vmd.enumerables) {
                    for (i = Vmd.enumerables.length; i--;) {
                        k = Vmd.enumerables[i];
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
     * {@link Vmd#bind Vmd.bind} is alias for {@link Vmd.Function#bind Vmd.Function.bind}
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
                Vmd.Array.insert(callArgs, appendArgs, args);
            }

            return method.apply(scope || Vmd.global, callArgs);
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
     *         alert(Vmd.Array.from(arguments).join(' '));
     *     };
     *
     *     var callback = Vmd.Function.pass(originalFunction, ['Hello', 'World']);
     *
     *     callback(); // alerts 'Hello World'
     *     callback('by Me'); // alerts 'Hello World by Me'
     *
     * {@link Vmd#pass Vmd.pass} is alias for {@link Vmd.Function#pass Vmd.Function.pass}
     *
     * @param {Function} fn The original function
     * @param {Array} args The arguments to pass to new callback
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * @return {Function} The new callback function
     */
    pass: function (fn, args, scope) {
        if (!Vmd.isArray(args)) {
            if (Vmd.isIterable(args)) {
                args = Vmd.Array.clone(args);
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
     *     var sayHiToFriend = Vmd.Function.createInterceptor(sayHi, function(name){
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
        if (!Vmd.isFunction(newFn)) {
            return origFn;
        } else {
            returnValue = Vmd.isDefined(returnValue) ? returnValue : null;
            return function () {
                var me = this,
                    args = arguments;

                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || Vmd.global, args) !== false) ? origFn.apply(me || Vmd.global, args) : returnValue;
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
            fn = Vmd.Function.bind(fn, scope, args, appendArgs);
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
     *     Vmd.Function.defer(sayHi, 2000, this, ['Fred']);
     *
     *     // this syntax is sometimes useful for deferring
     *     // execution of an anonymous function:
     *     Vmd.Function.defer(function(){
     *         alert('Anonymous');
     *     }, 100);
     *
     * {@link Vmd#defer Vmd.defer} is alias for {@link Vmd.Function#defer Vmd.Function.defer}
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
        fn = Vmd.Function.bind(fn, scope, args, appendArgs);
        if (millis > 0) {
            return setTimeout(Vmd.supports.TimeoutActualLateness ? function () {
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
     *     var sayGoodbye = Vmd.Function.createSequence(sayHi, function(name){
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
            lastCallTime = Vmd.Date.now();
        };

        return function () {
            elapsed = Vmd.Date.now() - lastCallTime;
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
     *     Vmd.Function.interceptBefore(soup, "add", function(ingredient){
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
        var method = object[methodName] || Vmd.emptyFn;

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
     *     Vmd.Function.interceptAfter(soup, "add", function(ingredient){
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
        var method = object[methodName] || Vmd.emptyFn;

        return (object[methodName] = function () {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }
};

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#defer
 */
Vmd.defer = Vmd.Function.alias(Vmd.Function, 'defer');

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#pass
 */
Vmd.pass = Vmd.Function.alias(Vmd.Function, 'pass');

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#bind
 */
Vmd.bind = Vmd.Function.alias(Vmd.Function, 'bind');

// @tag foundation,core
// @require Function.js
// @define Vmd.Object

/**
 * @class Vmd.Object
 *
 * A collection of useful static methods to deal with objects.
 *
 * @singleton
 */

(function () {

    // The "constructor" for chain:
    var TemplateClass = function () { },
        ExtObject = Vmd.Object = {

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
             *     var objects = Vmd.Object.toQueryObjects('hobbies', ['reading', 'cooking', 'swimming']);
             *
             *     // objects then equals:
             *     [
             *         { name: 'hobbies', value: 'reading' },
             *         { name: 'hobbies', value: 'cooking' },
             *         { name: 'hobbies', value: 'swimming' },
             *     ];
             *
             *     var objects = Vmd.Object.toQueryObjects('dateOfBirth', {
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

                if (Vmd.isArray(value)) {
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
                else if (Vmd.isObject(value)) {
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
             *     Vmd.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
             *     Vmd.Object.toQueryString({foo: null, bar: 2}); // returns "foo=&bar=2"
             *     Vmd.Object.toQueryString({'some price': '$300'}); // returns "some%20price=%24300"
             *     Vmd.Object.toQueryString({date: new Date(2011, 0, 1)}); // returns "date=%222011-01-01T00%3A00%3A00%22"
             *     Vmd.Object.toQueryString({colors: ['red', 'green', 'blue']}); // returns "colors=red&colors=green&colors=blue"
             *
             * Recursive:
             *
             *     Vmd.Object.toQueryString({
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

                    if (Vmd.isEmpty(value)) {
                        value = '';
                    } else if (Vmd.isDate(value)) {
                        value = Vmd.Date.toString(value);
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
             *     Vmd.Object.fromQueryString("foo=1&bar=2"); // returns {foo: '1', bar: '2'}
             *     Vmd.Object.fromQueryString("foo=&bar=2"); // returns {foo: null, bar: '2'}
             *     Vmd.Object.fromQueryString("some%20price=%24300"); // returns {'some price': '$300'}
             *     Vmd.Object.fromQueryString("colors=red&colors=green&colors=blue"); // returns {colors: ['red', 'green', 'blue']}
             *
             * Recursive:
             *
             *     Vmd.Object.fromQueryString(
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
                                if (!Vmd.isArray(object[name])) {
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
                                throw new Error('[Vmd.Object.fromQueryString] Malformed query string given, failed parsing name from "' + part + '"');
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
                                    if (Vmd.isArray(temp) && key === '') {
                                        temp.push(value);
                                    }
                                    else {
                                        temp[key] = value;
                                    }
                                }
                                else {
                                    if (temp[key] === undefined || typeof temp[key] === 'string') {
                                        nextKey = keys[j + 1];

                                        temp[key] = (Vmd.isNumeric(nextKey) || nextKey === '') ? [] : {};
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
             *     Vmd.Object.each(person, function(key, value, myself) {
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
             *         companyName: 'Vmd JS',
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer'],
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
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer', 'Sencha Touch', 'Sencha Animator'],
             *         office: {
             *             size: 40000,
             *             location: 'Redwood City'
             *         }
             *     };
             *
             *     var sencha = Vmd.Object.merge(extjs, newStuff);
             *
             *     // extjs and sencha then equals to
             *     {
             *         companyName: 'Sencha Inc.',
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer', 'Sencha Touch', 'Sencha Animator'],
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
                    cloneFn = Vmd.clone,
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
                    cloneFn = Vmd.clone,
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
             *     alert(Vmd.Object.getKey(person, 'food')); // alerts 'loves'
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
             *     var values = Vmd.Object.getValues({
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
             *     var values = Vmd.Object.getKeys({
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
             *     var size = Vmd.Object.getSize({
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
             *     Vmd.Object.equals({
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
     * A convenient alias method for {@link Vmd.Object#merge}.
     *
     * @member Vmd
     * @method merge
     * @inheritdoc Vmd.Object#merge
     */
    Vmd.merge = Vmd.Object.merge;

    /**
     * @private
     * @member Vmd
     */
    Vmd.mergeIf = Vmd.Object.mergeIf;

    /**
     *
     * @member Vmd
     * @method urlEncode
     * @inheritdoc Vmd.Object#toQueryString
     * @deprecated 4.0.0 Use {@link Vmd.Object#toQueryString} instead
     */
    Vmd.urlEncode = function () {
        var args = Vmd.Array.from(arguments),
            prefix = '';

        // Support for the old `pre` argument
        if ((typeof args[1] === 'string')) {
            prefix = args[1] + '&';
            args[1] = false;
        }

        return prefix + ExtObject.toQueryString.apply(ExtObject, args);
    };

    /**
     * Alias for {@link Vmd.Object#fromQueryString}.
     *
     * @member Vmd
     * @method urlDecode
     * @inheritdoc Vmd.Object#fromQueryString
     * @deprecated 4.0.0 Use {@link Vmd.Object#fromQueryString} instead
     */
    Vmd.urlDecode = function () {
        return ExtObject.fromQueryString.apply(ExtObject, arguments);
    };

}());
