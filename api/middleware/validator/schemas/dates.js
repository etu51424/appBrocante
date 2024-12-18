import vine from '@vinejs/vine';

const datesSchema = vine.object({
    dateStart: vine.date(),
    dateEnd: vine.date().afterField('dateStart')
})


// précompiler les schémas
export const
    dates = vine.compile(datesSchema);
