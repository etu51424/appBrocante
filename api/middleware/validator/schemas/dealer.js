import vine from '@vinejs/vine';

const dealerIdSchema = vine.object({
    person_id : vine.number()
});

// pas de verif pour l'id à l'ajout
const dealerToAddSchema = vine.object({
    type : vine.string().trim().optional(),
    last_name : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signup_date : vine.date().optional(),
    average_rating : vine.number().min(1).max(5), //avec decimales
    review_count : vine.number().positive().withoutDecimals()
});

const dealerToUpdateSchema= vine.object({
    person_id : vine.string().trim(),
    type : vine.string().trim().optional(),
    last_name : vine.string().trim().optional(),
    description : vine.string().trim().optional(),
    signup_date : vine.date().optional(),
    average_rating : vine.number().min(1).max(5), //avec decimales
    review_count : vine.number().positive().withoutDecimals()
});

//redondant sur dealerIdSchema ptete
const dealerToDeleteSchema = vine.object({
    person_id : vine.number()
})

export const
    dealerId = vine.compile(dealerIdSchema),
    dealerToAdd = vine.compile(dealerToAddSchema),
    dealerToUpdate = vine.compile(dealerToUpdateSchema),
    dealerToDelete = vine.compile(dealerToDeleteSchema)
