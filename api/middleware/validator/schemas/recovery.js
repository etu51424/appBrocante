import vine from '@vinejs/vine';
import recovery from "../validation/recovery.js";

const recoveryCodeSchema = vine.object({
    personId: vine.string().trim(),
    recoveryCode : vine.string()
});

export const
    recoveryCode = vine.compile(recoveryCodeSchema);
