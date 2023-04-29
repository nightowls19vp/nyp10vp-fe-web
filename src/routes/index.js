
import routesConfig from '../config/routes.js';

import LoginPage from '../pages/Login.js';
import HomePage from '../pages/Home.js';
import PackagePage from '../pages/Package.js';
import StockPage from '../pages/Stock.js';
import ProfilePage from '../pages/Profile.js';

const publicRoutes = [
    { path: routesConfig.home, component: HomePage},
    { path: routesConfig.package, component: PackagePage},
];

const privateRoutes = [
    { path: routesConfig.stock, component: StockPage},
    { path: routesConfig.profile, component: ProfilePage},
];

const loginRoute = [
    { path: routesConfig.login, component: LoginPage},
]

export { publicRoutes, privateRoutes, loginRoute};