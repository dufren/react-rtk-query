import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './loginApiSlice'
import { getLoginData } from './loginSlice'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [validUsername, setValidUsername] = useState(false)

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)

    const [role, setRole] = useState("")

    const [login, {
        isLoading,
        isSuccess,
        error
    }] = useLoginMutation()

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            dispatch(getLoginData({ username, password, role }))
            setUsername("")
            setPassword("")
            if (role === "customer") {
                navigate("/store")
            } else {
                navigate("/admin")
            }
        }
    }, [isSuccess, navigate, dispatch, username, password, role])

    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const onCustomerClicked = () => {
        setRole("customer")
    }

    const onAdminClicked = () => {
        setRole("admin")
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault()
        if (canLogin) {
            await login({ username, password, role })
        }
    }


    const canLogin = [validUsername, validPassword, role.length].every(Boolean) && !isLoading

    const roleCheckCustomer = role === "customer" ? "bg-gray-600" : "bg-gray-400"
    const roleCheckAdmin = role === "admin" ? "bg-gray-600" : "bg-gray-400"

    const validateUsername = (!validUsername && username.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"
    const validatePassword = (!validPassword && password.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"

    const buttonCanLogin = canLogin ? "hover:bg-blue-600" : "opacity-50"

    const content = (
        <div className='bg-gray-200 h-screen w-full '>
            <p>{error?.data?.message}</p>
            <div className='h-full flex justify-center items-center'>
                <form className=' bg-white max-w-[400px] w-full mx-auto p-8' onSubmit={onSubmitHandle}>

                    <h1 className=" text-center text-4xl font-bold py-6">Login</h1>

                    <div className='flex justify-between p-4 mb-3'>
                        <button
                            onClick={onCustomerClicked}
                            type="button"
                            className={`${roleCheckCustomer} w-32 p-2 rounded text-white font-medium outline-none`}>
                            Customer
                        </button>

                        <button
                            onClick={onAdminClicked}
                            type="button"
                            className={`${roleCheckAdmin} w-32 p-2 rounded text-white font-medium outline-none`}>
                            Admin
                        </button>
                    </div>

                    <div className='flex flex-col py-2 font-medium'>
                        <label className='text-sm font-medium' htmlFor="username">Username</label>
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

                    <div className='flex flex-col py-2 font-medium'>
                        <label className='text-sm font-medium' htmlFor="password">Password</label>
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
                        className={`w-full text-white bg-blue-500 p-2 mt-4 hover:bg-blue-600 rounded font-medium ${buttonCanLogin}`}>Sign in</button>
                </form>
            </div>
        </div>
    )
    return content
}

export default Login