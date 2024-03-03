import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import CartBage from "../../components/CartBage";
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };
  
  // calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = totalPrice;

  // decrease quantity
  const handleDecreseQuantity = (item) => {
    if (item.quantity <= 1) {
      return;
    }
    fetch(`http://localhost:4000/carts/update/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Changed "content-type" to "Content-Type"
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updateCart);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // increase quantity
  const handleIncreaseQuantity = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:4000/carts/update/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Changed "content-type" to "Content-Type"
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updateCart);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // handle delete
const handleDelete = (item) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:4000/carts/delete/${item._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete your file.",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            title: "Failed!",
            text: "Failed to delete your file.",
            icon: "error",
          });
        });
    }
  });
};


  return (
    <>
      {cart.length === 0 ? (
        <CartBage />
      ) : (
        <div className="section-container">
          <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%">
            <div className="py-24 flex flex-col justify-center items-center gap-8 ">
              {/* text */}
              <div className=" space-y-7 px-4">
                <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                  Items Added to The <span className="text-green">Cart</span>
                </h2>
                <div>
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead className="bg-green text-white rounded-sm">
                        <tr>
                          <th>#</th>
                          <th>Food</th>
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {cart.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={item.image}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="font-bold">{item.name}</td>
                            <td>
                              <button
                                className="btn btn-xs"
                                onClick={() => handleDecreseQuantity(item)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={() => console.log(item.quantity)}
                                className="w-10 mx-2 text-center overflow-hidden appearance-none"
                              />
                              <button
                                className="btn btn-xs"
                                onClick={() => handleIncreaseQuantity(item)}
                              >
                                +
                              </button>
                            </td>
                            <td>${calculatePrice(item).toFixed(2)}</td>
                            <th>
                              <button
                                onClick={() => handleDelete(item)}
                                className="btn btn-ghost text-red btn-xs"
                              >
                                <FaTrash />
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* customer details */}
          <div className="flex flex-col md:flex-row justify-between items-center ">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-bold">Customer Details</h3>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>User_id: {user.uid}</p>
            </div>

            {/* Shopping details */}
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-bold">Shoping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ${orderTotal.toFixed(2)}</p>
              <Link to="/process-checkout">
                <button className="btn bg-green text-white">
                  Proceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
