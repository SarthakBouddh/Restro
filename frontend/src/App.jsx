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
import WaiterPage from "./pages/WaiterPage";

function App() {
  const isLoading  = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];

  const {isAuth, role} = useSelector((state) => state.user);

  if(isLoading){
    return <FullScreenLoader/>
  }

  function ProtectedRoutes({children}){
    if(!isAuth){
      return <Navigate to='/auth'/>
    }
    return children
  }

  // If user is Waiter, show only WaiterPage and Header
  if (role === 'Waiter') {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/waiter" element={
            <ProtectedRoutes>
              <WaiterPage />
            </ProtectedRoutes>
          } />
          <Route path="*" element={<Navigate to="/waiter" />} />
        </Routes>
      </>
    );
  }

  // For all other roles
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
            {role === 'Admin' && <DashBoard />}
          </ProtectedRoutes>
        } />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <BottomNav />}
    </>
  );
}

export default App;
