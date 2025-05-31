import style from "../Events.module.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const UpdateEventModal = ({EventId, handleOpenModal}) => {

    return(
        <div className={style.event_modal}>
            <div className={style.add_event}>
                <p className={style.close_add_event} onClick={() => handleOpenModal(false)}><ArrowBackIosIcon sx={{fill: "#004643"}}/> Close</p>
                <h1>Update event information</h1>
                <p>Here you can update the informations of your already created events, the guests will bem notified of this change</p>
                <form action="">
                    <div>
                        <p>Id</p>
                        <input type="text" className={style.normal_input} value={EventId} disabled/>
                        <p>Title</p>
                        <input type="text" className={style.normal_input}/>
                        <p>Guest Limit</p>
                        <input type="text" className={style.normal_input}/>
                        <p>Location</p>
                        <input type="text" className={style.normal_input}/>
                        <p>Description</p>
                        <textarea name="" id=""></textarea>
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}