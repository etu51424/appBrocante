import vine from '@vinejs/vine';

const fleaMarketIDSchema = vine.object({
    id: vine.number()
});

const fleaMarketToAddSchema = vine.object({
    //pas d'id ici
    address: vine.string().trim(),
    date_start: vine.date(),
    //.after(dateStart) pourrait crée un problème si dateStart n'est pas set avant
    // du coup peut-être pas le mettre par simplicité
    date_end: vine.date().after(dateStart),
    title: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    // ou vine.number().range([0,1]) si considéré comme int
    is_charity: vine.boolean().optional(),
    average_rating: vine.number().min(1).max(5), //avec decimales
    review_count : vine.number().positive().withoutDecimals()
});

const fleaMarketToUpdateSchema = vine.object({
    id: vine.number(),
    address: vine.string().trim(),
    date_start: vine.date(),
    date_end: vine.date().after(dateStart),
    title: vine.string().trim().optional(),
    theme: vine.string().trim().optional(),
    is_charity: vine.boolean().optional(),
    average_rating: vine.number().min(1).max(5), //avec decimales
    review_count : vine.number().positive().withoutDecimals()
});

export const
    fleaMarketId = vine.compile(fleaMarketIDSchema),
    fleaMarketToAdd = vine.compile(fleaMarketToAddSchema),
    fleaMarketToUpdate = vine.compile(fleaMarketToUpdateSchema),
    fleaMarketToDelete = vine.compile(fleaMarketIDSchema);
