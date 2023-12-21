import React from 'react'

import '../styling/homepage.css'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { products } from '../products'

import homepageBannerImage from '../images/Site Images/man_fishing.jpg'
import tipImage00 from '../images/Site Images/homepage-tips-and-tricks/tips-and-tricks-1.jpg'

export default function Homepage() {
  return (
    <>
    <div className="homepage-banner-image-container">
      <img src={homepageBannerImage} alt="" className="homepage-banner-image" />
    </div>
    <div className='homepage-container'>   
      <div className="hot-items-container">
        <h2 className="hot-items-title">New Hot Items</h2>
        <div className="items-container">
          <div className="rods-results">
              <Link to={`shop/product/casting_${products.rods[0].id}`}><img src={products.rods[0].image} alt="" key={products.rods[0].id} /></Link>
              <span className="rod-result-name">{products.rods[0].name}</span>
              <span className="rod-result-price">${products.rods[0].price}</span>
          </div>
          <div className="rods-results">
              <Link to={`shop/product/casting_${products.rods[1].id}`}><img src={products.rods[1].image} alt="" key={products.rods[1].id} /></Link>
              <span className="rod-result-name">{products.rods[1].name}</span>
              <span className="rod-result-price">${products.rods[1].price}</span>
          </div>
          <div className="rods-results">
              <Link to={`shop/product/casting_${products.rods[2].id}`}><img src={products.rods[2].image} alt="" key={products.rods[2].id} /></Link>
              <span className="rod-result-name">{products.rods[2].name}</span>
              <span className="rod-result-price">${products.rods[2].price}</span>
          </div>
          <div className="rods-results">
              <Link to={`shop/product/casting_${products.rods[3].id}`}><img src={products.rods[3].image} alt="" key={products.rods[3].id} /></Link>
              <span className="rod-result-name">{products.rods[3].name}</span>
              <span className="rod-result-price">${products.rods[3].price}</span>
          </div>
        </div>
        <div className="shop-all-button-container">
          <Link to='/shop'><button className="shop-all-button">Shop All Rods</button></Link>
        </div>
      </div>
      <div className="tips-and-tricks-container">
        <h2 className="tips-and-tricks-title">Tips, Tricks & Inspiration</h2>
        <div className="tips-and-tricks">
          <div className="tips-and-tricks-containers">
            <div className="tips-and-tricks-image-container">
              <img src={tipImage00} alt="" className="tips-and-tricks-image" />
            </div>
            <h4 className="tips-and-tricks-text">Favorite Topwater Bass Fishing Lures the Pros Like</h4>
            <p className="tips-and-tricks-description">Primetime for topwater fishing is upon much of the bass fishing world. Who doesn't love watching the brutality of nature at its finest as a bass tears a new one into your favorite topwater plug?</p>
          </div>
          <div className="tips-and-tricks-containers">
            <div className="tips-and-tricks-image-container">
              <img src={tipImage00} alt="" className="tips-and-tricks-image" />
            </div>
            <h4 className="tips-and-tricks-text">Favorite Topwater Bass Fishing Lures the Pros Like</h4>
            <p className="tips-and-tricks-description">Primetime for topwater fishing is upon much of the bass fishing world. Who doesn't love watching the brutality of nature at its finest as a bass tears a new one into your favorite topwater plug?</p>
          </div>
          <div className="tips-and-tricks-containers">
            <div className="tips-and-tricks-image-container">
              <img src={tipImage00} alt="" className="tips-and-tricks-image" />
            </div>
            <h4 className="tips-and-tricks-text">Favorite Topwater Bass Fishing Lures the Pros Like</h4>
            <p className="tips-and-tricks-description">Primetime for topwater fishing is upon much of the bass fishing world. Who doesn't love watching the brutality of nature at its finest as a bass tears a new one into your favorite topwater plug?</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
