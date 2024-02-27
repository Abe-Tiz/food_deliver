import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: isAdmin,
    isPending: isAdminLoading,
    refetch,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/admin/${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
