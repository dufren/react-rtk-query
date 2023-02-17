import { useEffect } from "react";
import { Outlet } from "react-router";
import { store } from "../../app/store";
import { packagesApiSlice } from "../packages/packagesApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      packagesApiSlice.util.prefetch("getPackages", "packagesList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
