import vine from '@vinejs/vine';

const slotIdSchema = vine.object({
    id : vine.number(),
})

const slotToAddSchema = vine.object({
    fleaMarketId : vine.number(),
    isAvailable : vine.number(),
    area : vine.number().optional(),
})

const slotToUpdateSchema = vine.object({
    id : vine.number(),
    fleaMarketId : vine.number().optional(),
    isAvailable : vine.number().optional(),
    area : vine.number().optional(),
})

const slotToDeleteSchema = vine.object({
    id : vine.number(),
})

export const
    slotId = vine.compile(slotIdSchema),
    slotToAdd = vine.compile(slotToAddSchema),
    slotToUpdate = vine.compile(slotToUpdateSchema),
    slotToDelete = vine.compile(slotToDeleteSchema)