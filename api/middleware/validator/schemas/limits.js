import vine from '@vinejs/vine';

const limitsSchema = vine.object({
    page: vine.number().withoutDecimals().optional(),
    limit: vine.number().withoutDecimals().optional(),
});

// précompiler les schémas
export const
    limits = vine.compile(limitsSchema);
