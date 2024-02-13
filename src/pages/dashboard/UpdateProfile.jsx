import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import { useLocation, useNavigate } from "react-router-dom";
 
const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);

   const {
     register,
     handleSubmit,
     watch,
     formState: { errors },
  } = useForm();
  
   const location = useLocation();
   const navigate = useNavigate();
   const from = location.state?.from?.pathname || "/";

  
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL).then(() => {
      alert("User profile updated")
       navigate(from, { replace: true });
    }).catch(err => {
       console.log(err);
     })
   }

  
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h3 className="text-bold">Update Your Profile</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Photo</span>
              </label>
              <input
                type="text"
                placeholder="photo url"
                className="input input-bordered"
                required
                {...register("photoURL")}
              />

              {/* TODO: upload image will be later */}
              {/* <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              /> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-green text-white">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile
