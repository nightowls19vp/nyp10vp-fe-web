import LoginPage from '../pages/Login.js'
import HomePage from '../pages/Home.js'
import routesConfig from '../config/routes.js';

const publicRoutes = [
    { path: routesConfig.home, component: HomePage},
];

const privateRoutes = [
    { path: routesConfig.login, component: LoginPage},
];

export { publicRoutes, privateRoutes};