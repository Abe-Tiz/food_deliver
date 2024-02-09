import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {FaHeart } from 'react-icons/fa'

const Cards = ({ item }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    return (
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div
            className={`mb-5 rating gap-1 absolute right-8 top-2 p-3 heartStar bg-green ${
              isHeartFilled ? "text-rose-500" : "text-white"
            }`}
            onClick={handleHeartClick}
          >
            <FaHeart className="h-5 w-5 cursor-pointer" />
          </div>
          <Link to={`/menu/${item._id}`}>
            <figure>
              <img
                className="hover:scale-105 transition-all duration-300 md:h-72"
                src={item.image}
                alt=""
              />
            </figure>
          </Link>
          <div className="card-body">
            <Link to={`/menu/${item._id}`}>
              <h2 className="card-title">{item.name}</h2>
            </Link>

            <p>Description of the item</p>
            <div className="card-actions flex justify-between items-center mt-2 px-5">
              <h5 className="font-semibold">
                <span className="text-sm text-red">Birr </span> {item.price}
              </h5>
              <button className="btn bg-green text-white">Add to Cart </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cards
