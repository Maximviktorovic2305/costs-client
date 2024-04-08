import { useUnit } from "effector-react";
import { useState } from "react";
import { $costs } from "../context";
import HeaderCosts from "./HeaderCosts";

const Drawer = () => {
   const store = useUnit($costs);
   const [toggleClick, setToggleClick] = useState(true);

   const handleToggleButton = () => {
      setToggleClick((prev) => !prev);
   };

   return (
      <div className="drawer mt-5">
         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content mx-auto">
            {/* Page content here */}
            <label
               htmlFor="my-drawer"
               className={`btn btn-${
                  toggleClick ? "primary" : "accent"
               } drawer-button`}
               onClick={handleToggleButton}>
               {toggleClick ? "Потратил деньги, Жми сюда!" : "Закрыть"}
            </label>
         </div>
         <div className="drawer-side flex w-[100%] mt-[150px] ml-16">
            <label
               htmlFor="my-drawer"
               aria-label="close sidebar"
               className="drawer-overlay"></label>

            <HeaderCosts costs={store} />
         </div>
      </div>
   );
};

export default Drawer;
