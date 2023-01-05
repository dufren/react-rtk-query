import { ROLES } from "./config/roles"
import Login from "./features/login/Login";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom"
import PackagesList from "./features/packages/PackagesList";
import Prefetch from "./features/login/Prefetch";
import Payment from "./features/cart/Payment";
import Success from "./features/cart/Success";
import RequireAuth from "./features/login/RequireAuth";
import AdminPanel from "./features/admin/AdminPanel"
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route element={<Prefetch />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
            <Route path="/store" element={<Layout />}>
              <Route index element={<PackagesList />} />
              <Route path="cart" element={<Payment />} />
              <Route path="successful-payment" element={<Success />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Sidebar />}>
              <Route index element={<AdminPanel />} />
            </Route>
          </Route>


        </Route>
      </Route>
    </Routes>
  );
}

export default App;
