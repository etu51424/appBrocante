import vine from '@vinejs/vine';

const dealerIdSchema = vine.object({
    personId : vine.number(),
});

const dealerToSearchSchema = vine.object({
    type: vine.string().trim(),
})

const dealerToAddSchema = vine.object({
    personId : vine.number().optional(),
    type : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signupDate : vine.date().optional(),
    averageRating : vine.number().min(1).max(5), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals()
});

const dealerToUpdateSchema= vine.object({
    personId : vine.number(),
    type : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signupDate : vine.date().optional(),
    averageRating : vine.number().min(1).max(5).optional(),
    reviewCount : vine.number().positive().withoutDecimals().optional()
});

export const
    dealerId = vine.compile(dealerIdSchema),
    dealerToSearch = vine.compile(dealerToSearchSchema),
    dealerToAdd = vine.compile(dealerToAddSchema),
    dealerToUpdate = vine.compile(dealerToUpdateSchema);
