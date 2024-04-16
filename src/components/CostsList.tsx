import { ICost } from "../types";
import CostsItem from "./CostsItem";

const CostsList = ({ costs }: { costs: ICost[] }) => {
   return (
      <ul className="flex flex-col gap-3 mt-20">
         {costs.map((cost, index) => (
            <CostsItem key={cost._id} cost={cost} index={index + 1} />
         ))}
      </ul>
   );
};

export default CostsList;
