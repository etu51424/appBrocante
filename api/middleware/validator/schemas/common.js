import vine from '@vinejs/vine';

const idToVerifySchema = vine.object({
    id: vine.number(),
    tableName: vine.string().trim(),
    idName: vine.string().trim().optional(),
});

export const idToVerify = vine.compile(idToVerifySchema);