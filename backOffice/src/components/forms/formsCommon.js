import {TableTypes} from "../../utils/Defs.js";
import toast from "react-hot-toast";
import {verifyIdExistence} from "../../fetchAPI/CRUD/common.js";

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

export const verifyForeignKey = async ({idValue, idName, tableType}) => {
    try {
        if (idName === undefined) {
            return await verifyIdExistence({
                id: idValue,
                tableType: tableType
            });
        } else {
            return await verifyIdExistence({
                id: idValue,
                idName: idName,
                tableType: tableType
            });
        }
    } catch (e) {
        console.error(e);
    }
}

