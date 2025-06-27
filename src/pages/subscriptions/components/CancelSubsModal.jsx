import { useUserContext } from "../../../contexts/UserContext";
import api from "../../../services/Api";
import style from "../Subscriptions.module.css"

export const CancelSubsModal = ( {id, closeModal, fetchEvents} ) => {
    
    const { loggedUser } = useUserContext();

    const handleSubscriptionCancel = async() => {
        try{
            const response = await api.delete(`/subscription/cancel/${loggedUser}/${id}`)

            fetchEvents();
            closeModal();
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className={style.cancel_modal_area}>
            <div className={style.cancel_modal}>
                <h2>Are you sure that you want cancel your subscription?</h2>
                <p>this action is permanent</p>
                <button className={style.confirm_cancel}onClick={handleSubscriptionCancel}>Yes</button>
                <button className={style.abort_cancel} onClick={closeModal}>No</button>
            </div>
        </div>
    )
}