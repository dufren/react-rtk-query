import { } from "react-router";
import Login from "./features/login/Login";
import Layout from "./components/Layout";

import { Routes, Route } from "react-router-dom"
import PackagesList from "./features/packages/PackagesList";
import Prefetch from "./features/login/Prefetch";
import Payment from "./features/cart/Payment";
import Success from "./features/cart/Success";
import RequireAuth from "./features/login/RequireAuth";

function App() {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route element={<Prefetch />}>
          <Route element={<Layout />}>
            <Route path="dash" element={<PackagesList />} />
            <Route path="cart" element={<Payment />} />
            <Route path="successful-payment" element={<Success />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
