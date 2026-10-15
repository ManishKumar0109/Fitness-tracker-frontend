import { Outlet, useLocation } from "react-router-dom";
import useStore from "../../store/store";
import { GET_PROFILE_ROUTE, GET_USER_ROUTE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path=location.pathname

  const userInfo = useStore((store) => store.userInfo);
  const saveUserInfo = useStore((store) => store.saveUserInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      try {

        const res = await api.get(GET_USER_ROUTE);


        if (res.data.success) {
          saveUserInfo(res.data.data);
          
        }
      } catch (error) {
        if (!error.response) {
           return navigate('/coldstart')
        }
        console.log("redirecting to login....", error.response);
         return navigate("/login");
      }
    };

    if (!userInfo) {
      getUserInfo();
    }
    
  }, [location.pathname, userInfo]);

  return <>{userInfo  && <Outlet />}</>;
};

export default Layout;
