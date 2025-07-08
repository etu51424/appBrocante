import React from "react";
import { IoTrashBin } from "react-icons/io5";
import "../css/DeleteButton.css";
import { TableTypes as tableType, TableTypes } from "../utils/Defs.js";
import { deleteUser } from "../fetchAPI/CRUD/users.js";
import { deleteArticle } from "../fetchAPI/CRUD/articles.js";
import { deleteFleaMarket } from "../fetchAPI/CRUD/fleaMarkets.js";
import { deleteSlot } from "../fetchAPI/CRUD/slots.js";
import { deleteDealer } from "../fetchAPI/CRUD/dealers.js";
import { deleteInterest } from "../fetchAPI/CRUD/interests.js";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";

function DeleteButton({ elementId, type, onSuccess }) {
    const langDict = useSelector(state => state.language.langDict);

    const handleClick = async () => {
        // A CHANGER AVEC LE CHANGEMENT DE GESTION DE LANGUE !!
        const isConfirmed = window.confirm(langDict.deleteButtonConfirmText);
        if (isConfirmed) {
            try {
                await onDelete(elementId, type);
                if (onSuccess) onSuccess();
            } catch (e) {
                console.error(`Erreur lors de la tentative de suppression de l'élément ${elementId} sur la table ${type} : ${e}`);
                toast.error(`Erreur lors de la tentative de suppression de l'élément ${elementId} sur la table ${type} : ${e}`);
            }
        }
    };

    return (
        <button className="delete-button" onClick={handleClick}>
            <IoTrashBin />
        </button>
    );
}

const onDelete = async (elementId, type) => {
    switch (type) {
        case TableTypes.USERS:
            await deleteUser(elementId);
            break;
        case TableTypes.ARTICLE:
            await deleteArticle(elementId);
            break;
        case TableTypes.FLEA_MARKETS:
            await deleteFleaMarket(elementId);
            break;
        case tableType.SLOTS:
            await deleteSlot(elementId);
            break;
        case tableType.DEALERS:
            await deleteDealer(elementId);
            break;
        case tableType.INTERESTS:
            await deleteInterest(elementId);
            break;
        default:
            throw new Error("Type de table non reconnu : '" + type + "'");
    }
};

export default DeleteButton;
