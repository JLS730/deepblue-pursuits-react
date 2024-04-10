import React from 'react'

import { useRef, useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom'

import '../styling/sign-up.css'

// import cityCruiseLogo from '../images/citycruise_logo.png'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../scripts/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged, signOut, EmailAuthProvider, linkWithCredential } from "firebase/auth";

import { doc, setDoc, getDocs, collection, getFirestore } from "firebase/firestore";

import NavigationBar from '../components/NavigationBar';

const SignUp = () => {
    const firebaseApp = initializeApp(firebaseConfig)
    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    const [currentUserInformation, setCurrentUserInformation] = useState({})
    const [cartCount, setCartCount] = useState([])

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const passwordConfirmInputRef = useRef(null)

    const [invalidPasswordToggle, setInvalidPasswordToggle] = useState(false)
    const [invalidEmailToggle, setInvalidEmailToggle] = useState(false)
    const [weakPasswordToggle, setWeakPasswordToggle] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        handleCurrentUserLoggedIn()
        handleCheckUser()

        if (currentUserInformation.uid !== undefined) {
            handleGetCartCount()
        }
    }, [currentUserInformation])

    function handleCurrentUserLoggedIn() {
        onAuthStateChanged(auth, (user) => {
            if (!user.isAnonymous) {
                navigate('/')
            } else {

            }
        });
    }

    function handleCreateUser(email, password) {
        // createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        //     // Signed up 
        //     const user = userCredential.user;

        //     // ...
        // }).catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..

        //     console.log(errorCode)
        //     console.log(errorMessage)

        //     if (errorCode === 'auth/invalid-email' || errorCode === 'auth/missing-email') {
        //         setInvalidEmailToggle(true)
        //         emailInputRef.current.value = ''
        //         console.log('Invalid Email')
        //     } else if (errorCode === 'auth/weak-password') {
        //         passwordInputRef.current.value = ''
        //         passwordConfirmInputRef.current.value = ''

        //         setWeakPasswordToggle(true)
        //     }
        // });

        const credential = EmailAuthProvider.credential(email, password);

        linkWithCredential(auth.currentUser, credential).then((usercred) => {
            const user = usercred.user;
            console.log("Anonymous account successfully upgraded", user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            console.log(errorCode)
            console.log(errorMessage)

            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/missing-email') {
                setInvalidEmailToggle(true)
                emailInputRef.current.value = ''
                console.log('Invalid Email')
            } else if (errorCode === 'auth/weak-password') {
                passwordInputRef.current.value = ''
                passwordConfirmInputRef.current.value = ''

                setWeakPasswordToggle(true)
            }
        });

        navigate('/')
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
            <div className="create-account-container">
                <div className="create-account-credentials-container">
                    <div className="create-account-credentials-intro-container">
                        <div className="create-account-credentials-user-container">
                            <i class="fa-solid fa-user fa-2xl"></i>
                            {/* <img src={cityCruiseLogo} alt="" /> */}
                        </div>
                        <p className="create-account-credentials-intro-text">Sign-up Today!</p>
                    </div>
                    <div className="create-account-credentials-input-container">
                        <input type="text" className="create-account-credentials-input-email" placeholder='Email Address' ref={emailInputRef} />
                        <input type="password" className="create-account-credentials-input-password" placeholder='Password' ref={passwordInputRef} />
                        <input type="password" className="create-account-credentials-input-password" placeholder='Confirm Password' ref={passwordConfirmInputRef} />
                        {/* <div className="create-account-credentials-help-container">
                    <div className="create-account-credentials-remember-me-container">
                        <input type="checkbox" id="remember-me" name="remember-me" value="Bike" />
                        <label for="remember-me">Remember Me</label>
                    </div>
                    <Link><p className="create-account-credentials-forgrot-password">Forgot Password?</p></Link>
                </div> */}
                        <div className="create-account-credentials-sign-in-btn-container">
                            {/* <button className="create-account-credentials-sign-in-btn" onClick={() => handleAnonymousLogin()}>Log In</button> */}
                            {/* <button className="create-account-credentials-sign-in-btn" onClick={() => handleAnonymousLoginCheck()}>Check</button> */}
                            {/* <button className="create-account-credentials-sign-in-btn" onClick={() => handleUserCheck()}>Log Out</button> */}
                            {invalidPasswordToggle === false ? null : <p>Passwords do not match!</p>}
                            {invalidEmailToggle === false ? null : <p>Email is Invalid!</p>}
                            {weakPasswordToggle === false ? null : <p>Password is Weak! Password should be at least 6 characters!</p>}
                            <button className="create-account-credentials-sign-in-btn" onClick={() => {
                                if (passwordInputRef.current.value !== passwordConfirmInputRef.current.value) {
                                    setInvalidPasswordToggle(true)
                                    setInvalidEmailToggle(false)
                                    setWeakPasswordToggle(false)

                                    passwordInputRef.current.value = ''
                                    passwordConfirmInputRef.current.value = ''

                                    console.log('no match')
                                    return
                                }

                                setInvalidPasswordToggle(false)
                                setInvalidEmailToggle(false)

                                handleCreateUser(emailInputRef.current.value, passwordInputRef.current.value)

                                setWeakPasswordToggle(false)

                                // emailInputRef.current.value = ''
                                passwordInputRef.current.value = ''
                                passwordConfirmInputRef.current.value = ''
                            }}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp