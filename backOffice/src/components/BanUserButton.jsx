import React, { useState } from "react";
import {banUser, unbanUser} from "../fetchAPI/userManagement/moderation.js";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const BanUserButton = ({ elementId, isBlocked, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const langDict = useSelector(state => state.language.langDict);

    const handleBan = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(langDict.banButtonConfirmText);
        if (isConfirmed) {

            try {
                let result = await banUser(elementId);
                if (onSuccess && result) {
                    toast.success(langDict.userBanned);
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors du bannissement : ${err}`);
                toast.error(`Erreur lors du bannissement : ${err}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUnban = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(langDict.unbanButtonConfirmText);
        if (isConfirmed) {
            try {
                let result = await unbanUser(elementId);
                if (onSuccess && result) {
                    toast.success("L'utilisateur a été débanni !");
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors du débannissement : ${err}`);
                toast.error(`Erreur lors du bannissement : ${err}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-start">
            <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                onClick={() => { isBlocked ? handleUnban() : handleBan()}}
                disabled={isLoading}
            >
                {isLoading ? "..." : isBlocked ? langDict.unbanButton : langDict.banButton}
            </button>
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

BanUserButton.propTypes = {
    elementId: PropTypes.number.isRequired,
    isBlocked: PropTypes.bool.isRequired,
    onSuccess: PropTypes.func.isRequired,
}

export default BanUserButton;
