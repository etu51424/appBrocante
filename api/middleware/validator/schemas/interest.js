import vine from '@vinejs/vine';

const interestIDSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number()
});

const interestToAddSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number(),
    isInterested : vine.boolean().optional(),    // ou int
    isDealer : vine.boolean(), //ou int
    participation : vine.number().optional(), //ou boolean
});

const interestToUpdateSchema = vine.object({
    fleaMarketId: vine.number(),
    personId : vine.number(),
    isInterested : vine.boolean().optional(),
    isDealer : vine.boolean(),
    participation : vine.number().optional(),
});

const interestToDeleteSchema = vine.object({
    fleaMarketId: vine.number(),
    personId: vine.number()
});

export const
    interestId = vine.compile(interestIDSchema), //searchedInterest
    interestToAdd = vine.compile(interestToAddSchema),
    interestToUpdate = vine.compile(interestToUpdateSchema),
    interestToDelete = vine.compile(interestToDeleteSchema);
