// import { useStore } from 'effector-react';
// import { $auth, $username } from '../../context/auth';
// import { useTheme } from '../../hooks';

import { useUnit } from "effector-react";
import { $auth, $username } from "../context/auth";
import { useTheme } from "../hooks/useTheme";
import { removeUser } from "../utils/auth";

export const Header = () => {
   const { switchTheme, theme } = useTheme();
   const username = useUnit($username);
   const loggedIn = useUnit($auth);

   return (
      <header
         className={`w-full px-7 py-2 flex items-center bg-primary-content justify-between`}>
         <div className="flex gap-4 items-center">
            <img src="/logo.png" width={80} height={60} alt="logo" />
            <h2 className="text-xl text-primary">
               Приложение для расходов
            </h2>
         </div>

         <div className="text-primary text-xl">{username}</div>

         <div className="flex gap-4 items-center">
            <button onClick={switchTheme} className={`btn btn-primary`}>
               {theme === "retro" ? "Go night" : "Go retro"}
            </button>
            {loggedIn && (
               <button
                  onClick={removeUser}
                  className="btn btn-accent">
                  Выход
               </button>
            )}
         </div>
      </header>
   );
};
