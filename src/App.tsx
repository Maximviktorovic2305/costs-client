import { useUnit } from "effector-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import AuthPage from "./components/AuthPage";
import CostsPage from "./components/CostsPage";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { $alert } from "./context/alert";
import { $auth, setAuth, setUsername } from "./context/auth";
import { getAuthDataFromLs, removeUser } from "./utils/auth";

function App() {
   const isLoggedIn = useUnit($auth);
   const alert = useUnit($alert);

   useEffect(() => {
      const auth = getAuthDataFromLs();

      if (!auth || !auth.access_token || !auth.refresh_token) {
         removeUser();
      } else {
         setAuth(true);
         setUsername(auth.username);
      }
   }, []);

   return (
      <div className="flex flex-col h-[100vh]">
         <Header />
         <Drawer />
         {alert.alertText && <Alert props={alert} />}
         <main className="text-center overflow-y-auto">
            <Routes>
               <Route
                  path="/"
                  element={
                     isLoggedIn ? (
                        <Navigate to="/costs" />
                     ) : (
                        <Navigate to="login" />
                     )
                  }
               />
               <Route
                  path="/registration"
                  element={
                     isLoggedIn ? (
                        <Navigate to="/costs" />
                     ) : (
                        <AuthPage type="registration" />
                     )
                  }
               />
               <Route
                  path="/login"
                  element={
                     isLoggedIn ? (
                        <Navigate to="/costs" />
                     ) : (
                        <AuthPage type="login" />
                     )
                  }
               />
               <Route
                  path="/costs"
                  element={
                     isLoggedIn ? <CostsPage /> : <Navigate to="/login" />
                  }
               />
            </Routes>
         </main>

         <Footer />
      </div>
   );
}

export default App;
