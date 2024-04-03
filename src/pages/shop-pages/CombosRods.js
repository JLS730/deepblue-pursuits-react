import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { firebaseConfig } from '../../scripts/firebase'
import { initializeApp } from "firebase/app";

import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

import '../../styling/shop-styling/casting-rods.css'

import { products } from '../../products'

export default function CombosRods() {
    const [currentUserInformation, setCurrentUserInformation] = useState({})
    const [pageProducts, setPageProducts] = useState([])

    const date = new Date()

    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    useEffect(() => {
        handleLoginCheck()
        handlePageProducts('combo')
        console.log(products.rods)
    }, [])

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

    function handlePageProducts(rodType) {
        products.rods.forEach(rod => {
            if (rod.type == rodType) {
                setPageProducts(oldArray => [...oldArray, rod])
            }
        })
    }

    function test() {
        // console.log(date)
    }

    return (
        <div className="rods-container">
            <h2 className="rods-title">Combo Rods</h2>
            <div className="rods-sort-conatiner">
                <span className="sort-results-text">10 Results</span>
                <div className="sort-container">
                    <label className='sort-by-text' htmlFor="categories">Sort by:</label>
                    <select className='categories' name="categories" id="categories">
                        <option value="brands">Brands</option>
                        <option value="brands">Name</option>
                        <option value="price-low">Price(Low to High)</option>
                        <option value="price-high">Price(High to Low)</option>
                    </select>
                </div>
            </div>
            <div className="rods-results-container">
                {/* <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div>
                <div className="rods-results"></div> */}
                {pageProducts.map((rod, x) => {
                    return (
                        <div className="rods-results">
                            <Link to={`product/combo_${rod.id}`}><img src={rod.image} alt="" key={rod.id} /></Link>
                            <span className="rod-result-name">{rod.name}</span>
                            <span className="rod-result-price">${rod.price}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
