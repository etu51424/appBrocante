import vine from '@vinejs/vine';

// opérations à réaliser sur un article : ID (pour search/delete), Add, Update
// schémas décrivent le format que doivent respecter les types

const articleIDSchema = vine.object({
    id: vine.number()
})

// champs à valider lors de l'ajout: tous
// sauf l'id qui est généré automatiquement à l'aide du name+password je pense
const articleToAddSchema = vine.object({
    dealer_id: vine.number().optional(),
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    entry_date: vine.date().optional(),
    //nb à 2 décimales
    cost: vine.number().decimal(2).optional(),
    condition: vine.string().trim().optional()
});


// Check si l'id' est ajouté aussi lors de l'update. Peut-être pas utile
const articleToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    entry_date: vine.date().optional(),
    //nb à 2 décimales
    cost: vine.number().decimal(2).optional(),
    condition: vine.string().trim().optional()
})

// précompiler les schémas
export const
    articleId = vine.compile(articleIDSchema), //searchedArticle
    articleToAdd = vine.compile(articleToAddSchema),
    articleToUpdate = vine.compile(articleToUpdateSchema),
    articleToDelete = vine.compile(articleIDSchema);