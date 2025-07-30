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
import PropTypes from "prop-types";

const DeleteButton = ({ elementId, tableType, onSuccess }) => {
    const langDict = useSelector(state => state.language.langDict);

    const onDelete = async () => {
        switch (tableType) {
            case TableTypes.USERS:
                await deleteUser(elementId);
                break;
            case TableTypes.ARTICLE:
                await deleteArticle(elementId);
                break;
            case TableTypes.FLEA_MARKETS:
                await deleteFleaMarket(elementId);
                break;
            case TableTypes.SLOTS:
                await deleteSlot(elementId);
                break;
            case TableTypes.DEALERS:
                await deleteDealer(elementId);
                break;
            case TableTypes.INTERESTS:
                await deleteInterest(elementId);
                break;
            default:
                throw new Error(`${langDict.TableTypeError} : ${tableType}`);
        }
    };

    const handleClick = async () => {
        const isConfirmed = window.confirm(langDict.deleteButtonConfirmText);
        if (isConfirmed) {
            try {
                await onDelete();
                if (onSuccess) onSuccess();
            } catch (e) {
                console.error(`${langDict.deleteError} ${elementId} : ${e}`);
                toast.error(`${langDict.deleteError} ${elementId} : ${e}`);
            }
        }
    };

    return (
        <button className="delete-button" onClick={handleClick}>
            <IoTrashBin />
        </button>
    );
}



DeleteButton.propTypes = {
    elementId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            personId: PropTypes.number.isRequired,
            fleaMarketId: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    tableType: PropTypes.oneOf(Object.values(TableTypes)).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default DeleteButton;
