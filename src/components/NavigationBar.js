import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getFirestore, getDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import companyLogo from '../images/Site Images/company_logo_2.png'

import '../styling/navigation-bar.css'

export default function NavigationBar(props) {
    const [testSwitch, setTestSwitch] = useState(false)
    const [anonSwitch, setAnonSwitch] = useState(false)
    const [cartCount, setCartCount] = useState([])
    const [currentUserInformation, setCurrentUserInformation] = useState({})

    const [totalPrice, setTotalPrice] = useState(0)

    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    useEffect(() => {
        if(currentUserInformation.isAnonymous === true) {
            setAnonSwitch(true)
        }

        handleCurrentUserLoggedIn()
        handleLoginCheck()
        
        if(currentUserInformation.uid !== undefined) {
            handleGetCartCount()
            // console.log('caught')
        }

        console.log(currentUserInformation.uid)
    }, [currentUserInformation, props])

    function handleLoginCheck() {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid
  
                setCurrentUserInformation(user)
                // console.log(uid)
            } else {
                console.log('No User Found!')
            }
        })
    }

    function handleCurrentUserLoggedIn() {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setTestSwitch(true)
        } else {
            setTestSwitch(false)
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

    function handleTotalPrice() {
        let price = 0

        for(let i = 0; i < cartCount.length; i++) {
            price += cartCount[i].information.price
        }

        setTotalPrice(price.toFixed(2))
        console.log(price.toFixed(2))
    }

  return (
    <nav className="navigation-bar-container">
        <div className="navigation-bar">
            <div className="navigation-bar-left">
                <Link to='/'><img className='navigation-bar-logo' src={companyLogo} alt="" /></Link>
            </div>
            <div className="navigation-bar-right">
                <ul className="navigation-links">
                    {/* <Link to='/'>Home</Link> */}
                    {testSwitch === false ? <Link to='/'>Sign-in</Link> : null}
                    {testSwitch === true ? <Link to='/account'>Account</Link> : null}
                    {/* <Link to='/sign-in'>Sign-in</Link> */}
                    {/* <Link to='/'>First</Link> */}
                </ul>
                <Link to='/check-out'>
                    <div className="shopping-cart-container">
                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                        <div className="cart-count-container">
                            <span>{props.count}</span>
                            {/* <span>{cartCount.length}</span> */}
                        </div>
                    </div>
                </Link>
                {/* <button onClick={() => handleTotalPrice()}>Test</button>
                <button onClick={() => console.log(totalPrice)}>Test 2</button> */}
            </div>
        </div>
    </nav>
  )
}
