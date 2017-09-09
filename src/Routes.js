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
                route: '/:dummy',
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

export default routeConfig;