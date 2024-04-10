import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth";
import { doc, getFirestore, getDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import companyLogo from '../images/Site Images/company_logo_2.png'

import '../styling/navigation-bar.css'

const SignOut = () => {
    const auth = getAuth();

    const navigate = useNavigate()

    useEffect(() => {
        handleAnonymousLoggin()
    }, [])

    async function handleAnonymousLoggin() {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }
    return (
        <div>SignOut</div>
    )
}

export default SignOut