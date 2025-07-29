import React, { useState } from "react";
import { TableTypes } from "../../utils/Defs.js";
import toast from "react-hot-toast";
import "../../css/AddElementButtonForm.css";
import {createArticleData} from "../../fetchAPI/CRUD/articles.js";
import {createDealerData} from "../../fetchAPI/CRUD/dealers.js";
import {createUser} from "../../fetchAPI/CRUD/users.js";
import {createFleaMarketData} from "../../fetchAPI/CRUD/fleaMarkets.js";
import {createSlot} from "../../fetchAPI/CRUD/slots.js";
import {createInterest} from "../../fetchAPI/CRUD/interests.js";
import PropTypes from "prop-types";
import EditElementButtonForm from "./EditElementButtonForm.jsx";
import {useSelector} from "react-redux";
import { IoMdAdd } from "react-icons/io";
import {verifyDates} from "./formsCommon.js";


const AddElementButtonForm = ({ tableType, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const langDict = useSelector(state => state.language.langDict);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (verifyDates(tableType, formData, langDict)) {
            try {
                let returnedId;
                switch (tableType) {
                    case TableTypes.ARTICLE:
                        returnedId = await createArticleData(formData);
                        break;
                    case TableTypes.DEALERS:
                        returnedId = await createDealerData(formData);
                        break;
                    case TableTypes.USERS:
                        returnedId = await createUser(formData);
                        break;
                    case TableTypes.FLEA_MARKETS:
                        returnedId = await createFleaMarketData(formData);
                        break;
                    case TableTypes.SLOTS:
                        formData.isAvailable = formData.isAvailable || false;
                        returnedId = await createSlot(formData);
                        break;
                    case TableTypes.INTERESTS:
                        formData.isInterested = formData.isInterested || false;
                        formData.isDealer = formData.isDealer || false;
                        returnedId = await createInterest(formData);
                        break;
                    default:
                        throw new Error(langDict.TableTypeError);
                }
                toast.success(`${langDict.insertSuccess} : ${returnedId?.id}`);
                closeModal();
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error(`${langDict.error} : ${err.message || String(err)}`)
                toast.error(`${langDict.error} : ${err.message || String(err)}`);
            }
        }
        setIsLoading(false);
    };

    const getFieldsByTableType = () => {
        switch (tableType) {
            case TableTypes.ARTICLE:
                return [
                    { name: "personId", label: "personId", type: "number", required: true },
                    { name: "title", label: "title", type: "text", required: false },
                    { name: "description", label: "description", type: "textarea", required: false },
                    { name: "cost", label: "cost", type: "number", required: false },
                    { name: "condition", label: "condition", type: "text", required: false },
                ];
            case TableTypes.DEALERS:
                return [
                    { name: "personId", label: "personId", type: "number", required: true },
                    { name: "type", label: "type", type: "text", required: false },
                    { name: "description", label: "description", type: "textarea", required: false },
                    { name: "averageRating", label: "averageRating", type: "number", required: true, max: 5.0, isDecimal: true },
                    { name: "reviewCount", label: "reviewCount", type: "number", required: true},
                ];
            case TableTypes.USERS:
                return [
                    { name: "username", label: "username", type: "text", required: true },
                    { name: "firstName", label: "firstName", type: "text", required: false },
                    { name: "lastName", label: "lastName", type: "text", required: false },
                    { name: "address", label: "address", type: "text", required: false },
                    { name: "phoneNumber", label: "phoneNumber", type: "tel", pattern: "^\\+?[0-9\\s\\-\\.]{7,20}$" ,required: false },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "password", label: "password", type: "password", required: true },
                ];
            case TableTypes.FLEA_MARKETS:
                return [
                    { name: "address", label: "address", type: "text", required: true },
                    { name: "dateStart", label: "dateStart", type: "date", required: true },
                    { name: "dateEnd", label: "dateEnd", type: "date", required: true },
                    { name: "title", label: "title", type: "text", required: false },
                    { name: "theme", label: "theme", type: "text", required: false },
                    { name: "isCharity", label: "isCharity", type: "checkbox", required: false },
                    { name: "averageRating", label: "averageRating", type: "number", required: true, max: 5.0, isDecimal: true },
                    { name: "reviewCount", label: "reviewCount", type: "number", required: true},
                ];
            case TableTypes.SLOTS:
                return [
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true },
                    { name: "isAvailable", label: "isAvailable", type: "checkbox", required: false },
                    { name: "area", label: "area", type: "number", required: false},
                ];
            case TableTypes.INTERESTS:
                return [
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true },
                    { name: "personId", label: "personId", type: "number", required: true },
                    { name: "isInterested", label: "isInterested", type: "checkbox", required: false },
                    { name: "isDealer", label: "isDealer", type: "checkbox", required: false },
                    { name: "participation", label: "participation", type: "number", required: false },
                ];
            default:
                return [];
        }
    };

    const fields = getFieldsByTableType();

    return (
        <div>
            <button className="add-button" onClick={openModal}><IoMdAdd /></button>

            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{langDict.insertMenuTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div className="form-group" key={field.name}>
                                    <label>
                                        {field.label}{field.required && <span style={{color: 'red'}}> *</span>}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                            {...(field.type === "number" ? { min: 0 } : {})}
                                            {...(field.isDecimal ? { step: "0.01" } : {})}
                                            {...(field.max ? { max: field.max} : {})}
                                            {...(field.pattern && field.type === "tel" ? { pattern: field.pattern} : {})}

                                        />
                                    )}
                                </div>
                            ))}

                            <div className="form-actions">
                                <button type="button" onClick={closeModal}>{langDict.cancelButton}</button>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? langDict.loading : langDict.saveButton}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

EditElementButtonForm.propTypes = {
    tableType: PropTypes.oneOf(Object.values(TableTypes)).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default AddElementButtonForm;
