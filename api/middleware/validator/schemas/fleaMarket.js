import vine from '@vinejs/vine';

const fleaMarketIDSchema = vine.object({
    fleaMarketId: vine.number()
});

const fleaMarketToSearchSchema = vine.object({
   title: vine.string().trim(),
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
    address: vine.string().trim().optional(),
    dateStart: vine.date().optional(),
    dateEnd: vine.date().afterField('dateStart').optional(),
    title: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    isCharity: vine.boolean().optional(),
    averageRating: vine.number().min(1).max(5).optional(), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals().optional()
});

export const
    fleaMarketId = vine.compile(fleaMarketIDSchema),
    fleaMarketToSearch = vine.compile(fleaMarketToSearchSchema),
    fleaMarketToAdd = vine.compile(fleaMarketToAddSchema),
    fleaMarketToUpdate = vine.compile(fleaMarketToUpdateSchema);
