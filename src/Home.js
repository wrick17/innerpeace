import html from "innerself";
import Link from './Link';

export default function Home(children) {

    return html`
        <h1>App</h1>
        ${Link('/about', 'Lets visit about')}
        ${children}
        ${Link('/about/dummy', 'check out the dummy page')}
        <div>footer</div>
        ${Link('/', 'good page')}
        ${Link('/bad_page', '404')}
    `;
}