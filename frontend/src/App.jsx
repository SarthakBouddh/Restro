import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Order from "./pages/Order";
import Header from "./component/Header";
import Home from "./pages/Home";
import BottomNav from "./component/BottomNav";
import Tables from "./pages/Tables";
import { Menu } from "./pages";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./component/FullScreenLoader";
import DashBoard from "./pages/DashBoard";
import UserLogin from "./dineIn/pages/UserLogin";

function App() {
  const isLoading  = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];

  const {isAuth} = useSelector((state) => state.user);

  if(isLoading){
    return <FullScreenLoader/>
  }

  function ProtectedRoutes({children}){
    if(!isAuth){
      return <Navigate to='/auth'/>
    }

    return children
  }

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>} />
        <Route path="/auth" element={
          isAuth ? <Navigate to={'/'}/> : <Auth/>
        } />
        <Route path="/order" element={
          <ProtectedRoutes>
            <Order/>
          </ProtectedRoutes>
        } />
        <Route path="/table" element={
          <ProtectedRoutes>
            <Tables/>
          </ProtectedRoutes>
        
        } />
        <Route path="/menu" element={
          <ProtectedRoutes>
            <Menu/>
          </ProtectedRoutes>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashBoard/>
          </ProtectedRoutes>
        } />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      
      {!hideHeaderRoutes.includes(location.pathname) && <BottomNav />}
      {/* <UserLogin/> */}
    </>
  );
}

export default App;
