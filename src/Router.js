import html from "innerself";
import { connect } from "./store";

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

        return html`
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
        return html`
            ${routes.filter(route => route.hasOwnProperty('notFound'))[0].component()}
        `;
    } 
    
    return html`
        ${ routesDOM }
    `;
}

export default connect(Router);