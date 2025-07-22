import React from "react";
import { getAvatar } from "../fetchAPI/userManagement/avatar.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function ProfilePicturePreview({ userId }) {
    const langDict = useSelector(state => state.language.langDict);

    const handleClick = async () => {
        try {
            const imageUrl = await getAvatar(userId);
            if (imageUrl) {
                window.open(imageUrl, "_blank");
            } else {
                toast.error(langDict.profilePicturePreviewUrlUnavailable);
                console.error(langDict.profilePicturePreviewUrlUnavailable);
            }
        } catch (err) {
            toast.error(langDict.profilePicturePreviewOpenError + " : " + err);
            console.error(langDict.profilePicturePreviewOpenError + " : " + err);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-500 hover:underline"
        >
            {langDict.profilePicturePreviewButtonText}
        </button>
    );
}

ProfilePicturePreview.propTypes = {
    userId: PropTypes.number.isRequired,
}

export default ProfilePicturePreview;
