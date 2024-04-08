import { ISpinnerProps } from "../types";

const Spinner = ({ top, left }: ISpinnerProps) => {
   return (
      <div
         style={{ top: `${top}px`, left: `${left}px`, position: 'absolute' }}
         className="w-[100px] h-6">
         {/* <span className="loading loading-ball loading-xs"></span>
         <span className="loading loading-ball loading-sm"></span>
         <span className="loading loading-ball loading-md"></span> */}
         <span className="loading loading-ball loading-lg"></span>
      </div>
   );
};

export default Spinner;
