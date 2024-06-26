"use client";
import React, { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import storage from "@/apis/storage";
import { JwtPayload, jwtDecode } from "jwt-decode";
import DefaultLayout from "@/layout/default-layout";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slices/userSlice";

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const checkingAuth = () => {
      const token = storage.getLocalAccessToken();

      if (!token) {
        dispatch(removeUser());
        redirect("/login");
      }

      try {
        const decodedToken: any = jwtDecode<JwtPayload>(token);

        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          dispatch(removeUser());
          redirect("/login");
        }

        setLoading(true);
      } catch (error) {
        dispatch(removeUser());
        redirect("/login");
      }
    };

    useLayoutEffect(() => {
      checkingAuth();
    }, []);

    if (!loading)
      return (
        <DefaultLayout>
          <div className="pt-4 flex items-center justify-center font-semibold text-primary-c900 text-lg">
            LOADING ...
          </div>
        </DefaultLayout>
      );

    return <Component {...props} />;
  };
};

export default withAuth;
