import React from 'react'
import { Link } from 'react-router-dom';

const CartBage = () => {
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%">
        <div className="py-24 flex flex-col  space-y-7 justify-center items-center gap-8 mt-20 ">
          {/* text */}
          {/* <div className=" space-y-7 px-4 items-center"> */}
            <p className="text-[#4A4A4A] text-xl">
              Cart is emplty. please add Products
            </p>
            <Link to='/menu' className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Back to Menu
            </Link>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default CartBage
