import React, { useState } from "react";
import { useSelector } from "react-redux";
import {demoteUser, promoteUser} from "../fetchAPI/userManagement/promotion.js";

function PromoteUserButton({ userId, isAdmin, onSuccess }) {
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePromote = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(langDict.promoteButtonConfirmText);
        if (isConfirmed) {
            try {
                let result = await promoteUser(userId);

                if (onSuccess && result) {
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors de la promotion : ${err}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    const handleDemote = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(langDict.demoteButtonConfirmText);
        if (isConfirmed) {
            try {
                let result = await demoteUser(userId);

                if (onSuccess && result){
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors de la rétrogradation : ${err}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                onClick={() => { isAdmin ? handleDemote() : handlePromote(); }}
                disabled={isLoading}
            >
                {isLoading ? "..." : isAdmin ? langDict.demoteButton : langDict.promoteButton}
            </button>
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

export default PromoteUserButton;
