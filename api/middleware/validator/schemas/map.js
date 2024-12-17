import vine from '@vinejs/vine';

const mapRangeSchema = vine.object({
    range: vine.number().withoutDecimals().optional()
})


// précompiler les schémas
export const
    mapRange = vine.compile(mapRangeSchema);
