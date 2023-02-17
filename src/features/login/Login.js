import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./loginApiSlice";
import { getLoginData } from "./loginSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getLoginData({ username, password }));
      setUsername("");
      setPassword("");
      navigate("/store");
    }
  }, [isSuccess, navigate, dispatch, username, password]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (canLogin) {
      await login({ username, password });
    }
  };

  const canLogin = [validUsername, validPassword].every(Boolean) && !isLoading;

  const validateUsername =
    !validUsername && username.length > 0
      ? "border-pink-500 focus:ring-pink-500"
      : "focus:border-gray-600 focus:outline-none";
  const validatePassword =
    !validPassword && password.length > 0
      ? "border-pink-500 focus:ring-pink-500"
      : "focus:border-gray-600 focus:outline-none";

  const buttonCanLogin = canLogin ? "hover:bg-blue-600" : "opacity-50";

  const content = (
    <div className="bg-gray-200 h-screen w-full ">
      <h1 className="text-5xl text-center mb-10">Welcome</h1>
      <p
        className="text-2xl text-center mb-44
      "
      >
        This is a simple trading website. You can login with any value. You can
        add products to your cart and make the payment.
      </p>
      <div className="flex justify-center items-center">
        <form
          className=" bg-white max-w-[400px] w-full mx-auto p-8"
          onSubmit={onSubmitHandle}
        >
          <h1 className=" text-center text-4xl font-bold py-4">ZGR</h1>

          <div className="flex flex-col py-2 font-medium">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              className={`border p-2 bg-gray-100 rounded outline-none ${validateUsername}`}
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={onUsernameChanged}
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col py-2 font-medium">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className={`border p-2 bg-gray-100 rounded outline-none ${validatePassword}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
              required
            />
          </div>
          <button
            disabled={!canLogin}
            className={`w-full text-white bg-blue-500 p-2 mt-4 hover:bg-blue-600 rounded font-medium ${buttonCanLogin}`}
          >
            {!isLoading ? "Login" : "Loading..."}
          </button>
        </form>
      </div>
    </div>
  );
  return content;
};

export default Login;
