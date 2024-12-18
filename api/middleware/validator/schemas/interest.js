import vine from '@vinejs/vine';

const interestIDSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number().optional(),
});

const interestToAddSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number().optional(),
    isInterested : vine.boolean().optional(),    // ou int
    isDealer : vine.boolean(), //ou int
    participation : vine.number().optional(), //ou boolean
});

const interestToUpdateSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number().optional(),
    isInterested : vine.boolean().optional(),
    isDealer : vine.boolean().optional(),
    participation : vine.number().optional(),
});

export const
    interestId = vine.compile(interestIDSchema), //searchedInterest
    interestToAdd = vine.compile(interestToAddSchema),
    interestToUpdate = vine.compile(interestToUpdateSchema);
