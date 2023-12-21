import React from 'react'

import '../../styling/shop-styling/casting-rods.css'

export default function SaltwaterRods() {
  return (
    <div className="rods-container">
        <h2 className="rods-title">Saltwater Rods</h2>
        <div className="rods-sort-conatiner">
            <span className="sort-results-text">13 Results</span>
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
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
            <div className="rods-results"></div>
        </div>
    </div>
  )
}
