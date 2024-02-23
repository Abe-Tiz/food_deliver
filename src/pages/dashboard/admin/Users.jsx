import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaUserAlt, FaUsers } from "react-icons/fa";
import  axios from 'axios';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const Users = () => {
  const axiosSecure =  useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
     return res.data;
    },
  });
  // console.log(users)

  const handleMakeAdmin = async (item) => {
    await axiosSecure.put(`/user/admin/${item._id}`).then((res) => {
      alert(`${item.name} is now Admin`);
        refetch();
    })
  };

  const handleDelete =async (item) => {
     await axiosSecure.delete(`/user/delete/${item._id}`).then((res) => {
       alert(`${item.name} is Deleted`);
       refetch();
     });
  }
  
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className="bg-green text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(item)}
                      className="btn btn-xs btn-circle bg-indigo-500 text-white"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-xs bg-orange-500 text-white"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
