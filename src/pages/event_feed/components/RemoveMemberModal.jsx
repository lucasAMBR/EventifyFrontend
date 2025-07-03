import style from "../Feed.module.css";
import api from "../../../services/Api";

export const RemoveMemberModal = ({setRemoveMemberModalIsOpen, userId, eventId, fetchAllData}) => {
    
    const handleRemoveMember = async() => {
        try {
            const response = await api.delete(`/subscription/cancel/${userId}/${eventId}`);
            fetchAllData();
            setRemoveMemberModalIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.delete_post_modal}>
        <div className={style.delete_area}>
            <h3>Are you sure that you wanna remove this member from the event?</h3>
            <p>This action is permanent</p>
            <button className={style.confirm_delete} onClick={handleRemoveMember}>Remove</button>
            <button className={style.cancel_delete} onClick={() => setRemoveMemberModalIsOpen(false)}>Cancel</button>
        </div>
    </div>
    );
};