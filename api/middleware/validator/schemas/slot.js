import vine from '@vinejs/vine';

const slotIdSchema = vine.object({
    id : vine.number(),
})

const slotToSearchSchema = vine.object({
    fleaMarketId: vine.number(),
})

const slotToAddSchema = vine.object({
    fleaMarketId : vine.number(),
    isAvailable : vine.boolean(),
    area : vine.number().optional(),
})

const slotToUpdateSchema = vine.object({
    id : vine.number(),
    fleaMarketId : vine.number().optional(),
    isAvailable : vine.boolean().optional(),
    area : vine.number().optional(),
})

export const
    slotId = vine.compile(slotIdSchema),
    slotToSearch = vine.compile(slotToSearchSchema),
    slotToAdd = vine.compile(slotToAddSchema),
    slotToUpdate = vine.compile(slotToUpdateSchema);