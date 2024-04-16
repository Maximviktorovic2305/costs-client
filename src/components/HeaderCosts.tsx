import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createCostFx } from "../api/costsClient";
import { createCost } from "../context";
import { ICostsHeaderProps } from "../types";
import { countTotalPrice } from "../utils/arrayUtils";
import { getAuthDataFromLs, handleAlertMessage } from "../utils/auth";
import { validationInputs } from "../utils/validation";
import Spinner from "./Spinner";

const HeaderCosts = ({ costs }: ICostsHeaderProps) => {
   const [spinner, setSpinner] = useState(false);
   const textRef = useRef() as MutableRefObject<HTMLInputElement>;
   const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
   const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

   useEffect(() => {
      countTotalPrice(costs);
   }, [costs]);

   const formSubmit = async (event: any) => {
      event.preventDefault();
      setSpinner(true);

      const textInputValue = textRef.current.value;
      const priceInputValue = priceRef.current.value;
      const dateInputValue = dateRef.current.value;

      if (!validationInputs(textRef, priceRef, dateRef)) {
         setSpinner(false);
         return;
      }

      const authData = getAuthDataFromLs();
      const cost = await createCostFx({
         url: "/cost",
         cost: {
            text: textInputValue,
            price: parseInt(priceInputValue),
            date: dateInputValue,
         },
         token: authData.access_token,
      });

      if (!cost) {
         setSpinner(false);
         return;
      }

      setSpinner(false);
      createCost(cost);
      handleAlertMessage({
         alertText: "Успешно создано",
         alertStatus: "success",
      });
   };

   return (
      <>
         {/* <h1 className="mb-6 text-2xl text-center">Учет моих расходов</h1> */}
         <div className="flex items-center">
            <form onSubmit={formSubmit} className="flex gap-4 items-center">
               <div>
                  <span className="mb-3">Куда было потрачено:</span>
                  <label className="input input-bordered flex items-center gap-2">
                     <input ref={textRef} type="text" className="grow" />
                  </label>
               </div>
               <div>
                  <span className="mb-3">Сколько было потрачено:</span>
                  <label className="input input-bordered flex items-center gap-2">
                     <input ref={priceRef} type="text" className="grow" />
                  </label>
               </div>
               <div>
                  <span className="mb-3">Когда было потрачено:</span>
                  <label className="input input-bordered flex items-center gap-2">
                     <input ref={dateRef} type="date" className="grow" />
                  </label>
               </div>

               <button
                  type="submit"
                  className="btn btn-primary max-w-[150px] min-w-[100px] mx-auto relative mt-6">
                  {spinner ? <Spinner top={10} left={0} /> : "Добавить"}
               </button>
            </form>
         </div>
         <div className="ml-6 mt-6 mb-3 text-end">
            {/* <span className="font-bold">Итого:</span> */}
            {/* <div className="stats shadow">
               <div className="stat p-3">
                  <div className="stat-title">Итого потрачено:</div>
                  <div className="stat-value text-2xl">
                     {isNaN(totalPrice) ? 0 : parseInt(String(totalPrice))} р.
                  </div>
               </div>
            </div> */}
         </div>
      </>
   );
};

export default HeaderCosts;
