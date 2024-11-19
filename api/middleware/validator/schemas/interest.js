import vine from '@vinejs/vine';

const interestIDSchema = vine.object({
    id: vine.number()
});

const interestToAddSchema = vine.object({
    flea_market_id: vine.number(),
    person_id : vine.number(),
    is_interested : vine.boolean().optional(),    // ou int
    is_dealer : vine.boolean(), //ou int
    participation : vine.number().optional(), //ou boolean
});

const interestToUpdateSchema = vine.object({
    id : vine.number(), //je pense. Même si y'a fleaMarketId et personId
    flea_market_id: vine.number(),
    person_id : vine.number(),
    is_interested : vine.boolean().optional(),    // ou int
    is_dealer : vine.boolean(), //ou int
    participation : vine.number().optional(), //ou boolean
});

const interestToDeleteSchema = vine.object({
    id: vine.number(),
    flea_market_id: vine.number(),
    person_id: vine.number()
});

export const
    interestId = vine.compile(interestIDSchema), //searchedInterest
    interestToAdd = vine.compile(interestToAddSchema),
    interestToUpdate = vine.compile(interestToUpdateSchema),
    interestToDelete = vine.compile(interestToDeleteSchema);
