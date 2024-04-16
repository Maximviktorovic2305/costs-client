import { IAlertProps } from "../types";

const Alert = ({ props }: IAlertProps) => {
   return (
      <div
         role="alert"
         className={`alert-${props.alertStatus} fixed bottom-5 right-5 z-10 flex bg-primary-content text-white px-3 py-2 rounded`}>
         <span className="">{props.alertText}</span>
      </div>
   );
};

export default Alert;
