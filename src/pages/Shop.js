import React, { useState } from 'react'

import '../styling/shop.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import castingNavImage from '../images/Rod Shop Navigation Images/casting-rod.jpg'
import spinningNavImage from '../images/Rod Shop Navigation Images/spinning-rod.jpg'
import saltwaterNavImage from '../images/Rod Shop Navigation Images/saltwater-rod.jpg'
import comboNavImage from '../images/Rod Shop Navigation Images/combo-rod.png'

import CastingRods from './shop-pages/CastingRods'
import SpinningRods from './shop-pages/SpinningRods'
import SaltwaterRods from './shop-pages/SaltwaterRods'
import ComboRods from './shop-pages/CombosRods'

export default function Shop() {
    const [castingPageToggle, setCastingPageToggle] = useState(true)
    const [spinningPageToggle, setSpinningPageToggle] = useState(false)
    const [saltwaterPageToggle, setSaltwaterPageToggle] = useState(false)
    const [comboPageToggle, setComboPageToggle] = useState(false)

    function handleCastingPage() {
        setCastingPageToggle(true)

        setSpinningPageToggle(false)
        setSaltwaterPageToggle(false)
        setComboPageToggle(false)
    }
    
    function handleSpinningPage() {
        setSpinningPageToggle(true)
        
        setCastingPageToggle(false)
        setSaltwaterPageToggle(false)
        setComboPageToggle(false)
    }
    
    function handleSaltwaterPage() {
        setSaltwaterPageToggle(true)
        
        setSpinningPageToggle(false)
        setCastingPageToggle(false)
        setComboPageToggle(false)
    }
    
    function handleCombosPage() {
        setComboPageToggle(true)
        
        setSaltwaterPageToggle(false)
        setSpinningPageToggle(false)
        setCastingPageToggle(false)
    }

  return (
    <div className='shop-container'>
      <div className="shop-navigation-container">
        <h2 className="shop-navigation-title">Rod Shop</h2>
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
                <img className='saltwater-nav-image' src={saltwaterNavImage} alt="" />
                <div className="nav-title-container">
                    <h2 className="nav-title">Saltwater Rods</h2>
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
            {saltwaterPageToggle ? <SaltwaterRods /> : null}
            {comboPageToggle ? <ComboRods /> : null}
      </div>
    </div>
  )
}
