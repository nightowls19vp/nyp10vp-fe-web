import LoginPage from '../pages/Login.js'
import HomePage from '../pages/Home.js'
import StockPage from '../pages/Stock.js'
import routesConfig from '../config/routes.js';

const publicRoutes = [
    { path: routesConfig.home, component: HomePage},
    { path: routesConfig.stock, component: StockPage},
];

const privateRoutes = [
    { path: routesConfig.login, component: LoginPage},
];

export { publicRoutes, privateRoutes};