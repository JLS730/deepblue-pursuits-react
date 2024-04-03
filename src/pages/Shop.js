import React, { useState, useEffect } from 'react'

import '../styling/shop.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, getFirestore, getDocs, collection, getDoc, setDoc } from "firebase/firestore";

import castingNavImage from '../images/Rod Shop Navigation Images/casting-rod.jpg'
import spinningNavImage from '../images/Rod Shop Navigation Images/spinning-rod.jpg'
import flyRodNavImage from '../images/Rod Shop Navigation Images/saltwater-rod.jpg'
import comboNavImage from '../images/Rod Shop Navigation Images/combo-rod.png'

import CastingRods from './shop-pages/CastingRods'
import SpinningRods from './shop-pages/SpinningRods'
import FlyRods from './shop-pages/FlyRods'
import ComboRods from './shop-pages/CombosRods'

import NavigationBar from '../components/NavigationBar'

export default function Shop() {
    const [castingPageToggle, setCastingPageToggle] = useState(true)
    const [spinningPageToggle, setSpinningPageToggle] = useState(false)
    const [flyRodPageToggle, setFlyRodPageToggle] = useState(false)
    const [comboPageToggle, setComboPageToggle] = useState(false)

    const [currentUserInformation, setCurrentUserInformation] = useState({})
    const [cartCount, setCartCount] = useState([])

    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    useEffect(() => {
        handleLoginCheck()

        if (currentUserInformation.uid !== undefined) {
            handleGetCartCount()
        }
    }, [currentUserInformation])

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

    async function handleGetCartCount() {
        const querySnapshot = await getDocs(collection(firestoreDB, currentUserInformation.uid, 'Cart', 'Items'));

        querySnapshot.forEach((doc) => {
            setCartCount((oldArray) => [...oldArray, doc.data()])
            // console.log(doc.id, " => ", doc.data());
        });
        console.log(cartCount)
    }

    function handleCastingPage() {
        setCastingPageToggle(true)

        setSpinningPageToggle(false)
        setFlyRodPageToggle(false)
        setComboPageToggle(false)
    }

    function handleSpinningPage() {
        setSpinningPageToggle(true)

        setCastingPageToggle(false)
        setFlyRodPageToggle(false)
        setComboPageToggle(false)
    }

    function handleSaltwaterPage() {
        setFlyRodPageToggle(true)

        setSpinningPageToggle(false)
        setCastingPageToggle(false)
        setComboPageToggle(false)
    }

    function handleCombosPage() {
        setComboPageToggle(true)

        setFlyRodPageToggle(false)
        setSpinningPageToggle(false)
        setCastingPageToggle(false)
    }

    return (
        <>
            <NavigationBar count={cartCount.length} />
            <div className='shop-container'>
                <div className="shop-navigation-container">
                    {/* <h2 className="shop-navigation-title">Rod Shop</h2> */}
                    <div className="shop-navigation">
                        <div className="shop-navigation-containers" onClick={() => handleCastingPage()}>
                            <img className='casting-nav-image' src={castingNavImage} alt="" />
                            <div className="nav-title-container">
                                <h2 className="nav-title">Casting Rods</h2>
                            </div>
                        </div>
                        <div className="shop-navigation-containers" onClick={() => handleSpinningPage()}>
                            <img className='spinning-nav-image' src={spinningNavImage} alt="" />
                            <div className="nav-title-container">
                                <h2 className="nav-title">Spinning Rods</h2>
                            </div>
                        </div>
                        <div className="shop-navigation-containers" onClick={() => handleSaltwaterPage()}>
                            <img className='saltwater-nav-image' src={flyRodNavImage} alt="" />
                            <div className="nav-title-container">
                                <h2 className="nav-title">Fly Rods</h2>
                            </div>
                        </div>
                        <div className="shop-navigation-containers" onClick={() => handleCombosPage()}>
                            <img className='combo-nav-image' src={comboNavImage} alt="" />
                            <div className="nav-title-container">
                                <h2 className="nav-title">Combo Rods</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products-container">
                    {castingPageToggle ? <CastingRods /> : null}
                    {spinningPageToggle ? <SpinningRods /> : null}
                    {flyRodPageToggle ? <FlyRods /> : null}
                    {comboPageToggle ? <ComboRods /> : null}
                </div>
            </div>
        </>
    )
}
