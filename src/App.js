import html from "innerself";
import { connect } from "./store";
import Link from './Link';

import Router from './Router';
import Home from './Home';
import About from './About';
import Dummy from './Dummy';
import NotFound from './NotFound';

const routeConfig = [
    {
        route: '/',
        component: Home,
        children: [{
            route: '/about',
            component: About,
            children: [{
                route: '/dummy',
                component: Dummy
            }]
        }]
    },
    {
        route: '/404',
        notFound: true,
        component: NotFound
    }
];

function App(state) {
    window.onpopstate = function() {
        // console.log(state.path, location.pathname);
        if (state.path !== location.pathname) dispatch('CHANGE_PATH', location.pathname);
    } 
    return html`
        ${Router(routeConfig)}
    `;
}

export default connect(App);