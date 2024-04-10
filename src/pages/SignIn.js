import React from 'react'
import { useRef, useState, useEffect } from 'react';

import '../styling/sign-in.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../scripts/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDocs, collection, getFirestore } from "firebase/firestore";

import NavigationBar from '../components/NavigationBar';

const SignIn = () => {
    const firebaseApp = initializeApp(firebaseConfig)
    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    const [currentUserInformation, setCurrentUserInformation] = useState({})
    const [cartCount, setCartCount] = useState([])

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const [passwordIncorrectToggle, setPasswordIncorrectToggle] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        handleCheckUser()

        if (currentUserInformation.uid !== undefined) {
            handleGetCartCount()
        }
    }, [userLoggedIn, currentUserInformation])

    function handleUserSignIn(email, password) {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            console.log('signed in')
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setPasswordIncorrectToggle(true)
            console.log('Hit')
        });
    }

    // function handleUserCheck() {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const uid = user.uid;
    //             const currentUser = user;

    //             if (!user.isAnonymous) {
    //                 navigate('/')
    //             }

    //             console.log(currentUser)
    //             console.log(uid)
    //         } else {
    //             // User is signed out
    //             // ...
    //         }
    //     });
    // }

    function handleSignOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    function handleCheckUser() {
        onAuthStateChanged(auth, (user) => {
            if (user.isAnonymous === false) {
                navigate('/')
                
            } else {
                const uid = user.uid;
                setCurrentUserInformation(user)
                console.log(user)

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
            < NavigationBar count={cartCount.length} />
            <div className="login-container">
                <div className="login-credentials-container">
                    <div className="login-credentials-intro-container">
                        <div className="login-credentials-user-container">
                            <i className="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <p className="login-credentials-intro-text">Have an account?</p>
                    </div>
                    <div className="login-credentials-input-container">
                        <input type="text" className="login-credentials-input-email" placeholder='Email Address' ref={emailInputRef} />
                        <input type="password" className="login-credentials-input-password" placeholder='Password' ref={passwordInputRef} />
                        <div className="login-credentials-help-container">
                            <div className="login-credentials-remember-me-container">
                                <input type="checkbox" id="remember-me" name="remember-me" value="Bike" />
                                <label for="remember-me">Remember Me</label>
                            </div>
                            <Link><p className="login-credentials-forgrot-password">Forgot Password?</p></Link>
                        </div>
                        {passwordIncorrectToggle === false ? null : <h2 className='login-credentials-incorrect-text'>Email and/or Password Incorrect</h2>}
                        <div className="login-credentials-sign-in-btn-container">
                            {/* <button className="login-credentials-sign-in-btn" onClick={() => handleUserCheck()}>Check</button>
                    <button className="login-credentials-sign-in-btn" onClick={() => handleSignOut()}>Logout</button> */}
                            <button className="login-credentials-sign-in-btn" onClick={() => {
                                handleUserSignIn(emailInputRef.current.value, passwordInputRef.current.value)

                                emailInputRef.current.value = ''
                                passwordInputRef.current.value = ''
                            }}>Sign-in</button>
                        </div>
                        <Link to={'/sign-up'} style={{ textDecoration: 'none' }}><p className="login-credentials-create-account">Create An Account?</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn