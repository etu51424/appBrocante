import vine from '@vinejs/vine';

const dealerIdSchema = vine.object({
    personId : vine.number()
});

const dealerToAddSchema = vine.object({
    type : vine.string().trim().optional(),
    lastName : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signupDate : vine.date().optional(),
    averageRating : vine.number().min(1).max(5), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals()
});

const dealerToUpdateSchema= vine.object({
    personId : vine.number().optional(),
    type : vine.string().trim().optional(),
    lastName : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signupDate : vine.date().optional(),
    averageRating : vine.number().min(1).max(5), //avec decimales
    reviewCount : vine.number().positive().withoutDecimals()
});

export const
    dealerId = vine.compile(dealerIdSchema),
    dealerToAdd = vine.compile(dealerToAddSchema),
    dealerToUpdate = vine.compile(dealerToUpdateSchema);
