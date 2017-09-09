import html from "innerself";
import Link from './Link';

export default function Home(props) {

    return html`
        <h1>App</h1>
        ${Link('/', 'Go home')}
        ${Link('/about', 'Lets visit about')}
        ${props.children}
        ${Link('/about/123123', 'check out the dummy page')}
        <div>footer</div>
        ${Link('/', 'good page')}
        ${Link('/bad_page', '404')}
    `;
}