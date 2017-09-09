import html from "innerself";
import { connect } from "./store";
import Link from './Link';
import Router from './Router';

import routeConfig from './Routes';

function App(state) {
    window.onpopstate = function() {
        if (state.path !== location.pathname) dispatch('CHANGE_PATH', location.pathname);
    } 
    return html`
        ${Router(routeConfig)}
    `;
}

export default connect(App);