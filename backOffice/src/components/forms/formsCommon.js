import {TableTypes} from "../../utils/Defs.js";
import toast from "react-hot-toast";

export const verifyDates = (tableType, formData, langDict) => {
    if (tableType === TableTypes.FLEA_MARKETS) {
        const start = new Date(formData.dateStart);
        const end = new Date(formData.dateEnd);
        if (start >= end) {
            toast.error(langDict.dateError);
            console.error(langDict.dateError);
            return false;
        }
    }
    return true;
}