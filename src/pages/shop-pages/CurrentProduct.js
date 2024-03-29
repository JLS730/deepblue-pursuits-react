import React, { useEffect, useState } from 'react'

import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from '../../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, getFirestore, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

import { products } from '../../products'
import { productsImages } from '../../productImages'
import companyPlaceholder from '../../images/Site Images/rod_company_placeholder.png'

import '../../styling/current-product.css'

import NavigationBar from '../../components/NavigationBar';

export default function CurrentProduct() {
  const { id } = useParams()

  const productType = id.split('_')[0]
  const productId = id.split('_')[1]

  const [currentProduct, setCurrentProduct] = useState([])
  const [currentProductImage, setCurrentProductImage] = useState([])
  const [currentUserInformation, setCurrentUserInformation] = useState({})
  const [itemAddedToggle, setItemAddedToggle] = useState(false)
  const [cartCount, setCartCount] = useState([])
  const [renderSwitch, setRenderSwitch] = useState(false)

  const [cartNumber, setCartNumber] = useState(0)

  let productImage = []

  const auth = getAuth()

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app)

  const navigate = useNavigate()

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    if (cartCount.length !== 0) {
      handleItemCheck()

      // console.log(month)
      return
    }

    handleLoginCheck()

    if (currentUserInformation.uid !== undefined) {
      handleGetCartCount()

      products.rods.forEach(item => {
        if (item.id == productId) {
          setCurrentProduct(item)
          setCurrentProductImage([item.image])
        }
      })
    }

    console.log(cartNumber)


  }, [currentUserInformation, cartCount, renderSwitch])

  function handleItemCheck() {
    setCartNumber(cartCount.length)

    cartCount.filter(item => {
      if (item.information.name === currentProduct.name) {
        setItemAddedToggle(true)
      }

      console.log(item)
      console.log('working')
      console.log('working')
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

  function handleUserCartCount() {
    setDoc(doc(firestoreDB, currentUserInformation.uid, 'Cart', 'Items', currentProduct.name), {
      information: {
        name: currentProduct.name,
        price: currentProduct.price,
        type: productType
      }
    });

    setItemAddedToggle(true)
  }

  function handleLoginCheck() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid

        setCurrentUserInformation(user)
        console.log(uid)
      } else {
        console.log('No User Found!')
      }
    })
  }

  async function handleGetUserInformation() {
    const docRef = doc(firestoreDB, currentUserInformation.uid, 'Cart', 'Items')
    const docSnap = await getDoc(docRef)

    if (docSnap.data()) {
      // firstNameRef.current.value = docSnap.data().first
      // lastNameRef.current.value = docSnap.data().last
      // phoneNumberRef.current.value = docSnap.data().phone
      // birthDateRef.current.value = docSnap.data().born
      // countryRef.current.value = docSnap.data().country
      // addressOneRef.current.value = docSnap.data().address1
      // addressTwoRef.current.value = docSnap.data().address2
      // cityRef.current.value = docSnap.data().city
      // stateRef.current.value = docSnap.data().state
      // zipCodeRef.current.value = docSnap.data().zip
      const snapDatat = Object.values(docSnap.data())

      console.log(snapDatat.length)
    }

    console.log(Object.values(docSnap.data()))
  }

  return (
    <>
      <NavigationBar count={cartNumber} />
      <div className="current-product-container">
        <div className="current-product">
          <h2 className="product-information-name">{currentProduct.name}</h2>
          <div className="product-image-container">
            <img src={currentProductImage} alt="" />
          </div>

          <div className="current-product-description-container">
            <h2 className="product-description-title">Product Details</h2>
            <img src={companyPlaceholder} alt="" className="product-logo" />
            <p className="product-description">{currentProduct.description}</p>
          </div>
        </div>
        <div className="product-information-container">
          <h2 className="product-information-name">{currentProduct.name}</h2>
          <h2 className="product-information-price">$ {currentProduct.price}</h2>
          <p className="product-information-savings">SAVE TODAY! Pay ${currentProduct.price - 20} with $20 in CLUB Points upon approval to use on today's order.Apply Today</p>
          <p className="product-information-order"> Order by 4pm E.T. for {months[month - 1]} {day} delivery </p>
          <div className="product-information-options-container">
            <label htmlFor="retrieve" className="retrieve-option">Retrieve</label>
            <select name="retrieve" id="retrieve-selection" className="retrieve-selection">
              <option value="">Please Choose...</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>

            <label htmlFor="length" className="length-option">Length</label>
            <select name="length" id="length-selection" className="length-selection">
              <option value="">Please Choose...</option>
              <option value="7">7'</option>
              <option value="7.4">7'4"</option>
            </select>

            <label htmlFor="power" className="power-option">Power</label>
            <select name="power" id="power-selection" className="power-selection">
              <option value="">Please Choose...</option>
              <option value="medium">Medium</option>
              <option value="medium heavy">Medium Heavy</option>
            </select>
          </div>
          <div className="product-add-to-cart-button-container">
            {itemAddedToggle === false ? <button className="product-add-to-cart-button" onClick={() => {
              handleUserCartCount()

              setTimeout(() => {
                setCartNumber(cartNumber + 1)
              }, 200);
            }}>Add To Cart</button> : null}
            {itemAddedToggle === true ? <button className="product-add-to-cart-button" disabled>Added</button> : null}
          </div>
        </div>
        {/* <button onClick={() => console.log(cartNumber)}>Test</button> */}
        {/* <button onClick={() => handleGetFavoritesInformation()}>Test</button> */}
      </div >
    </>
  )
}
