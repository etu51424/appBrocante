import React, { useState } from "react";
import { TableTypes } from "../../utils/Defs.js";
import toast from "react-hot-toast";
import "../../css/AddElementButtonForm.css";
import { updateArticleData } from "../../fetchAPI/CRUD/articles.js";
import { updateDealerData } from "../../fetchAPI/CRUD/dealers.js";
import { updateUser } from "../../fetchAPI/CRUD/users.js";
import { updateSlot } from "../../fetchAPI/CRUD/slots.js";
import { updateInterest } from "../../fetchAPI/CRUD/interests.js";
import { updateFleaMarket } from "../../fetchAPI/CRUD/fleaMarkets.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { verifyDates, verifyForeignKey } from "./formsCommon.js";

const EditElementButtonForm = ({ tableType, initialData, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ ...initialData });
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const langDict = useSelector(state => state.language.langDict);

    const openModal = () => {
        setFormData({ ...initialData });
        setFieldErrors({});
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormData({ ...initialData });
        setFieldErrors({});
    };

    const handleChange = async (e) => {
        const { name, type, checked, value, dataset } = e.target;
        const foreignKeyTable = dataset.foreignKeyTable;
        let finalValue;

        if (type === "checkbox") {
            finalValue = checked;
        } else if (type === "number") {
            finalValue = value === "" ? "" : Number(value);
        } else {
            finalValue = value;
        }

        if (foreignKeyTable && finalValue) {
            let idName = undefined;

            if (foreignKeyTable === TableTypes.DEALERS) {
                idName = 'person_id';
            }
            if (foreignKeyTable === TableTypes.INTERESTS) {
                idName = name;
            }

            const result = await verifyForeignKey({
                idValue: finalValue,
                idName: idName,
                tableType: foreignKeyTable
            });

            if (!result.exists) {
                setFieldErrors(prev => ({
                    ...prev,
                    [name]: langDict.foreignKeyNotFound || "Identifiant inexistant",
                }));
            } else {
                setFieldErrors(prev => {
                    const updated = { ...prev };
                    delete updated[name];
                    return updated;
                });
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const formatDateForInput = (dateValue) => {
        if (dateValue) {
            const d = new Date(dateValue);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            return "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (Object.keys(fieldErrors).length > 0) {
            toast.error(langDict.foreignKeyValidationError);
            setIsLoading(false);
            return;
        }

        if (verifyDates(tableType, formData, langDict)) {
            try {
                switch (tableType) {
                    case TableTypes.ARTICLE:
                        await updateArticleData(formData);
                        break;
                    case TableTypes.DEALERS:
                        await updateDealerData(formData);
                        break;
                    case TableTypes.USERS:
                        await updateUser(formData);
                        break;
                    case TableTypes.FLEA_MARKETS:
                        await updateFleaMarket(formData);
                        break;
                    case TableTypes.SLOTS:
                        formData.isAvailable = formData.isAvailable || false;
                        await updateSlot(formData);
                        break;
                    case TableTypes.INTERESTS:
                        formData.isInterested = formData.isInterested || false;
                        formData.isDealer = formData.isDealer || false;
                        await updateInterest(formData);
                        break;
                    default:
                        throw new Error(langDict.TableTypeError);
                }

                toast.success(langDict.updateSuccess);
                closeModal();
                if (onSuccess) onSuccess();
            } catch (err) {
                toast.error(`${langDict.error} : ${err.message || String(err)}`);
            }
        }

        setIsLoading(false);
    };

    const getFieldsByTableType = () => {
        switch (tableType) {
            case TableTypes.ARTICLE:
                return [
                    { name: "id", label: "id", type: "number", required: true },
                    { name: "personId", label: "personId", type: "number", required: true, foreignKeyTable: TableTypes.DEALERS },
                    { name: "title", label: "Titre", type: "text", required: false },
                    { name: "description", label: "Description", type: "textarea", required: false },
                    { name: "cost", label: "Coût (€)", type: "number", required: false },
                    { name: "condition", label: "État", type: "text", required: false },
                ];
            case TableTypes.DEALERS:
                return [
                    { name: "personId", label: "personId", type: "number", required: true, isId: true, foreignKeyTable: TableTypes.USERS },
                    { name: "type", label: "type", type: "text", required: false },
                    { name: "description", label: "description", type: "textarea", required: false },
                    { name: "averageRating", label: "averageRating", type: "number", required: true, max: 5.0, isDecimal: true },
                    { name: "reviewCount", label: "reviewCount", type: "number", required: true },
                ];
            case TableTypes.USERS:
                return [
                    { name: "id", label: "id", type: "number", required: true },
                    { name: "username", label: "username", type: "text", required: true },
                    { name: "firstName", label: "firstName", type: "text", required: false },
                    { name: "lastName", label: "lastName", type: "text", required: false },
                    { name: "address", label: "address", type: "text", required: false },
                    { name: "phoneNumber", label: "phoneNumber", type: "tel", pattern: "^\\+?[0-9\\s\\-\\.]{7,20}$", required: false },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "password", label: "password", type: "password", required: true },
                    { name: "recoveryCode", label: "recoveryCode", type: "text", required: false },
                ];
            case TableTypes.FLEA_MARKETS:
                return [
                    { name: "id", label: "id", type: "number", required: true },
                    { name: "address", label: "address", type: "text", required: true },
                    { name: "dateStart", label: "dateStart", type: "date", required: true },
                    { name: "dateEnd", label: "dateEnd", type: "date", required: true },
                    { name: "title", label: "title", type: "text", required: false },
                    { name: "theme", label: "theme", type: "text", required: false },
                    { name: "isCharity", label: "isCharity", type: "checkbox", required: false },
                    { name: "averageRating", label: "averageRating", type: "number", required: true, max: 5.0, isDecimal: true },
                    { name: "reviewCount", label: "reviewCount", type: "number", required: true },
                ];
            case TableTypes.SLOTS:
                return [
                    { name: "id", label: "id", type: "number", required: true },
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true, foreignKeyTable: TableTypes.FLEA_MARKETS },
                    { name: "isAvailable", label: "isAvailable", type: "checkbox", required: false },
                    { name: "area", label: "area", type: "number", required: false },
                ];
            case TableTypes.INTERESTS:
                return [
                    { name: "fleaMarketId", label: "fleaMarketId", type: "number", required: true, isId: true },
                    { name: "personId", label: "personId", type: "number", required: true, isId: true },
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
            <button className="edit-button" onClick={openModal}><CiEdit /></button>

            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{langDict.updateMenuTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            {fields.map((field) => (
                                <div className="form-group" key={field.name}>
                                    <label>
                                        {field.label}{field.required && <span style={{ color: 'red' }}> *</span>}
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
                                                value={
                                                    field.type === "checkbox"
                                                        ? undefined
                                                        : field.type === "date"
                                                            ? formatDateForInput(formData[field.name])
                                                            : formData[field.name] || ""
                                                }
                                                checked={
                                                    field.type === "checkbox"
                                                        ? formData[field.name] || false
                                                        : undefined
                                                }
                                                onChange={handleChange}
                                                required={field.required}
                                                className={fieldErrors[field.name] ? 'input-error' : ''}
                                                {...(field.type === "number" ? { min: 0 } : {})}
                                                {...(field.name === "id" || field.isId ? { disabled: true } : {})}
                                                {...(field.isDecimal ? { step: "0.01" } : {})}
                                                {...(field.max ? { max: field.max } : {})}
                                                {...(field.pattern && field.type === "tel" ? { pattern: field.pattern } : {})}
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
        </div>
    );
};

EditElementButtonForm.propTypes = {
    initialData: PropTypes.object.isRequired,
    tableType: PropTypes.oneOf(Object.values(TableTypes)).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default EditElementButtonForm;
