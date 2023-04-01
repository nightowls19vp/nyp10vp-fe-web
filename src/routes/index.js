import LoginPage from '../pages/Login.js'
import HomePage from '../pages/Home.js'

const publicRoutes = [
    { path: "/", component: HomePage},
];

const privateRoutes = [
    { path: "/login", component: LoginPage},
];

export { publicRoutes, privateRoutes};