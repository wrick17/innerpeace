import html from "innerself";
import Link from './Link';

export default function Home(children) {

    return html`
        <div>Oops! the page you were searching for was not found!</div>
        ${Link('/', 'Go home')}
    `;
}