import html from "innerself";

export default function Dummy(props) {
    return html`
        <div>Dummy has argument of ${props.arg}</div>
    `;
}