import vine from '@vinejs/vine';
import recovery from "../validation/recovery.js";

const recoveryCodeSchema = vine.object({
    personId: vine.number(),
    recoveryCode : vine.string().trim()
});

export const
    recoveryCode = vine.compile(recoveryCodeSchema);
