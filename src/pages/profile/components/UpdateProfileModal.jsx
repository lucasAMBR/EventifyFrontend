import { ArrowBackIos } from "@mui/icons-material";
import style from "../Profile.module.css";
import { useState } from "react";
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";

export const UpdateProfileModal = ({
    setUpdateProfileModal,
    userActualName,
    fetchAllData,
}) => {
    const { loggedUser, setSomethingChanged, somethingChanged } =
        useUserContext();

    const [userNewName, setUserNewName] = useState(userActualName);
    const [userNewProfilePicture, setUserNewProfilePicture] = useState(null);

    const handleProfilePictureChange = (event) => {
        setUserNewProfilePicture(event.target.files[0]);
    };

    const handleNameChange = (event) => {
        setUserNewName(event.target.value);
    };

    const handleUpdateProfile = async () => {
        const formData = new FormData();

        formData.append("id", loggedUser);
        formData.append("userName", userNewName);
        formData.append("newProfilePic", userNewProfilePicture);

        try {
            const response = await api.put("update/userdata", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status == 204) {
                setUpdateProfileModal(false);
                fetchAllData();
                setSomethingChanged(!somethingChanged);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.change_password_modal_area}>
            <div className={style.change_password_modal_content}>
                <div className={style.change_password_modal_close_button}>
                    <button onClick={() => setUpdateProfileModal(false)}>
                        <ArrowBackIos sx={{ color: "#004643" }} /> Close
                    </button>
                </div>
                <h1>Update profile</h1>
                <div className={style.change_password_modal_initial}>
                    <p>Change your name or profile picture</p>
                    <input
                        type="text"
                        placeholder="Name"
                        value={userNewName}
                        onChange={handleNameChange}
                    />
                    <p>Change profile picture</p>
                    <input type="file" onChange={handleProfilePictureChange} />
                    <button onClick={handleUpdateProfile}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};
