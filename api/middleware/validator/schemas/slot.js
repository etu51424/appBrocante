import vine from '@vinejs/vine';

const slotIdSchema = vine.object({
    id : vine.number(),
    flea_market_id : vine.number(),
})

const slotToAddSchema = vine.object({
    flea_market_id : vine.number(),
    is_available : vine.number(),
    area : vine.number().optional(),
})

const slotToUpdateSchema = vine.object({
    id : vine.number(),
    flea_market_id : vine.number().optional(),
    is_available : vine.number().optional(),
    area : vine.number().optional(),
})

const slotToDeleteSchema = vine.object({
    id : vine.number(),
    flea_market_id : vine.number(),
})

export const
    slotId = vine.compile(slotIdSchema),
    slotToAdd = vine.compile(slotToAddSchema),
    slotToUpdate = vine.compile(slotToUpdateSchema),
    slotToDelete = vine.compile(slotToDeleteSchema)