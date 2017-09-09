import sanitize from "innerself/sanitize";

let pathname = location.pathname;
const init = {
    path: pathname
};

export default function reducer(state = init, action, args) {
    switch (action) {
        case "CHANGE_PATH": {
            const [path] = args;
            console.log(path, location.pathname)

            // if (path === location.pathname) return state;
            
            history.pushState(null, null, path);
            return Object.assign({}, state, {
                path: path
            });
        }
        default:
            return state;
    }
}
