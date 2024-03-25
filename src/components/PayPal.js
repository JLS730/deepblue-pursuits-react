import React, { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getFirestore, getDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

// import products from '../products'

import '../styling/paypal.css'

export default function PayPal() {
    const [currentUserInformation, setCurrentUserInformation] = useState({})
    const [currentUserAddress, setCurrentUserAddress] = useState({})
    const [cartCount, setCartCount] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const paypal = useRef()

    const auth = getAuth()

    const app = initializeApp(firebaseConfig);
    const firestoreDB = getFirestore(app)

    const navigate = useNavigate()
    
    useEffect(() => {
        if(totalPrice !== 0) {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        payer: {
                            name: {
                                given_name: currentUserAddress.first,
                                // given_name: currentUserAddress.first,
                                surname: currentUserAddress.last
                            },
                            address: {
                                address_line_1: currentUserAddress.address1,
                                address_line_2: currentUserAddress.address2,
                                admin_area_2: currentUserAddress.city,
                                postal_code: currentUserAddress.zip,
                                country_code: 'US'
                            },
                        },
                        
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: totalPrice
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    navigate('/')
                    console.log(order)
                },
                onError: (err) => {
                    console.log(err)
                }
            }).render(paypal.current)

            console.log(Object.keys(currentUserAddress).length)
            return
        }

        if(Object.values(currentUserAddress).length !== 0) {
            handleTotalPrice()
            return
        }

        handleLoginCheck()

        // if(totalPrice > 0) {
        //     return
        // } 
        
        if(currentUserInformation.uid !== undefined) {
            handleGetUserInformation()
            handleGetCartCount()
            console.log('render')
        }

    }, [currentUserInformation, cartCount, totalPrice])

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
          console.log(totalPrice)
      }

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

    async function handleGetUserInformation() {
        const docRef = doc(firestoreDB, currentUserInformation.uid, 'Information')
        const docSnap = await getDoc(docRef)
    
        // if(docSnap.data()) {
        //   firstNameRef.current.value = docSnap.data().first
        //   lastNameRef.current.value = docSnap.data().last
        //   phoneNumberRef.current.value = docSnap.data().phone
        //   birthDateRef.current.value = docSnap.data().born
        //   countryRef.current.value = docSnap.data().country
        //   addressOneRef.current.value = docSnap.data().address1
        //   addressTwoRef.current.value = docSnap.data().address2
        //   cityRef.current.value = docSnap.data().city
        //   stateRef.current.value = docSnap.data().state
        //   zipCodeRef.current.value = docSnap.data().zip
    
        //   console.log('Tis Working')
        // }

        setCurrentUserAddress(docSnap.data())
    
        // console.log(Object.values(docSnap.data()))
    }

  return (
    <div>
        <div className='paypal-container' ref={paypal} style={{width: '330px'}}></div>
        {/* <button onClick={() => console.log(totalPrice)}>Test</button> */}
    </div>
  )
}
