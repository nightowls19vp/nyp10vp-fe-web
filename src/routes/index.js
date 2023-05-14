
import routesConfig from '../config/routes.js';

import LoginPage from '../pages/Login.js';
import HomePage from '../pages/Home.js';
import PackagePage from '../pages/Package.js';
import StockPage from '../pages/Stock.js';
import ProfilePage from '../pages/Profile.js';
import ShoppingCartPage from '../pages/ShoppingCart.js';

const publicRoutes = [
    { path: routesConfig.home, component: HomePage},
    { path: routesConfig.package, component: PackagePage},
];

const privateRoutes = [
    { path: routesConfig.stock, component: StockPage},
    { path: routesConfig.profile, component: ProfilePage},
    { path: routesConfig.shopping, component: ShoppingCartPage},
];

const loginRoute = [
    { path: routesConfig.login, component: LoginPage},
]

export { publicRoutes, privateRoutes, loginRoute};