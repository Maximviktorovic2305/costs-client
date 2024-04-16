import { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../api/authClient";
import Spinner from "./Spinner";
import { handleAlertMessage } from "../utils/auth";

const AuthPage = ({ type }: { type: "login" | "registration" }) => {
   const [spinner, setSpinner] = useState(false);
   const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
   const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
   const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
   const navigate = useNavigate();

   const curretTitle = type === "login" ? "Войти" : "Регистрация";   

   const handleAuthResponse = (result: boolean | undefined, navigatePath: string, alertText: string) => {
      if (!result) {
         setSpinner(false);
         return;
      }   

      // usernameRef.current.value = ''
      // emailRef.current.value = ''
      // passwordRef.current.value = ''

      setSpinner(false);
      navigate(navigatePath);
      handleAlertMessage({ alertText: alertText, alertStatus: "success" });
   }

   const handleLogin = async (username: string, password: string, email: string) => {
      if (!username || !password || !email) {   
         setSpinner(false)   
         handleAlertMessage({ alertText: 'Заполните все поля', alertStatus: 'error' })
         return;
      }
      const result = await AuthClient.login(username, password, email);   

      handleAuthResponse(result, '/costs', 'Вход выполнен')
   };

   const handleRegistration = async (
      username: string,
      password: string,
      email: string
   ) => {
      if (!username || !password || !email) {   
         setSpinner(false)   
         handleAlertMessage({ alertText: 'Заполните все поля', alertStatus: 'error' })
         return;
      }
      const result = await AuthClient.registration(username, password, email);

      handleAuthResponse(result, '/login', 'Регистрация выполнена')
   };

   const handleAuth = (event: any) => {
      event.preventDefault();
      setSpinner(true);

      switch (type) {
         case "login":
            handleLogin(
               usernameRef.current.value,
               passwordRef.current.value,
               emailRef.current.value
            );
            break;

         case "registration":
            handleRegistration(
               usernameRef.current.value,
               passwordRef.current.value,
               emailRef.current.value
            );
            break;

         default:
            break;
      }
   };

   return (
      <div className="text-center mt-5">
         <h1>{curretTitle}</h1>
         <form
            onSubmit={handleAuth}
            className="max-w-[450px] mx-auto my-[1%] flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
               </svg>
               <input
                  ref={usernameRef}
                  type="text"
                  className="grow"
                  placeholder="Имя"
               />
            </label>

            <label className="input input-bordered flex items-center gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
               </svg>
               <input
                  ref={emailRef}
                  type="text"
                  className="grow"
                  placeholder="Почта"
               />
            </label>

            <label className="input input-bordered flex items-center gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70">
                  <path
                     fillRule="evenodd"
                     d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                     clipRule="evenodd"
                  />
               </svg>
               <input ref={passwordRef} type="password" className="grow" />
            </label>
            <button className="btn btn-primary max-w-[150px] min-w-[100px] mx-auto relative">
               {spinner ? <Spinner top={0} left={0} /> : curretTitle}
            </button>
         </form>
         {type === "login" ? (
            <div>
               <span className="text-gray-600 mr-2">Нет аккаунта?</span>
               <Link
                  to={"/registration"}
                  className="text-gray-600 hover:text-white hover:underline">
                  Жми сюда
               </Link>
            </div>
         ) : (
            <div>
               <span className="text-gray-600 mr-2">Есть аккаунт?</span>
               <Link
                  to={"/login"}
                  className="text-gray-600 hover:text-white hover:underline">
                  Жми сюда
               </Link>
            </div>
         )}
      </div>
   );
};

export default AuthPage;
