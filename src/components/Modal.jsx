import React, { useContext, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Modal = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const [errorMeaage,setErrorMessage] = useState("")
  const { signupWithEmail, login } = useContext(AuthContext);

  // navigete to home or specifing page 
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

// login
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email,password)
    login(email, password).then(result => {
      const user = result.user;
      alert("loggedin successful")
      document.getElementById("my_modal_5").close();
      navigate(from,{replace:true});
    }).catch(err => {
      const errMessge = err.message;
      setErrorMessage("please use correct email and password");

    })
  };

  const handleLogin = () => {
    signupWithEmail().then((result) => {
      const user = result.user;
      alert("Loggedin Successfully")
      document.getElementById("my_modal_5").close();
      navigate('/dashboard');
    }).catch(err => {
      console.log("error:", err.message);
    })
  }

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action mt-0 flex flex-col justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              method="dialog"
            >
              <h3 className="font-bold text-lg">Please Login!</h3>

              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
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
                  {...register("password", { required: true })}
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* error text */}
              {errorMeaage && <p className="text-red text-xs">{errorMeaage}</p>}

              {/* login btn */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn bg-green text-white"
                />
              </div>

              {/* signup btn */}
              <p className="text-center my-2">
                Don't have an account?{" "}
                <Link className="text-red ml-1 underline" to="/signup">
                  Sign Up
                </Link>
              </p>

              <button
                htmlFor="my_modal_5"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {/* social sign in */}
            <div className="text-center space-x-3 mb-5">
              <button
                onClick={handleLogin}
                className="btn btn-circle hover:bg-green  hover:transition ease-in-out hover:text-white"
              >
                <FaGoogle size={24} />
              </button>
              <button className="btn btn-circle hover:bg-green hover:transition ease-in-out hover:text-white">
                <FaFacebookF size={24} />
              </button>
              <button className="btn btn-circle hover:bg-green hover:transition ease-in-out hover:text-white">
                <CiLinkedin size={24} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
