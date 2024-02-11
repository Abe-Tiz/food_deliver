import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);
 

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
              {errors.password && <span>email and password is required</span>}

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
              <button className="btn btn-circle hover:bg-green  hover:transition ease-in-out hover:text-white">
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
