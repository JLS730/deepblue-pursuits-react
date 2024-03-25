import React, { useEffect, useState } from 'react'

import '../styling/homepage.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, setDoc, getDocs, collection, getFirestore } from "firebase/firestore";

import { products } from '../products'

import NavigationBar from '../components/NavigationBar';

import homepageBannerImage from '../images/Site Images/man_fishing.jpg'
import tipImage01 from '../images/Site Images/tips-and-tricks-images/tips-and-tricks-1.jpg'
import tipImage02 from '../images/Site Images/tips-and-tricks-images/tips-and-tricks-2.jpg'
import tipImage03 from '../images/Site Images/tips-and-tricks-images/tips-and-tricks-3.jpg'
import bannerImage0 from '../images/Site Images/homepage-banner-images/banner-reel-image.png'
import bannerImage1 from '../images/Site Images/homepage-banner-images/banner-rod-image.png'
import saleImage0 from '../images/Site Images/sales-banner-images/sale-image-1.png'
import saleImage1 from '../images/Site Images/sales-banner-images/sale-image-2.jpg'

export default function Homepage() {
  const [currentUserInformation, setCurrentUserInformation] = useState({})
  const [cartCount, setCartCount] = useState([])

  const auth = getAuth();

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app)

  useEffect(() => {
    handleCheckUser()

    if (currentUserInformation.uid !== undefined) {
      handleGetCartCount()
    }

  }, [currentUserInformation])

  function handleSignOut() {
    signOut(auth).then(() => {
      // navigate('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  async function handleAnonymousLoggin() {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        handleCheckUser()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

  function handleCheckUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        setCurrentUserInformation(user)
        console.log(user)

      } else {

      }
    });
  }

  async function handleGetCartCount() {
    const querySnapshot = await getDocs(collection(firestoreDB, currentUserInformation.uid, 'Cart', 'Items'));

    querySnapshot.forEach((doc) => {
      setCartCount((oldArray) => [...oldArray, doc.data()])
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(cartCount)
  }

  return (
    <>
      <NavigationBar count={cartCount.length} />
      {/* <button onClick={() => handleAnonymousLoggin()}>Create Anon</button>
    <button onClick={() => handleCheckUser()}>Check</button>
    <button onClick={() => handleSignOut()}>Sign Out</button> */}
      <div className="homepage-banner-image-container">
        <div className="banner-catergories">
          <table>
            <tr>
              <th><i className="fa-solid fa-bars"></i> Popular Suggestions</th>
            </tr>
            <tr>
              <td>Fishing Rods</td>
            </tr>
            <tr>
              <td>Fishing Accessories</td>
            </tr>
            <tr>
              <td>Fishing Reels</td>
            </tr>
            <tr>
              <td>Rod & Reel Combos</td>
            </tr>
            <tr>
              <td>Swimbaits</td>
            </tr>
            <tr>
              <td>Species</td>
            </tr>
          </table>

        </div>
        <div className="banner-image-container">
          <div className="banner-image-tint"></div>
          <img src={homepageBannerImage} alt="" className="homepage-banner-image" />
        </div>
        <div className="banner-suggestion-container">
          <div className="suggestion-container-1">
            <img src={bannerImage0} alt="" />
            <div className="shop-suggestion-container">
              <h2 className="product-title">Brand Fishing Rod</h2>
              <button className="product-shop-button">Shop Now</button>
            </div>
          </div>
          <div className="suggestion-container-2">
            <img src={bannerImage1} alt="" />
            <div className="shop-suggestion-container">
              <h2 className="product-title">Brand Fishing Reel</h2>
              <button className="product-shop-button">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='homepage-container'>
        <div className="hot-items-container">
          <h2 className="hot-items-title">Top Products</h2>
          <div className="items-container">
            <div className="rods-results">
              <Link to={`/shop/product/casting_${products.rods[0].id}`}><img src={products.rods[0].image} alt="" key={products.rods[0].id} /></Link>
              <div className="results-info-container">
                <span className="rod-result-name">{products.rods[0].name}</span>
                <span className="rod-result-price">${products.rods[0].price}</span>
                <div className="result-button-container">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <button className="options-button">Select Options</button>
                </div>
              </div>
            </div>
            <div className="rods-results">
              <Link to={`/shop/product/casting_${products.rods[1].id}`}><img src={products.rods[1].image} alt="" key={products.rods[1].id} /></Link>
              <div className="results-info-container">
                <span className="rod-result-name">{products.rods[1].name}</span>
                <span className="rod-result-price">${products.rods[1].price}</span>
                <div className="result-button-container">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <button className="options-button">Select Options</button>
                </div>
              </div>
            </div>
            <div className="rods-results">
              <Link to={`/shop/product/casting_${products.rods[2].id}`}><img src={products.rods[2].image} alt="" key={products.rods[2].id} /></Link>
              <div className="results-info-container">
                <span className="rod-result-name">{products.rods[2].name}</span>
                <span className="rod-result-price">${products.rods[2].price}</span>
                <div className="result-button-container">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <button className="options-button">Select Options</button>
                </div>
              </div>
            </div>
            <div className="rods-results">
              <Link to={`/shop/product/casting_${products.rods[3].id}`}><img src={products.rods[3].image} alt="" key={products.rods[3].id} /></Link>
              <div className="results-info-container">
                <span className="rod-result-name">{products.rods[3].name}</span>
                <span className="rod-result-price">${products.rods[3].price}</span>
                <div className="result-button-container">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <button className="options-button">Select Options</button>
                </div>
              </div>
            </div>
          </div>
          <div className="shop-all-button-container">
            <Link to='/shop'><button className="shop-all-button">Shop Top Products</button></Link>
          </div>
        </div>
        <div className="homepage-sale-banner-container">
          <div className="sale-banner">
            <div className="sale-container-1">
              <div className="sales-text-container">
                <span className="sale-title">Flash Sale</span>
                <span className="sale-text">SAVE UP TO 30%</span>
                <button className="sale-button">More Information</button>
              </div>
              <img src={saleImage0} alt="" />
            </div>
            <div className="sale-container-2">
              <div className="image-tint"></div>
              <img src={saleImage1} alt="" />
            </div>
          </div>
        </div>
        <div className="tips-and-tricks-container">
          <h2 className="tips-and-tricks-title">Tips, Tricks & Inspiration</h2>
          <div className="tips-and-tricks">
            <div className="tips-and-tricks-containers">
              <div className="tips-and-tricks-image-container">
                <img src={tipImage03} alt="" className="tips-and-tricks-image" />
              </div>
              <h4 className="tips-and-tricks-text">Know Your Quarry</h4>
              <p className="tips-and-tricks-description">Before casting a line, research the habits and preferences of the fish species you're targeting. Understanding what they eat, when they're most active, and their preferred habitats can significantly increase your chances of a successful catch.</p>
            </div>
            <div className="tips-and-tricks-containers">
              <div className="tips-and-tricks-image-container">
                <img src={tipImage01} alt="" className="tips-and-tricks-image" />
              </div>
              <h4 className="tips-and-tricks-text">Match the Hatch</h4>
              <p className="tips-and-tricks-description">Use lures or bait that mimic the natural prey of the fish in your chosen fishing spot. Observing the insects, baitfish, or other food sources in the area can guide you in selecting the most effective bait or lure for the conditions.</p>
            </div>
            <div className="tips-and-tricks-containers">
              <div className="tips-and-tricks-image-container">
                <img src={tipImage02} alt="" className="tips-and-tricks-image" />
              </div>
              <h4 className="tips-and-tricks-text"> Patience and Persistence</h4>
              <p className="tips-and-tricks-description">Fishing often requires waiting quietly for long periods. Stay patient and keep trying different spots, techniques, and baits throughout the day. Fish behavior can change rapidly with weather, water temperature, and time of day, so adaptability is key.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
