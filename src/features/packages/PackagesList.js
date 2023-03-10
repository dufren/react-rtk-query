import { PulseLoader } from "react-spinners";
import { useGetPackagesQuery } from "./packagesApiSlice";
import Package from "./Package";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PackagesList = () => {
  const navigate = useNavigate();

  const cartTotal = useSelector((store) => store.cart.cartTotal);

  const {
    data: packages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPackagesQuery("packagesList", {});

  let content;

  if (isLoading) content = <PulseLoader size={50} color={"#FFF"} />;

  if (isError) {
    return (content = (
      <p className="text-6xl text-center mt-56">
        Error {error?.originalStatus}
      </p>
    ));
  }

  if (isSuccess) {
    const { ids } = packages;
    content = ids?.length && ids.map((id) => <Package key={id} id={id} />);
  }

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="text-center p-10 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {content}
      </div>
      <div className="flex justify-between items-center mx-10 p-5">
        <p className="text-6xl font-bold font">Cart Total: {cartTotal}</p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded font-medium w-44 text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PackagesList;
