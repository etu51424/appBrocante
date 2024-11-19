import vine from '@vinejs/vine';

const fleaMarketIDSchema = vine.object({
    fleaMarketId: vine.number()
});

const fleaMarketToAddSchema = vine.object({
    address: vine.string().trim(),
    dateStart: vine.date(),
    dateEnd: vine.date().afterField('dateStart'),
    title: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    isCharity: vine.boolean().optional(),
    averageRating: vine.number().min(1).max(5), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals()
});

const fleaMarketToUpdateSchema = vine.object({
    fleaMarketId: vine.number(),
    address: vine.string().trim(),
    dateStart: vine.date(),
    dateEnd: vine.date().afterField('dateStart'),
    title: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    isCharity: vine.boolean().optional(),
    averageRating: vine.number().min(1).max(5), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals()
});

export const
    fleaMarketId = vine.compile(fleaMarketIDSchema),
    fleaMarketToAdd = vine.compile(fleaMarketToAddSchema),
    fleaMarketToUpdate = vine.compile(fleaMarketToUpdateSchema),
    fleaMarketToDelete = vine.compile(fleaMarketIDSchema);
