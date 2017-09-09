/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = html;
/* harmony export (immutable) */ __webpack_exports__["createStore"] = createStore;
function html([first, ...strings], ...values) {
    // Weave the literal strings and the interpolations.
    // We don't have to explicitly handle array-typed values
    // because concat will spread them flat for us.
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    ).join("");
}

function createStore(reducer) {
    let state = reducer();
    const roots = new Map();
    const prevs = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();

            // Poor man's Virtual DOM implementation :)  Compare the new output
            // with the last output for this root.  Don't trust the current
            // value of root.innerHTML as it may have been changed by other
            // scripts or extensions.
            if (output !== prevs.get(root)) {
                prevs.set(root, output);
                root.innerHTML = output;
            }
        }
    };

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(component) {
            // Return a decorated component function.
            return (...args) => component(state, ...args);
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = exports.attach = undefined;

var _innerself = __webpack_require__(0);

var _logger = __webpack_require__(4);

var _logger2 = _interopRequireDefault(_logger);

var _reducer = __webpack_require__(5);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createStore = (0, _innerself.createStore)((0, _logger2.default)(_reducer2.default)),
    attach = _createStore.attach,
    connect = _createStore.connect,
    dispatch = _createStore.dispatch;

window.dispatch = dispatch;

exports.attach = attach;
exports.connect = connect;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n        <a href=\"", "\" onclick=\"event.preventDefault(); if (location.pathname !== '", "') dispatch('CHANGE_PATH', '", "')\">", "</a>\n    "], ["\n        <a href=\"", "\" onclick=\"event.preventDefault(); if (location.pathname !== '", "') dispatch('CHANGE_PATH', '", "')\">", "</a>\n    "]);

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

var _store = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Link(state, path, children) {
    return (0, _innerself2.default)(_templateObject, path, path, path, children);
}

exports.default = (0, _store.connect)(Link);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(1);

