import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, loginRoute } from "./routes/index.js";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

      {privateRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

      {loginRoute.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
