import vine from '@vinejs/vine';

const personIdSchema = vine.object({
    person_id : vine.number()
});

const personToAddSchema = vine.object({
    name : vine.string().trim(),
    first_name : vine.string().trim().optional(),
    last_name : vine.string().trim().optional(),
    address : vine.string().trim().optional(),
    phone_number : vine.string().trim().optional(),
    email : vine.string().email().trim(),
    last_edit_date : vine.date().optional(),
    profile_picture : vine.any().optional(),
    password : vine.string()
});

const personToUpdateSchema= vine.object({
    person_id : vine.number(),
    name : vine.string().trim().optional(),
    first_name : vine.string().trim().optional(),
    last_name : vine.string().trim().optional(),
    address : vine.string().trim().optional(),
    phone_number : vine.string().trim().optional(),
    email : vine.string().email().trim().optional(),
    last_edit_date : vine.date().optional(),
    profile_picture : vine.any().optional(),
    password : vine.string().optional()
});

//redondant sur personIdSchema ptete
const personToDeleteSchema = vine.object({
    person_id : vine.number(),
})

export const
    personId = vine.compile(personIdSchema),
    personToAdd = vine.compile(personToAddSchema),
    personToUpdate = vine.compile(personToUpdateSchema),
    personToDelete = vine.compile(personToDeleteSchema)
