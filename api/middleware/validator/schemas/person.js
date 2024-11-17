import vine from '@vinejs/vine';

const personIdSchema = vine.object({
    personId : vine.number()
});

const personToAddSchema = vine.object({
    name : vine.string().trim(),
    firstName : vine.string().trim().optional(),
    lastName : vine.string().trim().optional(),
    address : vine.string().trim().optional(),
    phoneNumber : vine.string().trim().optional(),
    email : vine.string().email().trim(),
    lastEditDate : vine.date().optional(),
    profile_picture : vine.any().optional(),
    password : vine.string()
});

const personToUpdateSchema= vine.object({
    personId : vine.number(),
    name : vine.string().trim().optional(),
    firstName : vine.string().trim().optional(),
    lastName : vine.string().trim().optional(),
    address : vine.string().trim().optional(),
    phoneNumber : vine.string().trim().optional(),
    email : vine.string().email().trim().optional(),
    lastEditDate : vine.date().optional(),
    profile_picture : vine.any().optional(),
    password : vine.string().optional()
});

const personToDeleteSchema = vine.object({
    personId : vine.number(),
})

export const
    personId = vine.compile(personIdSchema),
    personToAdd = vine.compile(personToAddSchema),
    personToUpdate = vine.compile(personToUpdateSchema),
    personToDelete = vine.compile(personToDeleteSchema)
