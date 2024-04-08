import { useUnit } from "effector-react";
import { useEffect, useMemo, useState } from "react";
import { getCostsFx } from "../api/costsClient";
import { $costs, $totalPrice, setCosts } from "../context";
import { getAuthDataFromLs } from "../utils/auth";
import CostsList from "./CostsList";
import Spinner from "./Spinner";

const CostsPage = () => {
   const [spinner, setSpinner] = useState(false);
   const store = useUnit($costs);
   const totalPrice = useUnit($totalPrice);

   useEffect(() => {
      handleGetCosts();
   }, []);

   const handleGetCosts = async () => {
      setSpinner(true);
      const authData = getAuthDataFromLs();

      const costs = await getCostsFx({
         url: "/cost",
         token: authData.access_token,
      });

      setSpinner(false);
      setCosts(costs);
   };

   return (
      <div className="px-16 pt-7">
         {/* <HeaderCosts costs={store} /> */}
         <div className="relative">
            {spinner && <Spinner top={-55} left={550} />}
            {useMemo(
               () => (
                  <CostsList costs={store} />
               ),
               [store]
            )}
            {!spinner && !store.length && <h2>Список расходов пуст</h2>}
         </div>
         <div className="stats shadow">
               <div className="stat p-3">
                  <div className="stat-title">Итого потрачено:</div>
                  <div className="stat-value text-2xl">
                     {isNaN(totalPrice) ? 0 : parseInt(String(totalPrice))} р.
                  </div>
               </div>
            </div>
      </div>
   );
};

export default CostsPage;
