import html from "innerself";
import { connect } from "./store";

let redirectFlag = false;

function regexBuilder(route) {
    if (route === '/404') return '^\/404$';
    if (route === '/') return '^\/(?!404)';
    return (route.indexOf('/:') !== -1) ? `^${route.replace(/^\/:([a-z]+)\w/g, '\/[0-9a-zA-Z]+')}(\/.+|$)` : `^${route}(\/.+|$)`;
}

function loadRoute(routeObj, initialRoute) {
    if (!initialRoute.startsWith('/')) initialRoute = '/' + initialRoute;
    const pattern = new RegExp(regexBuilder(routeObj.route));
    
    if (pattern.test(initialRoute)) {
        
        let arg;
        if (routeObj.route.indexOf('/:') !== -1) {
            const match = (new RegExp(/^\/([0-9a-zA-Z]+)(?:\/)?/g)).exec(initialRoute);
            arg = match[1];
        }

        const pathname = initialRoute.substring(routeObj.route.length);
        const routesDOM = routeObj.children && routeObj.children.map(route => loadRoute(route, pathname)).filter(route => route);
        
        if ((pathname.length && !routeObj.children) || (pathname.length && routesDOM && !routesDOM.length)) redirectFlag = true;

        return html`
            ${routeObj.component({ arg, children: routesDOM} )}
        `;
    }
    return;
}

function Router(state, routes) {
    const { path } = state;
    redirectFlag = false;

    const routesDOM = routes.map(route => loadRoute(route, path)).filter(route => route);

    if (redirectFlag) {
        dispatch('REPLACE_PATH', '/404');
        return html`
            ${routes.filter(route => route.hasOwnProperty('notFound'))[0].component()}
        `;
    } 
    
    return html`
        ${ routesDOM }
    `;
}

export default connect(Router);