import html from "innerself";
import { connect } from "./store";

function Link(state, path, children) {
    return html`
        <a href="${path}" onclick="event.preventDefault(); if (location.pathname !== '${path}') dispatch('CHANGE_PATH', '${path}')">${children}</a>
    `;
}

export default connect(Link);