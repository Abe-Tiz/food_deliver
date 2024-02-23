import React, { useContext } from 'react'
import Modal from './Modal';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';
import axios  from 'axios';
import useAxiosPublic from './../hooks/useAxiosPublic';
 
const Signup = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
  } = useForm();
  
  const { createUser, signUpWithGmail, updateUserProfile } =useContext(AuthContext);
    const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
    const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
  
    createUser(email, password).then(result => {
      const user = result.user;
      updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
        };
        axiosPublic
          .post("/user/create", userInfor)
          .then((res) => {
            alert("signin successfully");
            navigate(from, { replace: true });
          });
      })
    }).catch( err => {
      console.log(err.message)
      const errCode = err.code;
      const errMessage = err.message;
    })
  }

  // handle registered with google
    const handleRegister = () => {
      signUpWithGmail()
        .then((result) => {
          const user = result.user;
          const userInfor = {
            name: result?.user?.displayName,
            email: result?.user?.email,
          };
          axiosPublic
            .post("/user/create", userInfor)
            .then((response) => {
              alert("Signin successful!");
              // console.log(response);
              navigate("/");
            });
        })
        .catch((error) => console.log(error));
    };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create A Account!</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder=" Your Name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error */}

          {/* login btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default Signup
