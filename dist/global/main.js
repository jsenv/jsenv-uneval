var __jsenv_uneval__ = (function (exports) {
  'use strict';

  var nativeTypeOf = function nativeTypeOf(obj) {
    return typeof obj;
  };

  var customTypeOf = function customTypeOf(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? nativeTypeOf : customTypeOf;

  /* eslint-disable no-eq-null, eqeqeq */
  function arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    var arr2 = new Array(len);

    for (var i = 0; i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayWithoutHoles = (function (arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  });

  // eslint-disable-next-line consistent-return
  var iterableToArray = (function (iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  });

  /* eslint-disable consistent-return */
  function unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var nonIterableSpread = (function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  });

  var _toConsumableArray = (function (arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  });

  // https://developer.mozilla.org/en-US/docs/Glossary/Primitive
  var isComposite = function isComposite(value) {
    if (value === null) {
      return false;
    }

    var type = _typeof(value);

    if (type === "object") {
      return true;
    }

    if (type === "function") {
      return true;
    }

    return false;
  };

  var compositeWellKnownMap = new WeakMap();
  var primitiveWellKnownMap = new Map();
  var getCompositeGlobalPath = function getCompositeGlobalPath(value) {
    return compositeWellKnownMap.get(value);
  };
  var getPrimitiveGlobalPath = function getPrimitiveGlobalPath(value) {
    return primitiveWellKnownMap.get(value);
  };

  var visitGlobalObject = function visitGlobalObject(value) {
    var visitValue = function visitValue(value, path) {
      if (isComposite(value)) {
        // prevent infinite recursion
        if (compositeWellKnownMap.has(value)) {
          return;
        }

        compositeWellKnownMap.set(value, path);

        var visitProperty = function visitProperty(property) {
          var descriptor;

          try {
            descriptor = Object.getOwnPropertyDescriptor(value, property);
          } catch (e) {
            if (e.name === "SecurityError") {
              return;
            }

            throw e;
          }

          if (!descriptor) {
            // it's apparently possible to have getOwnPropertyNames returning
            // a property that later returns a null descriptor
            // for instance window.showModalDialog in webkit 13.0
            return;
          } // do not trigger getter/setter


          if ("value" in descriptor) {
            var propertyValue = descriptor.value;
            visitValue(propertyValue, [].concat(_toConsumableArray(path), [property]));
          }
        };

        Object.getOwnPropertyNames(value).forEach(function (name) {
          return visitProperty(name);
        });
        Object.getOwnPropertySymbols(value).forEach(function (symbol) {
          return visitProperty(symbol);
        });
      }

      primitiveWellKnownMap.set(value, path);
      return;
    };

    visitValue(value, []);
  };

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") visitGlobalObject(window);
  if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === "object") visitGlobalObject(global);

  var decompose = function decompose(mainValue, _ref) {
    var functionAllowed = _ref.functionAllowed,
        prototypeStrict = _ref.prototypeStrict,
        ignoreSymbols = _ref.ignoreSymbols;
    var valueMap = {};
    var recipeArray = [];

    var valueToIdentifier = function valueToIdentifier(value) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!isComposite(value)) {
        var _existingIdentifier = identifierForPrimitive(value);

        if (_existingIdentifier !== undefined) {
          return _existingIdentifier;
        }

        var _identifier = identifierForNewValue(value);

        recipeArray[_identifier] = primitiveToRecipe(value);
        return _identifier;
      }

      if (typeof Promise === "function" && value instanceof Promise) {
        throw new Error(createPromiseAreNotSupportedMessage({
          path: path
        }));
      }

      if (typeof WeakSet === "function" && value instanceof WeakSet) {
        throw new Error(createWeakSetAreNotSupportedMessage({
          path: path
        }));
      }

      if (typeof WeakMap === "function" && value instanceof WeakMap) {
        throw new Error(createWeakMapAreNotSupportedMessage({
          path: path
        }));
      }

      if (typeof value === "function" && !functionAllowed) {
        throw new Error(createForbiddenFunctionMessage({
          path: path
        }));
      }

      var existingIdentifier = identifierForComposite(value);

      if (existingIdentifier !== undefined) {
        return existingIdentifier;
      }

      var identifier = identifierForNewValue(value);
      var compositeGlobalPath = getCompositeGlobalPath(value);

      if (compositeGlobalPath) {
        recipeArray[identifier] = createGlobalReferenceRecipe(compositeGlobalPath);
        return identifier;
      }

      var propertyDescriptionArray = [];
      Object.getOwnPropertyNames(value).forEach(function (propertyName) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(value, propertyName);
        var propertyNameIdentifier = valueToIdentifier(propertyName, [].concat(_toConsumableArray(path), [propertyName]));
        var propertyDescription = computePropertyDescription(propertyDescriptor, propertyName, path);
        propertyDescriptionArray.push({
          propertyNameIdentifier: propertyNameIdentifier,
          propertyDescription: propertyDescription
        });
      });
      var symbolDescriptionArray = [];

      if (!ignoreSymbols) {
        Object.getOwnPropertySymbols(value).forEach(function (symbol) {
          var propertyDescriptor = Object.getOwnPropertyDescriptor(value, symbol);
          var symbolIdentifier = valueToIdentifier(symbol, [].concat(_toConsumableArray(path), ["[".concat(symbol.toString(), "]")]));
          var propertyDescription = computePropertyDescription(propertyDescriptor, symbol, path);
          symbolDescriptionArray.push({
            symbolIdentifier: symbolIdentifier,
            propertyDescription: propertyDescription
          });
        });
      }

      var methodDescriptionArray = computeMethodDescriptionArray(value, path);
      var extensible = Object.isExtensible(value);
      recipeArray[identifier] = createCompositeRecipe({
        propertyDescriptionArray: propertyDescriptionArray,
        symbolDescriptionArray: symbolDescriptionArray,
        methodDescriptionArray: methodDescriptionArray,
        extensible: extensible
      });
      return identifier;
    };

    var computePropertyDescription = function computePropertyDescription(propertyDescriptor, propertyNameOrSymbol, path) {
      if (propertyDescriptor.set && !functionAllowed) {
        throw new Error(createForbiddenPropertySetterMessage({
          path: path,
          propertyNameOrSymbol: propertyNameOrSymbol
        }));
      }

      if (propertyDescriptor.get && !functionAllowed) {
        throw new Error(createForbiddenPropertyGetterMessage({
          path: path,
          propertyNameOrSymbol: propertyNameOrSymbol
        }));
      }

      return {
        configurable: propertyDescriptor.configurable,
        writable: propertyDescriptor.writable,
        enumerable: propertyDescriptor.enumerable,
        getIdentifier: "get" in propertyDescriptor ? valueToIdentifier(propertyDescriptor.get, [].concat(_toConsumableArray(path), [String(propertyNameOrSymbol), "[[descriptor:get]]"])) : undefined,
        setIdentifier: "set" in propertyDescriptor ? valueToIdentifier(propertyDescriptor.set, [].concat(_toConsumableArray(path), [String(propertyNameOrSymbol), "[[descriptor:set]]"])) : undefined,
        valueIdentifier: "value" in propertyDescriptor ? valueToIdentifier(propertyDescriptor.value, [].concat(_toConsumableArray(path), [String(propertyNameOrSymbol), "[[descriptor:value]]"])) : undefined
      };
    };

    var computeMethodDescriptionArray = function computeMethodDescriptionArray(value, path) {
      var methodDescriptionArray = [];

      if (typeof Set === "function" && value instanceof Set) {
        var callArray = [];
        value.forEach(function (entryValue, index) {
          var entryValueIdentifier = valueToIdentifier(entryValue, [].concat(_toConsumableArray(path), ["[[SetEntryValue]]", index]));
          callArray.push([entryValueIdentifier]);
        });
        methodDescriptionArray.push({
          methodNameIdentifier: valueToIdentifier("add"),
          callArray: callArray
        });
      }

      if (typeof Map === "function" && value instanceof Map) {
        var _callArray = [];
        value.forEach(function (entryValue, entryKey) {
          var entryKeyIdentifier = valueToIdentifier(entryKey, [].concat(_toConsumableArray(path), ["[[MapEntryKey]]", entryKey]));
          var entryValueIdentifier = valueToIdentifier(entryValue, [].concat(_toConsumableArray(path), ["[[MapEntryValue]]", entryValue]));

          _callArray.push([entryKeyIdentifier, entryValueIdentifier]);
        });
        methodDescriptionArray.push({
          methodNameIdentifier: valueToIdentifier("set"),
          callArray: _callArray
        });
      }

      return methodDescriptionArray;
    };

    var identifierForPrimitive = function identifierForPrimitive(value) {
      return Object.keys(valueMap).find(function (existingIdentifier) {
        var existingValue = valueMap[existingIdentifier];
        if (Object.is(value, existingValue)) return true;
        return value === existingValue;
      });
    };

    var identifierForComposite = function identifierForComposite(value) {
      return Object.keys(valueMap).find(function (existingIdentifier) {
        var existingValue = valueMap[existingIdentifier];
        return value === existingValue;
      });
    };

    var identifierForNewValue = function identifierForNewValue(value) {
      var identifier = nextIdentifier();
      valueMap[identifier] = value;
      return identifier;
    };

    var currentIdentifier = -1;

    var nextIdentifier = function nextIdentifier() {
      var identifier = String(parseInt(currentIdentifier) + 1);
      currentIdentifier = identifier;
      return identifier;
    };

    var mainIdentifier = valueToIdentifier(mainValue); // prototype, important to keep after the whole structure was visited
    // so that we discover if any prototype is part of the value

    var prototypeValueToIdentifier = function prototypeValueToIdentifier(prototypeValue) {
      // prototype is null
      if (prototypeValue === null) {
        return valueToIdentifier(prototypeValue);
      } // prototype found somewhere already


      var prototypeExistingIdentifier = identifierForComposite(prototypeValue);

      if (prototypeExistingIdentifier !== undefined) {
        return prototypeExistingIdentifier;
      } // mark prototype as visited


      var prototypeIdentifier = identifierForNewValue(prototypeValue); // prototype is a global reference ?

      var prototypeGlobalPath = getCompositeGlobalPath(prototypeValue);

      if (prototypeGlobalPath) {
        recipeArray[prototypeIdentifier] = createGlobalReferenceRecipe(prototypeGlobalPath);
        return prototypeIdentifier;
      } // otherwise prototype is unknown


      if (prototypeStrict) {
        throw new Error(createUnknownPrototypeMessage({
          prototypeValue: prototypeValue
        }));
      }

      return prototypeValueToIdentifier(Object.getPrototypeOf(prototypeValue));
    };

    var identifierForValueOf = function identifierForValueOf(value) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (value instanceof Array) {
        return valueToIdentifier(value.length, [].concat(_toConsumableArray(path), ["length"]));
      }

      if ("valueOf" in value === false) {
        return undefined;
      }

      if (typeof value.valueOf !== "function") {
        return undefined;
      }

      var valueOfReturnValue = value.valueOf();

      if (!isComposite(valueOfReturnValue)) {
        return valueToIdentifier(valueOfReturnValue, [].concat(_toConsumableArray(path), ["valueOf()"]));
      }

      if (valueOfReturnValue === value) {
        return undefined;
      }

      throw new Error(createUnexpectedValueOfReturnValueMessage());
    };

    recipeArray.slice().forEach(function (recipe, index) {
      if (recipe.type === "composite") {
        var value = valueMap[index];

        if (typeof value === "function") {
          var valueOfIdentifier = nextIdentifier();
          recipeArray[valueOfIdentifier] = {
            type: "primitive",
            value: value
          };
          recipe.valueOfIdentifier = valueOfIdentifier;
          return;
        }

        if (value instanceof RegExp) {
          var _valueOfIdentifier = nextIdentifier();

          recipeArray[_valueOfIdentifier] = {
            type: "primitive",
            value: value
          };
          recipe.valueOfIdentifier = _valueOfIdentifier;
          return;
        } // valueOf, mandatory to uneval new Date(10) for instance.


        recipe.valueOfIdentifier = identifierForValueOf(value);
        var prototypeValue = Object.getPrototypeOf(value);
        recipe.prototypeIdentifier = prototypeValueToIdentifier(prototypeValue);
      }
    });
    return {
      recipeArray: recipeArray,
      mainIdentifier: mainIdentifier,
      valueMap: valueMap
    };
  };

  var primitiveToRecipe = function primitiveToRecipe(value) {
    if (_typeof(value) === "symbol") {
      return symbolToRecipe(value);
    }

    return createPimitiveRecipe(value);
  };

  var symbolToRecipe = function symbolToRecipe(symbol) {
    var globalSymbolKey = Symbol.keyFor(symbol);

    if (globalSymbolKey !== undefined) {
      return createGlobalSymbolRecipe(globalSymbolKey);
    }

    var symbolGlobalPath = getPrimitiveGlobalPath(symbol);

    if (!symbolGlobalPath) {
      throw new Error(createUnknownSymbolMessage({
        symbol: symbol
      }));
    }

    return createGlobalReferenceRecipe(symbolGlobalPath);
  };

  var createPimitiveRecipe = function createPimitiveRecipe(value) {
    return {
      type: "primitive",
      value: value
    };
  };

  var createGlobalReferenceRecipe = function createGlobalReferenceRecipe(path) {
    var recipe = {
      type: "global-reference",
      path: path
    };
    return recipe;
  };

  var createGlobalSymbolRecipe = function createGlobalSymbolRecipe(key) {
    return {
      type: "global-symbol",
      key: key
    };
  };

  var createCompositeRecipe = function createCompositeRecipe(_ref2) {
    var prototypeIdentifier = _ref2.prototypeIdentifier,
        valueOfIdentifier = _ref2.valueOfIdentifier,
        propertyDescriptionArray = _ref2.propertyDescriptionArray,
        symbolDescriptionArray = _ref2.symbolDescriptionArray,
        methodDescriptionArray = _ref2.methodDescriptionArray,
        extensible = _ref2.extensible;
    return {
      type: "composite",
      prototypeIdentifier: prototypeIdentifier,
      valueOfIdentifier: valueOfIdentifier,
      propertyDescriptionArray: propertyDescriptionArray,
      symbolDescriptionArray: symbolDescriptionArray,
      methodDescriptionArray: methodDescriptionArray,
      extensible: extensible
    };
  };

  var createPromiseAreNotSupportedMessage = function createPromiseAreNotSupportedMessage(_ref3) {
    var path = _ref3.path;

    if (path.length === 0) {
      return "promise are not supported.";
    }

    return "promise are not supported.\npromise found at: ".concat(path.join(""));
  };

  var createWeakSetAreNotSupportedMessage = function createWeakSetAreNotSupportedMessage(_ref4) {
    var path = _ref4.path;

    if (path.length === 0) {
      return "weakSet are not supported.";
    }

    return "weakSet are not supported.\nweakSet found at: ".concat(path.join(""));
  };

  var createWeakMapAreNotSupportedMessage = function createWeakMapAreNotSupportedMessage(_ref5) {
    var path = _ref5.path;

    if (path.length === 0) {
      return "weakMap are not supported.";
    }

    return "weakMap are not supported.\nweakMap found at: ".concat(path.join(""));
  };

  var createForbiddenFunctionMessage = function createForbiddenFunctionMessage(_ref6) {
    var path = _ref6.path;

    if (path.length === 0) {
      return "function are not allowed.";
    }

    return "function are not allowed.\nfunction found at: ".concat(path.join(""));
  };

  var createForbiddenPropertyGetterMessage = function createForbiddenPropertyGetterMessage(_ref7) {
    var path = _ref7.path,
        propertyNameOrSymbol = _ref7.propertyNameOrSymbol;
    return "property getter are not allowed.\ngetter found on property: ".concat(String(propertyNameOrSymbol), "\nat: ").concat(path.join(""));
  };

  var createForbiddenPropertySetterMessage = function createForbiddenPropertySetterMessage(_ref8) {
    var path = _ref8.path,
        propertyNameOrSymbol = _ref8.propertyNameOrSymbol;
    return "property setter are not allowed.\nsetter found on property: ".concat(String(propertyNameOrSymbol), "\nat: ").concat(path.join(""));
  };

  var createUnexpectedValueOfReturnValueMessage = function createUnexpectedValueOfReturnValueMessage() {
    return "valueOf() must return a primitive of the object itself.";
  };

  var createUnknownSymbolMessage = function createUnknownSymbolMessage(_ref9) {
    var symbol = _ref9.symbol;
    return "symbol must be global, like Symbol.iterator, or created using Symbol.for().\nsymbol: ".concat(symbol.toString());
  };

  var createUnknownPrototypeMessage = function createUnknownPrototypeMessage(_ref10) {
    var prototypeValue = _ref10.prototypeValue;
    return "prototype must be global, like Object.prototype, or somewhere in the value.\nprototype constructor name: ".concat(prototypeValue.constructor.name);
  };

  // be carefull because this function is mutating recipe objects inside the recipeArray.
  // this is not an issue because each recipe object is not accessible from the outside
  // when used internally by uneval
  var sortRecipe = function sortRecipe(recipeArray) {
    var findInRecipePrototypeChain = function findInRecipePrototypeChain(recipe, callback) {
      var currentRecipe = recipe; // eslint-disable-next-line no-constant-condition

      while (true) {
        if (currentRecipe.type !== "composite") {
          break;
        }

        var prototypeIdentifier = currentRecipe.prototypeIdentifier;

        if (prototypeIdentifier === undefined) {
          break;
        }

        currentRecipe = recipeArray[prototypeIdentifier];

        if (callback(currentRecipe, prototypeIdentifier)) {
          return prototypeIdentifier;
        }
      }

      return undefined;
    };

    var recipeArrayOrdered = recipeArray.slice();
    recipeArrayOrdered.sort(function (leftRecipe, rightRecipe) {
      var leftType = leftRecipe.type;
      var rightType = rightRecipe.type;

      if (leftType === "composite" && rightType === "composite") {
        var rightRecipeIsInLeftRecipePrototypeChain = findInRecipePrototypeChain(leftRecipe, function (recipeCandidate) {
          return recipeCandidate === rightRecipe;
        }); // if left recipe requires right recipe, left must be after right

        if (rightRecipeIsInLeftRecipePrototypeChain) {
          return 1;
        }

        var leftRecipeIsInRightRecipePrototypeChain = findInRecipePrototypeChain(rightRecipe, function (recipeCandidate) {
          return recipeCandidate === leftRecipe;
        }); // if right recipe requires left recipe, right must be after left

        if (leftRecipeIsInRightRecipePrototypeChain) {
          return -1;
        }
      }

      if (leftType !== rightType) {
        // if left is a composite, left must be after right
        if (leftType === "composite") {
          return 1;
        } // if right is a composite, right must be after left


        if (rightType === "composite") {
          return -1;
        }
      }

      var leftIndex = recipeArray.indexOf(leftRecipe);
      var rightIndex = recipeArray.indexOf(rightRecipe); // left was before right, don't change that

      if (leftIndex < rightIndex) {
        return -1;
      } // right was after left, don't change that


      return 1;
    });
    return recipeArrayOrdered;
  };

  // https://github.com/joliss/js-string-escape/blob/master/index.js
  // http://javascript.crockford.com/remedial.html
  var escapeString = function escapeString(value) {
    var string = String(value);
    var i = 0;
    var j = string.length;
    var escapedString = "";

    while (i < j) {
      var char = string[i];
      var escapedChar = void 0;

      if (char === '"' || char === "'" || char === "\\") {
        escapedChar = "\\".concat(char);
      } else if (char === "\n") {
        escapedChar = "\\n";
      } else if (char === "\r") {
        escapedChar = "\\r";
      } else if (char === "\u2028") {
        escapedChar = "\\u2028";
      } else if (char === "\u2029") {
        escapedChar = "\\u2029";
      } else {
        escapedChar = char;
      }

      escapedString += escapedChar;
      i++;
    }

    return escapedString;
  };

  var uneval = function uneval(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$functionAllowed = _ref.functionAllowed,
        functionAllowed = _ref$functionAllowed === void 0 ? false : _ref$functionAllowed,
        _ref$prototypeStrict = _ref.prototypeStrict,
        prototypeStrict = _ref$prototypeStrict === void 0 ? false : _ref$prototypeStrict,
        _ref$ignoreSymbols = _ref.ignoreSymbols,
        ignoreSymbols = _ref$ignoreSymbols === void 0 ? false : _ref$ignoreSymbols;

    var _decompose = decompose(value, {
      functionAllowed: functionAllowed,
      prototypeStrict: prototypeStrict,
      ignoreSymbols: ignoreSymbols
    }),
        recipeArray = _decompose.recipeArray,
        mainIdentifier = _decompose.mainIdentifier,
        valueMap = _decompose.valueMap;

    var recipeArraySorted = sortRecipe(recipeArray);
    var source = "(function () {\nvar globalObject\ntry {\n  globalObject = Function('return this')() || (42, eval)('this');\n} catch(e) {\n  globalObject = window;\n}\n\nfunction safeDefineProperty(object, propertyNameOrSymbol, descriptor) {\n  var currentDescriptor = Object.getOwnPropertyDescriptor(object, propertyNameOrSymbol);\n  if (currentDescriptor && !currentDescriptor.configurable) return\n  Object.defineProperty(object, propertyNameOrSymbol, descriptor)\n};\n";
    var variableNameMap = {};
    recipeArray.forEach(function (recipe, index) {
      var indexSorted = recipeArraySorted.indexOf(recipe);
      variableNameMap[index] = "_".concat(indexSorted);
    });

    var identifierToVariableName = function identifierToVariableName(identifier) {
      return variableNameMap[identifier];
    };

    var recipeToSetupSource = function recipeToSetupSource(recipe) {
      if (recipe.type === "primitive") return primitiveRecipeToSetupSource(recipe);
      if (recipe.type === "global-symbol") return globalSymbolRecipeToSetupSource(recipe);
      if (recipe.type === "global-reference") return globalReferenceRecipeToSetupSource(recipe);
      return compositeRecipeToSetupSource(recipe);
    };

    var primitiveRecipeToSetupSource = function primitiveRecipeToSetupSource(_ref2) {
      var value = _ref2.value;

      var type = _typeof(value);

      if (type === "string") {
        return "\"".concat(escapeString(value), "\";");
      }

      if (type === "bigint") {
        return "".concat(value.toString(), "n");
      }

      if (Object.is(value, -0)) {
        return "-0;";
      }

      return "".concat(String(value), ";");
    };

    var globalSymbolRecipeToSetupSource = function globalSymbolRecipeToSetupSource(recipe) {
      return "Symbol.for(\"".concat(escapeString(recipe.key), "\");");
    };

    var globalReferenceRecipeToSetupSource = function globalReferenceRecipeToSetupSource(recipe) {
      var pathSource = recipe.path.map(function (part) {
        return "[\"".concat(escapeString(part), "\"]");
      }).join("");
      return "globalObject".concat(pathSource, ";");
    };

    var compositeRecipeToSetupSource = function compositeRecipeToSetupSource(_ref3) {
      var prototypeIdentifier = _ref3.prototypeIdentifier,
          valueOfIdentifier = _ref3.valueOfIdentifier;

      if (prototypeIdentifier === undefined) {
        return identifierToVariableName(valueOfIdentifier);
      }

      var prototypeValue = valueMap[prototypeIdentifier];

      if (prototypeValue === null) {
        return "Object.create(null);";
      }

      var prototypeConstructor = prototypeValue.constructor;

      if (prototypeConstructor === Object) {
        return "Object.create(".concat(identifierToVariableName(prototypeIdentifier), ");");
      }

      if (valueOfIdentifier === undefined) {
        return "new ".concat(prototypeConstructor.name, "();");
      }

      if (prototypeConstructor.name === "BigInt") {
        return "Object(".concat(identifierToVariableName(valueOfIdentifier), ")");
      }

      return "new ".concat(prototypeConstructor.name, "(").concat(identifierToVariableName(valueOfIdentifier), ");");
    };

    recipeArraySorted.forEach(function (recipe) {
      var recipeVariableName = identifierToVariableName(recipeArray.indexOf(recipe));
      source += "var ".concat(recipeVariableName, " = ").concat(recipeToSetupSource(recipe), "\n");
    });

    var recipeToMutateSource = function recipeToMutateSource(recipe, recipeVariableName) {
      if (recipe.type === "composite") {
        return compositeRecipeToMutateSource(recipe, recipeVariableName);
      }

      return "";
    };

    var compositeRecipeToMutateSource = function compositeRecipeToMutateSource(_ref4, recipeVariableName) {
      var propertyDescriptionArray = _ref4.propertyDescriptionArray,
          symbolDescriptionArray = _ref4.symbolDescriptionArray,
          methodDescriptionArray = _ref4.methodDescriptionArray,
          extensible = _ref4.extensible;
      var mutateSource = "";
      propertyDescriptionArray.forEach(function (_ref5) {
        var propertyNameIdentifier = _ref5.propertyNameIdentifier,
            propertyDescription = _ref5.propertyDescription;
        mutateSource += generateDefinePropertySource(recipeVariableName, propertyNameIdentifier, propertyDescription);
      });
      symbolDescriptionArray.forEach(function (_ref6) {
        var symbolIdentifier = _ref6.symbolIdentifier,
            propertyDescription = _ref6.propertyDescription;
        mutateSource += generateDefinePropertySource(recipeVariableName, symbolIdentifier, propertyDescription);
      });
      methodDescriptionArray.forEach(function (_ref7) {
        var methodNameIdentifier = _ref7.methodNameIdentifier,
            callArray = _ref7.callArray;
        mutateSource += generateMethodCallSource(recipeVariableName, methodNameIdentifier, callArray);
      });

      if (!extensible) {
        mutateSource += generatePreventExtensionSource(recipeVariableName);
      }

      return mutateSource;
    };

    var generateDefinePropertySource = function generateDefinePropertySource(recipeVariableName, propertyNameOrSymbolIdentifier, propertyDescription) {
      var propertyOrSymbolVariableName = identifierToVariableName(propertyNameOrSymbolIdentifier);
      var propertyDescriptorSource = generatePropertyDescriptorSource(propertyDescription);
      return "safeDefineProperty(".concat(recipeVariableName, ", ").concat(propertyOrSymbolVariableName, ", ").concat(propertyDescriptorSource, ");");
    };

    var generatePropertyDescriptorSource = function generatePropertyDescriptorSource(_ref8) {
      var configurable = _ref8.configurable,
          writable = _ref8.writable,
          enumerable = _ref8.enumerable,
          getIdentifier = _ref8.getIdentifier,
          setIdentifier = _ref8.setIdentifier,
          valueIdentifier = _ref8.valueIdentifier;

      if (valueIdentifier === undefined) {
        return "{\n  configurable: ".concat(configurable, ",\n  enumerable: ").concat(enumerable, ",\n  get: ").concat(getIdentifier === undefined ? undefined : identifierToVariableName(getIdentifier), ",\n  set: ").concat(setIdentifier === undefined ? undefined : identifierToVariableName(setIdentifier), ",\n}");
      }

      return "{\n  configurable: ".concat(configurable, ",\n  writable: ").concat(writable, ",\n  enumerable: ").concat(enumerable, ",\n  value: ").concat(valueIdentifier === undefined ? undefined : identifierToVariableName(valueIdentifier), "\n}");
    };

    var generateMethodCallSource = function generateMethodCallSource(recipeVariableName, methodNameIdentifier, callArray) {
      var methodCallSource = "";
      var methodVariableName = identifierToVariableName(methodNameIdentifier);
      callArray.forEach(function (argumentIdentifiers) {
        var argumentVariableNames = argumentIdentifiers.map(function (argumentIdentifier) {
          return identifierToVariableName(argumentIdentifier);
        });
        methodCallSource += "".concat(recipeVariableName, "[").concat(methodVariableName, "](").concat(argumentVariableNames.join(","), ");");
      });
      return methodCallSource;
    };

    var generatePreventExtensionSource = function generatePreventExtensionSource(recipeVariableName) {
      return "Object.preventExtensions(".concat(recipeVariableName, ");");
    };

    recipeArraySorted.forEach(function (recipe) {
      var recipeVariableName = identifierToVariableName(recipeArray.indexOf(recipe));
      source += "".concat(recipeToMutateSource(recipe, recipeVariableName));
    });
    source += "return ".concat(identifierToVariableName(mainIdentifier), "; })()");
    return source;
  };

  exports.uneval = uneval;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));

//# sourceMappingURL=main.js.map