import { AddDivissionModal } from "../../components/modules/Admin/AddDivission/AddDivissionModal";
import { useGetDivissionQuery } from "../../redux/features/Division/division.api";

export const AddDivision = () => {
    const getDivission = useGetDivissionQuery(undefined)
    console.log(getDivission)
    return (
        <div>
          <AddDivissionModal/>
      <h1>This is the Division route</h1>            
        </div>
    );
};
