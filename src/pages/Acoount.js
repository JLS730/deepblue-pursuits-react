import React from 'react'
import { useState, useEffect, useRef } from 'react'

import '../styling/account.css'

import NavigationBar from '../components/NavigationBar';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, getFirestore, getDocs, collection, getDoc, setDoc } from "firebase/firestore";

const Account = () => {
  const [currentUserInformation, setCurrentUserInformation] = useState({})
  const [cartCount, setCartCount] = useState([])

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const birthDateRef = useRef(null)
  const countryRef = useRef(null)
  const addressOneRef = useRef(null)
  const addressTwoRef = useRef(null)
  const cityRef = useRef(null)
  const stateRef = useRef(null)
  const zipCodeRef = useRef(null)

  const auth = getAuth()

  const app = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(app)


  const navigate = useNavigate();

  useEffect(() => {
    handleLoginCheck()

    if (currentUserInformation.uid !== undefined) {
      handleGetUserInformation()
      handleUserSubmittedInformation()
      handleGetCartCount()
    }
  }, [currentUserInformation])

  function handleSignOut() {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
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

  function handleUserSubmittedInformation() {
    setDoc(doc(firestoreDB, currentUserInformation.uid, 'Information'), {
      first: firstNameRef.current.value,
      last: lastNameRef.current.value,
      phone: phoneNumberRef.current.value,
      born: birthDateRef.current.value,
      country: countryRef.current.value,
      address1: addressOneRef.current.value,
      address2: addressTwoRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipCodeRef.current.value,
    });
  }

  async function handleGetUserInformation() {
    const docRef = doc(firestoreDB, currentUserInformation.uid, 'Information')
    const docSnap = await getDoc(docRef)

    if (docSnap.data()) {
      firstNameRef.current.value = docSnap.data().first
      lastNameRef.current.value = docSnap.data().last
      phoneNumberRef.current.value = docSnap.data().phone
      birthDateRef.current.value = docSnap.data().born
      countryRef.current.value = docSnap.data().country
      addressOneRef.current.value = docSnap.data().address1
      addressTwoRef.current.value = docSnap.data().address2
      cityRef.current.value = docSnap.data().city
      stateRef.current.value = docSnap.data().state
      zipCodeRef.current.value = docSnap.data().zip

      console.log('Tis Working')
    }

    console.log(docSnap.data())
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
      <section className="account-section">

        <div className="settings-page">
          <div className="settings-information-container">
            <h2 className="information-title-text">Information</h2>

            <div className="information-container">
              <div className="information-first-name-container">
                <p className="first-name-text">First Name</p>
                <input type="text" placeholder='First Name' className="first-name-input" ref={firstNameRef} />
              </div>
              <div className="information-last-name-container">
                <p className="last-name-text">Last Name</p>
                <input type="text" placeholder='Last Name' className="last-name-input" ref={lastNameRef} />
              </div>
              <div className="information-phone-container">
                <p className="phone-text">Phone Number</p>
                <input type="tel" placeholder='XXX-XXX-XXXX' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength="12" className="phone-input" ref={phoneNumberRef} required />
              </div>
              <div className="information-birthdate-container">
                <p className="birthdate-text">Birthdate</p>
                <input type="date" className="birthdate-input" ref={birthDateRef} />
              </div>
            </div>
          </div>

          <div className="settings-address-container">
            <h2 className="address-title-text">Address</h2>

            <div className="address-container">
              <div className="address-country-container">
                <p className="country-text">Country</p>
                <input type="text" placeholder='United States' className="country-input" ref={countryRef} />
              </div>
              <div className="address-line-1-container">
                <p className="address-line-1-text">Address line 1</p>
                <input type="text" placeholder='Street address, P.O Box' className="address-line-1-input" ref={addressOneRef} />
              </div>
              <div className="address-line-2-container">
                <p className="address-line-2-text">Address line 2</p>
                <input type="text" placeholder='Apt, suite, unit, building, floor, etc.' className="address-line-2-input" ref={addressTwoRef} />
              </div>
              <div className="city-container">
                <p className="city-text">City</p>
                <input type="text" placeholder='' className="city-input" ref={cityRef} />
              </div>
              <div className="state-container">
                <p className="state-text">State</p>
                <input type="text" placeholder='' className="state-input" ref={stateRef} />
              </div>
              <div className="zip-code-container">
                <p className="zip-code-text">ZIP Code</p>
                <input type="text" placeholder='' className="zip-code-input" pattern='[0-9]{3}' ref={zipCodeRef} required />
              </div>

            </div>
          </div>
          <button onClick={() => handleUserSubmittedInformation()}>Save Information</button>
          {/* <button onClick={() => handleGetUserInformation()}>Check User</button>
            <button onClick={() => {
              mondayRef.current.checked = true
            }}>Check Mark Test</button> */}
          <div>
            <button onClick={() => handleSignOut()}>Logout</button>
            <button onClick={() => handleGetUserInformation()}>Check Login</button>
            {/* <button onClick={() => handleLoginCheck()}>Check Login</button> */}
          </div>
        </div>
      </section>
    </>
  )

}

export default Account