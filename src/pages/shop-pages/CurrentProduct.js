import React, { useEffect, useState } from 'react'

import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from '../../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, getFirestore, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

import { products } from '../../products'
import { productsImages } from '../../productImages'

import '../../styling/current-product.css'

export default function CurrentProduct() {
  const { id } = useParams()

  const productType = id.split('_')[0]
  const productId = id.split('_')[1]

  const [currentProduct, setCurrentProduct] = useState([])
  const [currentProductImage, setCurrentProductImage] = useState([])
  const [currentUserInformation, setCurrentUserInformation] = useState({})
  const [itemAddedToggle, setItemAddedToggle] = useState(false)
  const [cartCount, setCartCount] = useState([])

  let productImage = []

  const auth = getAuth()

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app)

  const navigate = useNavigate()

  useEffect(() => {
    if(cartCount.length !== 0) {
      handleItemCheck()
      return
    }

    handleLoginCheck()

    if(currentUserInformation.uid !== undefined) {
      handleGetCartCount()
      
      products.rods.forEach(item => {
        if(item.id == productId) {
          setCurrentProduct(item)
          setCurrentProductImage([item.image])
        }
      })
    }


    console.log(productType)

    
  }, [currentUserInformation, cartCount])

  function handleItemCheck() {
    cartCount.filter(item => {
      if(item.information.name === currentProduct.name) {
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

    setTimeout(() => {
      navigate(0)
    }, 200)
  }

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

  async function handleGetUserInformation() {
    const docRef = doc(firestoreDB, currentUserInformation.uid, 'Cart', 'Items')
    const docSnap = await getDoc(docRef)

    if(docSnap.data()) {
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
    <div className="current-product-container">
      <div className="current-product">
        <div className="product-image-container">
          <img src={currentProductImage} alt="" />
        </div>
        <div className="product-information-container">
          <h2 className="product-information-name">{currentProduct.name}</h2>
          <h2 className="product-information-price">$ {currentProduct.price}</h2>
          <div className="product-add-to-cart-button-container">
            {itemAddedToggle === false ? <button className="product-add-to-cart-button" onClick={() => handleUserCartCount()}>Add To Cart</button> : null}
            {itemAddedToggle === true ? <button className="product-add-to-cart-button" disabled>Added</button> : null}
          </div>
        </div>
      </div>
      <div className="current-product-description-container">
        <h2 className="product-description-title">Product Description</h2>
        <p className="product-description">{currentProduct.description}</p>
      </div>
      <button onClick={() => console.log(currentProduct)}>Test</button>
      {/* <button onClick={() => handleGetFavoritesInformation()}>Test</button> */}
    </div>
  )
}
