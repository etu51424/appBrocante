import * as fs from "fs-extra";

export const deleteFile = async (filePath) =>{
    return await fs.remove(filePath);
}