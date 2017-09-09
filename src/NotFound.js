import html from "innerself";
import Link from './Link';

export default function NotFound() {

    return html`
        <div>Oops! the page you were searching for was not found!</div>
        ${Link('/', 'Go home')}
    `;
}