import { MutableRefObject, useRef, useState } from "react";
import { deleteCostFx, updateCostFx } from "../api/costsClient";
import { removeCost, updatedCost } from "../context";
import { ICostsItemProps } from "../types";
import { formatDate } from "../utils/arrayUtils";
import { getAuthDataFromLs, handleAlertMessage } from "../utils/auth";
import { validationInputs } from "../utils/validation";
import Spinner from "./Spinner";

const CostsItem = ({ cost, index }: ICostsItemProps) => {
   const [deleteSpinner, setDeleteSpinner] = useState(false);
   const [editSpinner, setEditSpinner] = useState(false);
   const [edit, setEdit] = useState(false);
   const [newText, setNewText] = useState(cost.text);
   const [newPrice, setNewPrice] = useState<string | number>(cost.price);
   const [newDate, setNewDate] = useState(cost.date);
   const textRef = useRef() as MutableRefObject<HTMLInputElement>;
   const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
   const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

   const deleteCost = async () => {
      setDeleteSpinner(true);

      const authData = getAuthDataFromLs();

      await deleteCostFx({
         url: "/cost",
         token: authData.access_token,
         id: cost._id as string,
      });

      setDeleteSpinner(false);
      removeCost(cost._id as string);
      handleAlertMessage({ alertText: "Удалено", alertStatus: "success" });
   };

   const allowEditCost = () => {
      setEdit(true);
   };

   const cancelEditCost = () => {
      setEditSpinner(false);
      setEdit(false);
   };

   const handleEditCost = async () => {
      setEditSpinner(true);

      if (
         newText === cost.text &&
         +newPrice === cost.price &&
         newDate === cost.date
      ) {
         setEditSpinner(false);
         setEdit(false);
         return;
      }

      if (!validationInputs(textRef, priceRef, dateRef)) {
         setEditSpinner(false);
         return;
      }

      setEdit(false);

      const authData = getAuthDataFromLs();

      const editedCost = await updateCostFx({
         url: "/cost",
         token: authData.access_token,
         cost: {
            text: newText,
            price: +newPrice,
            date: newDate,
         },
         id: cost._id as string,
      });

      if (!editedCost) {
         setEditSpinner(false);
         return;
      }

      setEditSpinner(false);
      updatedCost(editedCost);
      handleAlertMessage({
         alertText: "Успешно обновлено",
         alertStatus: "success",
      });
   };

   const handleChangeText = (event: any) => setNewText(event.target.value);
   const handleChangePrice = (event: any) => setNewPrice(event.target.value);
   const handleChangeDate = (event: any) => setNewDate(event.target.value);

   return (
      <li
         className="flex justify-between items-center border-primary border-[1px] rounded-lg p-1"
         id={cost._id as string}>
         <div className="flex gap-2 items-center">
            <span>{index} Магазин</span>
            {edit ? (
               <label className="input input-bordered flex items-center gap-2">
                  <input
                     ref={textRef}
                     onChange={handleChangeText}
                     value={newText}
                     type="text"
                     className="grow"
                  />
               </label>
            ) : (
               <span> "{cost.text}"</span>
            )}
            {edit ? (
               <label
                  className={`input input-bordered flex items-center gap-2`}>
                  <input
                     ref={dateRef}
                     onChange={handleChangeDate}
                     value={new Date(newDate).toISOString().split("T")[0]}
                     type="date"
                     className="grow"
                  />
               </label>
            ) : (
               <span> Дата {formatDate(cost.date as string)}</span>
            )}
         </div>

         <div className="flex items-center gap-2">
            {edit ? (
               <label className="input input-bordered flex items-center">
                  <input
                     ref={priceRef}
                     onChange={handleChangePrice}
                     value={newPrice}
                     type="text"
                     className="grow"
                  />
               </label>
            ) : (
               <span>
                  <span className="font-bold">Сумма: </span>
                  {cost.price} р.
               </span>
            )}
            {edit ? (
               <div className="flex items-center gap-2">
                  <button onClick={handleEditCost} className="btn btn-primary">
                     {editSpinner ? (
                        <Spinner top={-3} left={-30} />
                     ) : (
                        "Сохранить"
                     )}
                  </button>
                  <button className="btn btn-accent" onClick={cancelEditCost}>
                     Отменить
                  </button>
               </div>
            ) : (
               <div className="flex items-center gap-2">
                  <button className="btn btn-primary" onClick={allowEditCost}>
                     Изменить
                  </button>
                  <button onClick={deleteCost} className="btn btn-accent">
                     {deleteSpinner ? (
                        <Spinner top={-3} left={-30} />
                     ) : (
                        <span>&times;</span>
                     )}
                  </button>
               </div>
            )}
         </div>
      </li>
   );
};

export default CostsItem;