var _App = __webpack_require__(7);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _store.attach)(_App2.default, document.querySelector("#root"));

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = logger;
function logger(reducer) {
    return function(prev_state, action, args) {
        console.group(action);
        console.log("Previous State", prev_state);
        console.log("Action Arguments", args);
        const next_state = reducer(prev_state, action, args);
        console.log("Next State", next_state);
        console.groupEnd();
        return next_state;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = reducer;

var _sanitize = __webpack_require__(6);

var _sanitize2 = _interopRequireDefault(_sanitize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathname = location.pathname;
var init = {
    path: pathname
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];
    var args = arguments[2];

    switch (action) {
        case "CHANGE_PATH":
            {
                var _args = _slicedToArray(args, 1),
                    path = _args[0];

                history.pushState(null, null, path);
                return Object.assign({}, state, {
                    path: path
                });
            }
        case "REPLACE_PATH":
            {
                var _args2 = _slicedToArray(args, 1),
                    _path = _args2[0];

                history.replaceState(null, null, _path);
                return Object.assign({}, state, {
                    path: _path
                });
            }
        default:
            return state;
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = sanitize;
const TEMPLATE = document.createElement("template");
const ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

function sanitize(value) {
    // Parse the HTML to inert DOM.
    TEMPLATE.innerHTML = value;
    // Strip all markup.
    const text = TEMPLATE.content.textContent;
    // Any HTML entities present in the original value have been unescaped by
    // textContent.  Sanitize the syntax-sensitive characters back to entities.
    return text.replace(/[&<>"']/g, ch => ENTITIES[ch]);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n        ", "\n    "], ["\n        ", "\n    "]);

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

var _store = __webpack_require__(1);

var _Link = __webpack_require__(2);

var _Link2 = _interopRequireDefault(_Link);

var _Router = __webpack_require__(8);

var _Router2 = _interopRequireDefault(_Router);

var _Routes = __webpack_require__(9);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function App(state) {
    window.onpopstate = function () {
        if (state.path !== location.pathname) dispatch('CHANGE_PATH', location.pathname);
    };
    return (0, _innerself2.default)(_templateObject, (0, _Router2.default)(_Routes2.default));
}

exports.default = (0, _store.connect)(App);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n            ", "\n        "], ["\n            ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n        ", "\n    "], ["\n        ", "\n    "]);

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

var _store = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var redirectFlag = false;

function regexBuilder(route) {
    if (route === '/404') return '^\/404$';
    if (route === '/') return '^\/(?!404)';
    return route.indexOf('/:') !== -1 ? "^" + route.replace(/^\/:([a-z]+)\w/g, '\/[0-9a-zA-Z]+') + "(/.+|$)" : "^" + route + "(/.+|$)";
}

function loadRoute(routeObj, initialRoute) {
    if (!initialRoute.startsWith('/')) initialRoute = '/' + initialRoute;
    var pattern = new RegExp(regexBuilder(routeObj.route));

    if (pattern.test(initialRoute)) {

        var arg = void 0;
        if (routeObj.route.indexOf('/:') !== -1) {
            var match = new RegExp(/^\/([0-9a-zA-Z]+)(?:\/)?/g).exec(initialRoute);
            arg = match[1];
        }

        var pathname = initialRoute.substring(routeObj.route.length);
        var routesDOM = routeObj.children && routeObj.children.map(function (route) {
            return loadRoute(route, pathname);
        }).filter(function (route) {
            return route;
        });

        if (pathname.length && !routeObj.children || pathname.length && routesDOM && !routesDOM.length) redirectFlag = true;

        return (0, _innerself2.default)(_templateObject, routeObj.component({ arg: arg, children: routesDOM }));
    }
    return;
}

function Router(state, routes) {
    var path = state.path;

    redirectFlag = false;

    var routesDOM = routes.map(function (route) {
        return loadRoute(route, path);
    }).filter(function (route) {
        return route;
    });

    if (redirectFlag) {
        dispatch('REPLACE_PATH', '/404');
        return (0, _innerself2.default)(_templateObject, routes.filter(function (route) {
            return route.hasOwnProperty('notFound');
        })[0].component());
    }

    return (0, _innerself2.default)(_templateObject2, routesDOM);
}

exports.default = (0, _store.connect)(Router);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Home = __webpack_require__(10);

var _Home2 = _interopRequireDefault(_Home);

var _About = __webpack_require__(11);

var _About2 = _interopRequireDefault(_About);

var _Dummy = __webpack_require__(12);

var _Dummy2 = _interopRequireDefault(_Dummy);

var _NotFound = __webpack_require__(13);

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routeConfig = [{
    route: '/',
    component: _Home2.default,
    children: [{
        route: '/about',
        component: _About2.default,
        children: [{
            route: '/:dummy',
            component: _Dummy2.default
        }]
    }]
}, {
    route: '/404',
    notFound: true,
    component: _NotFound2.default
}];

exports.default = routeConfig;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n        <h1>App</h1>\n        ', '\n        ', '\n        ', '\n        ', '\n        <div>footer</div>\n        ', '\n        ', '\n    '], ['\n        <h1>App</h1>\n        ', '\n        ', '\n        ', '\n        ', '\n        <div>footer</div>\n        ', '\n        ', '\n    ']);

exports.default = Home;

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

var _Link = __webpack_require__(2);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Home(props) {

    return (0, _innerself2.default)(_templateObject, (0, _Link2.default)('/', 'Go home'), (0, _Link2.default)('/about', 'Lets visit about'), props.children, (0, _Link2.default)('/about/123123', 'check out the dummy page'), (0, _Link2.default)('/', 'good page'), (0, _Link2.default)('/bad_page', '404'));
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n        <div>about</div>\n        ", "\n    "], ["\n        <div>about</div>\n        ", "\n    "]);

exports.default = About;

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function About(props) {
    return (0, _innerself2.default)(_templateObject, props.children);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n        <div>Dummy has argument of ", "</div>\n    "], ["\n        <div>Dummy has argument of ", "</div>\n    "]);

exports.default = Dummy;

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Dummy(props) {
    return (0, _innerself2.default)(_templateObject, props.arg);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n        <div>Oops! the page you were searching for was not found!</div>\n        ', '\n    '], ['\n        <div>Oops! the page you were searching for was not found!</div>\n        ', '\n    ']);

exports.default = NotFound;

var _innerself = __webpack_require__(0);

var _innerself2 = _interopRequireDefault(_innerself);

var _Link = __webpack_require__(2);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function NotFound() {

    return (0, _innerself2.default)(_templateObject, (0, _Link2.default)('/', 'Go home'));
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map