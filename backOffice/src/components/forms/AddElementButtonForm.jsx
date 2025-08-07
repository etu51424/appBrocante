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
import {verifyDates, verifyForeignKey} from "./formsCommon.js";


const AddElementButtonForm = ({ tableType, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isFormLocked, setIsFormLocked] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const openModal = () => {
        setIsOpen(true);
        setFieldErrors({});
        setIsFormLocked(false);
    }
    const closeModal = () => {
        setIsOpen(false);
        setFieldErrors({});
        setFormData({});
        setIsFormLocked(false);
    };

    const handleChange = async (e) => {
        const {name, type, checked, value, dataset} = e.target;
        const foreignKeyTable = dataset.foreignKeyTable;

        let castedValue
        if (type === "number") {
            castedValue = value === "" ? "" : Number(value);
        }

        if (foreignKeyTable && castedValue) {
            let idName = undefined;

            if (foreignKeyTable === TableTypes.DEALERS) {
                idName = 'person_id';
            }
            if (foreignKeyTable === TableTypes.INTERESTS) {
                idName = name;
            }

            const result = await verifyForeignKey({
                idValue: castedValue,
                idName: idName,
                tableType: foreignKeyTable
            });

            if (!result.exists) {
                setFieldErrors(prev => ({
                    ...prev,
                    [name]: langDict.foreignKeyNotFound,
                }));
                setIsFormLocked(true);
            } else {
                setFieldErrors(prev => {
                    const updated = {...prev};
                    delete updated[name];
                    return updated;
                });

                if (tableType === TableTypes.INTERESTS) {
                    setIsFormLocked(
                  Object.keys(fieldErrors).includes('fleaMarketId') ||
                        Object.keys(fieldErrors).includes('personId')
                    );
                } else{
                    setIsFormLocked(false);
                }
            }
        }
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormLocked) {
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
                            console.error(langDict.TableTypeError);
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
        } else {
            console.error(langDict.criteriaError);
            toast.error(langDict.criteriaError);
        }
    };

    const getFieldsByTableType = () => {
        switch (tableType) {
            case TableTypes.ARTICLE:
                return [
                    { name: "personId", label: "personId", type: "number", required: true, foreignKeyTable: TableTypes.DEALERS },
                    { name: "title", label: "title", type: "text", required: false },
                    { name: "description", label: "description", type: "textarea", required: false },
                    { name: "cost", label: "cost", type: "number", required: false },
                    { name: "condition", label: "condition", type: "text", required: false },
                ];
            case TableTypes.DEALERS:
                return [
                    { name: "personId", label: "personId", type: "number", required: true, foreignKeyTable: TableTypes.USERS },
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
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true, foreignKeyTable: TableTypes.FLEA_MARKETS },
                    { name: "isAvailable", label: "isAvailable", type: "checkbox", required: false },
                    { name: "area", label: "area", type: "number", required: false},
                ];
            case TableTypes.INTERESTS:
                return [
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true, foreignKeyTable: TableTypes.FLEA_MARKETS },
                    { name: "personId", label: "personId", type: "number", required: true, foreignKeyTable: TableTypes.USERS },
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
        <>
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
                                        <>
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
                                            {...(field.foreignKeyTable ? { 'data-foreign-key-table': field.foreignKeyTable } : {})}
                                        />
                                            {fieldErrors[field.name] && (
                                                <p className="field-error">{fieldErrors[field.name]}</p>
                                            )}
                                        </>
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
        </>
    );
}

EditElementButtonForm.propTypes = {
    tableType: PropTypes.oneOf(Object.values(TableTypes)).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default AddElementButtonForm;
