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
/* harmony export (immutable) */ __webpack_exports__["b"] = html;
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_innerself_logger__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducer__ = __webpack_require__(5);





const { attach, connect, dispatch } =
    Object(__WEBPACK_IMPORTED_MODULE_0_innerself__["a" /* createStore */])(Object(__WEBPACK_IMPORTED_MODULE_1_innerself_logger__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__reducer__["a" /* default */]));

window.dispatch = dispatch;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(1);



function Link(state, path, children) {
    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        <a href="${path}" onclick="event.preventDefault(); if (location.pathname !== '${path}') dispatch('CHANGE_PATH', '${path}')">${children}</a>
    `;
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__store__["b" /* connect */])(Link));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(7);



Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* attach */])(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */], document.querySelector("#root"));


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = logger;
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself_sanitize__ = __webpack_require__(6);


let pathname = location.pathname;
const init = {
    path: pathname
};

function reducer(state = init, action, args) {
    switch (action) {
        case "CHANGE_PATH": {
            const [path] = args;
            console.log(path, location.pathname)

            // if (path === location.pathname) return state;
            
            history.pushState(null, null, path);
            return Object.assign({}, state, {
                path: path
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
/* unused harmony export default */
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Router__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Home__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__About__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Dummy__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__NotFound__ = __webpack_require__(12);










const routeConfig = [
    {
        route: '/',
        component: __WEBPACK_IMPORTED_MODULE_4__Home__["a" /* default */],
        children: [{
            route: '/about',
            component: __WEBPACK_IMPORTED_MODULE_5__About__["a" /* default */],
            children: [{
                route: '/dummy',
                component: __WEBPACK_IMPORTED_MODULE_6__Dummy__["a" /* default */]
            }]
        }]
    },
    {
        route: '/404',
        notFound: true,
        component: __WEBPACK_IMPORTED_MODULE_7__NotFound__["a" /* default */]
    }
];

function App(state) {
    window.onpopstate = function() {
        // console.log(state.path, location.pathname);
        if (state.path !== location.pathname) dispatch('CHANGE_PATH', location.pathname);
    } 
    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        ${Object(__WEBPACK_IMPORTED_MODULE_3__Router__["a" /* default */])(routeConfig)}
    `;
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__store__["b" /* connect */])(App));

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(1);



let redirectFlag = false;

function regexBuilder(route) {
    if (route === '/404') return '^\/404$';
    if (route === '/') return '^\/(?!404)';
    return `^${route}(\/.+|$)`;
}

function loadRoute(routeObj, initialRoute) {
    if (!initialRoute.startsWith('/')) initialRoute = '/' + initialRoute;
    const pattern = new RegExp(regexBuilder(routeObj.route));
    
    // console.log(initialRoute, pattern, pattern.test(initialRoute));
    if (pattern.test(initialRoute)) {

        const pathname = initialRoute.substring(routeObj.route.length);
        const routesDOM = routeObj.children && routeObj.children.map(route => loadRoute(route, pathname)).filter(route => route);
        
        if (pathname.length && routesDOM && !routesDOM.length) redirectFlag = true;

        return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
            ${routeObj.component( routesDOM )}
        `;
    }
    return;
}

function Router(state, routes) {
    const { path } = state;
    redirectFlag = false;

    const routesDOM = routes.map(route => loadRoute(route, path)).filter(route => route);

    if (redirectFlag) {
        dispatch('CHANGE_PATH', '/404');
        return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
            ${routes.filter(route => route.hasOwnProperty('notFound'))[0].component()}
        `;
    } 
    
    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        ${ routesDOM }
    `;
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__store__["b" /* connect */])(Router));

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Home;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link__ = __webpack_require__(2);



function Home(children) {

    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        <h1>App</h1>
        ${Object(__WEBPACK_IMPORTED_MODULE_1__Link__["a" /* default */])('/about', 'Lets visit about')}
        ${children}
        ${Object(__WEBPACK_IMPORTED_MODULE_1__Link__["a" /* default */])('/about/dummy', 'check out the dummy page')}
        <div>footer</div>
        ${Object(__WEBPACK_IMPORTED_MODULE_1__Link__["a" /* default */])('/', 'good page')}
        ${Object(__WEBPACK_IMPORTED_MODULE_1__Link__["a" /* default */])('/bad_page', '404')}
    `;
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = About;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);


function About(children) {
    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        <div>about</div>
        ${children}
    `;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Dummy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);


function Dummy() {
    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        <div>Dummy</div>
    `;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Home;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_innerself__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link__ = __webpack_require__(2);



function Home(children) {

    return __WEBPACK_IMPORTED_MODULE_0_innerself__["b" /* default */]`
        <div>Oops! the page you were searching for was not found!</div>
        ${Object(__WEBPACK_IMPORTED_MODULE_1__Link__["a" /* default */])('/', 'Go home')}
    `;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map