import Cleave from "cleave.js/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router"
import { usePaymentMutation } from "./cartApiSlice"
import { paymentReset } from "./cartSlice"

const NAME_REGEX = /^[A-z]{3,20} [A-z]{3,20}$/
const CARD_REGEX = /^.{19,19}$/
const EXP_REGEX = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{4})\b/;
const CVV_REGEX = /^.{3,3}$/

const Payment = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [validName, setValidName] = useState(false)

  const [cardNumber, setCardNumber] = useState("")
  const [validCardNumber, setValidCardNumber] = useState(false)

  const [expirationDate, setExpirationDate] = useState("")
  const [validExpirationDate, setValidExpirationDate] = useState(false)

  const [cvv, setCvv] = useState("")
  const [validCvv, setValidCvv] = useState("")

  const cart = useSelector(store => store.cart.cart)
  const cartTotal = useSelector(store => store.cart.cartTotal)

  const [pay, {
    isLoading,
    isSuccess,
  }] = usePaymentMutation()

  const itemInCart = (cart.length > 0)
    ? cart.map(item => {
      return (
        <div key={item.id} className='flex justify-between mb-10 shadow-xl p-2'>
          <h2 className='text-2xl text-gray-500'>{item.title}</h2>
          <h2 className='text-2xl text-gray-500'>{item.price}</h2>
        </div>
      )
    })
    : <p className="text-2xl text-gray-500">Cart Empty</p>

  useEffect(() => {
    if (isSuccess) {
      dispatch(paymentReset())
      setName("")
      setCardNumber("")
      setExpirationDate("")
      setCvv("")
      sessionStorage.clear()
      navigate("/successful-payment")
    }
  }, [isSuccess, dispatch, navigate])

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(() => {
    setValidCardNumber(CARD_REGEX.test(cardNumber))
  }, [cardNumber])

  useEffect(() => {
    setValidExpirationDate(EXP_REGEX.test(expirationDate))
  }, [expirationDate])

  useEffect(() => {
    setValidCvv(CVV_REGEX.test(cvv))
  }, [cvv])

  let canSave = [validName, validCardNumber, validExpirationDate, validCvv].every(Boolean) && !isLoading && cart.length > 0

  const buttonCanSave = canSave ? "hover:bg-blue-600" : "opacity-50"
  const validateName = (!validName && name.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"
  const validateCardNumber = (!validCardNumber && cardNumber.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"
  const validateExpDate = (!validExpirationDate && expirationDate.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"
  const validateCvv = (!validCvv && cvv.length > 0) ? "border-pink-500 focus:ring-pink-500" : "focus:border-gray-600 focus:outline-none"

  const formSubmitHandle = async (e) => {
    e.preventDefault()
    if (canSave) {
      await pay({ name, cardNumber, expirationDate, cvv })
    }
  }

  return (
    <div className='p-10 gap-10 grid grid-cols-1 md:grid-cols-2 h-full bg-gray-300'>
      <div>
        <form onSubmit={formSubmitHandle}>
          <div className="p-10 rounded-md shadow-md bg-white">
            <h4 className="text-3xl text-gray-700 mb-10">Payment information</h4>
            <div className="mb-6">
              <label className="block mb-3 text-gray-600" htmlFor="">Name on card</label>
              <Cleave className={`border outline-none rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider bg-gray-100 ${validateName}`}
                name="cardHolderName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                options={{ blocks: [24], delimiter: '',}}
              />
            </div>
            <div className="mb-6">
              <div>
                <label className="block mb-3 text-gray-600" htmlFor="">Card number</label>
                <Cleave className={`border outline-none rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest bg-gray-100 ${validateCardNumber}`}
                  name='cardNumber'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  options={{ delimiter: '-', blocks: [4, 4, 4, 4], numericOnly: true }}
                />
              </div>
            </div>
            <div className="mb-6 flex flex-wrap -mx-3w-full">
              <div className="w-2/5">
                <label className="block mb-3 text-gray-600" htmlFor="">Expiration date</label>
                <div className="flex">
                  <Cleave
                    name="expireDate"
                    className={`border outline-none rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6 bg-gray-100 ${validateExpDate}`}
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    options={{
                      delimiter: '/',
                      blocks: [2, 2],
                      numericOnly: true,
                      date: true,
                      datePattern: ['d', 'm', 'Y']
                    }}
                  />
                </div>
              </div>
              <div className="w-1/4">
                <label className="block mb-3 text-gray-600" htmlFor="">CVC</label>
                <input
                  className={`border outline-none rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest bg-gray-100 ${validateCvv}`}
                  name="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3} />
              </div>
            </div>
            <div className="mb-6 text-right">
              <span className="text-right font-bold">{cartTotal} USD</span>
            </div>
            <div>
              <button
                disabled={!canSave}
                className={`w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold ${buttonCanSave}`}>
                Confirm payment
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <div className="p-10 rounded-md shadow-md bg-white">
          <h4 className="text-3xl text-gray-700 mb-10">Order Summary</h4>
          {itemInCart}
        </div>
      </div>
    </div>
  )
}

export default Payment