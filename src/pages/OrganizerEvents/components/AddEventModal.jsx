import style from "../Events.module.css";

export const AddEventModal = () => {

    return(
        <div className={style.event_modal}>
            <div className={style.add_event}>
                <h2>Adding a new event</h2>
                <p>Here you will add the details for the new event that you are planning, after this, people can subscribe on your event</p>
            </div>
        </div>
    )
}