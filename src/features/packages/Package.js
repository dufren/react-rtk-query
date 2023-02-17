import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetPackagesQuery } from "./packagesApiSlice";
import { addToCart } from "../cart/cartSlice";

const Package = ({ id }) => {
  const { item } = useGetPackagesQuery("packagesList", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(
    JSON.parse(sessionStorage.getItem(item.id)) || false
  );

  const addToCartHandle = () => {
    setIsSelected(!isSelected);
    dispatch(addToCart(item));
  };

  useEffect(() => {
    sessionStorage.setItem(item.id, JSON.stringify(isSelected));
  }, [isSelected, item.id]);

  const selectBorder = isSelected ? "border border-green-500" : "border";

  return (
    <div
      className={`bg-gray-100 mb-10 p-10 rounded-md shadow hover:shadow-2xl ${selectBorder}`}
      onClick={addToCartHandle}
    >
      <h1 className="text-gray-800 font-medium text-4xl">{item.title}</h1>
      <p className="text-gray-800 text-md mt-4">{item.text}</p>
      <h3 className="text-gray-800 text-2xl mt-6">{item.price}</h3>
    </div>
  );
};

export default Package;
