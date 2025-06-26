import React, { useState } from "react";
import {banUser, unbanUser} from "../fetchAPI/userManagement/moderation.js";
import {token} from "../fetchAPI/login.js";
import languageDictProvider from "../utils/language.js";

function BanUserButton({ elementId, isBlocked, onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBan = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(languageDictProvider(window.language).banButtonConfirmText);
        if (isConfirmed) {

            try {
                let result = await banUser(elementId);
                if (onSuccess && result) {
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors du bannissement : ${err}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUnban = async () => {
        setIsLoading(true);
        setError(null);

        const isConfirmed = window.confirm(languageDictProvider(window.language).unbanButtonConfirmText);
        if (isConfirmed) {
            try {
                let result = await unbanUser(elementId);
                if (onSuccess && result) {
                    onSuccess();
                }
            } catch (err) {
                setError(`Erreur lors du débannissement : ${err}`);
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
                {isLoading ? "..." : isBlocked ? "Débannir" : "Bannir"}
            </button>
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

export default BanUserButton;
