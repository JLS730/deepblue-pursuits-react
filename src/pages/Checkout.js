import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getFirestore, getDoc, getDocs, deleteDoc, collection, setDoc } from "firebase/firestore";
import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import '../styling/checkout.css'

import PayPal from '../components/PayPal';

import { products } from '../products'

function Checkout() {
  const [checkout, setCheckout] = useState(false)
  const [cartCount, setCartCount] = useState([])
  const [currentUserInformation, setCurrentUserInformation] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  
  const auth = getAuth()

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app)

  const navigate = useNavigate()

  useEffect(() => {
    if(cartCount.length !== 0) {
      handleTotalPrice()
      console.log('working')
      return
    }

    handleLoginCheck()

    if(currentUserInformation.uid !== undefined) {
      handleGetCartCount()
      console.log('caught')
    }

    console.log(cartCount.length)
  }, [currentUserInformation, cartCount.length])

  function handleLoginCheck() {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            const uid = user.uid

            setCurrentUserInformation(user)
            console.log(uid)
        } else {
            console.log('No User Found!')
        }
    })
  }

  async function handleGetCartCount() {
    const querySnapshot = await getDocs(collection(firestoreDB, currentUserInformation.uid, 'Cart', 'Items'));
    
    querySnapshot.forEach((doc) => {
      setCartCount((oldArray) => [...oldArray, doc.data()])
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(cartCount)
  }

  function handleTotalPrice() {
      let price = 0

      for(let i = 0; i < cartCount.length; i++) {
          price += cartCount[i].information.price
      }

      setTotalPrice(price.toFixed(2))
      console.log(totalPrice)
  }

  async function handleRemoveCartItem(name) {
    await deleteDoc(doc(firestoreDB, currentUserInformation.uid, 'Cart', 'Items', name))
    navigate(0)
  }

  // console.log(products.products)

  return (

    <div className="checkout-container">
      <div className="cart-items-container">
        <h2 className="cart-items-title">Checkout</h2>
        <div className="cart-items-container">
          {/* <div className="cart-items">
            <span className="quantity-text">Quantity: <span className="quantity-count-text">1</span></span>
            <span className="cart-item-name">PlaceHolder Item #1</span>
            <span className="cart-item-price">$99.99</span>
          </div>
          <div className="cart-items">
            <span className="quantity-text">Quantity: <span className="quantity-count-text">1</span></span>
            <span className="cart-item-name">PlaceHolder Item #1</span>
            <span className="cart-item-price">$99.99</span>
          </div>
          <div className="cart-items">
            <span className="quantity-text">Quantity: <span className="quantity-count-text">1</span></span>
            <span className="cart-item-name">PlaceHolder Item #1</span>
            <span className="cart-item-price">$99.99</span>
          </div> */}
          {cartCount.length === 0 ? null : cartCount.map((item, x) => {
            console.log(item)

            return (
              <div className="cart-items">
                <div className="quantity-container">
                  <span className="quantity-text">Quantity: <span className="quantity-count-text">1</span></span>
                  <i className="fa-solid fa-trash" onClick={() => handleRemoveCartItem(item.information.name)}></i>
                </div>
                <span className="cart-item-name">{item.information.name}</span>
                <span className="cart-item-price">{item.information.price}</span>
              </div>
            )
          })}
        </div>
        <div className="total-price-container">
          <span className="total-price-text">Total:</span>
          <span>{totalPrice === undefined ? null : totalPrice}</span>
        </div>
      </div>
      <div className="paypal-container">
        {checkout ? <PayPal /> : <button onClick={() => setCheckout(true)}>Checkout</button>}
        {/* <button onClick={() => handleCartItems()}>Test</button> */}
        <button onClick={() => console.log(cartCount)}>Test 2</button>
      </div>
    </div>
  );
}

export default Checkout;