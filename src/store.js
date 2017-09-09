import {createStore} from "innerself";
import withLogger from "innerself/logger";
import reducer from "./reducer"


const { attach, connect, dispatch } =
    createStore(withLogger(reducer));

window.dispatch = dispatch;

export { attach, connect };
