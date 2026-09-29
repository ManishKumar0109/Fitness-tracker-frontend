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
        console.log('horseee')
        const res = await api.get(GET_USER_ROUTE);
        console.log(res.data);

        if (res.data.success) {
          saveUserInfo(res.data.data);
          console.log('tranfer to homepage  22 ...')
        }
      } catch (error) {
        if (!error.response) {
          navigate('/coldstart')
        }
        console.log("redirecting to login....", err.response);
        navigate("/login");
      }
    };

    if (!userInfo) {
      getUserInfo();
    }
    
  }, [location.pathname, userInfo]);

  return <>{userInfo  && <Outlet />}</>;
};

export default Layout;
