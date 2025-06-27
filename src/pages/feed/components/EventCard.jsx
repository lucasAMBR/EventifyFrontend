import { useState } from "react"
import style from "../Feed.module.css"
import { SubscribeModal } from "./SubscribeModal";

export const EventCard = ({ id, title, type, organizer, banner, date, hour, setModal }) => {

    return (
        <div className={style.popular_event_card} onClick={() => setModal(id)}>
            <div className={style.popular_event_image}>
                <img src={banner}/>
            </div>
            <div className={style.popular_event_infos}>
                <div className={style.popular_infos_text}>
                    <h3>{title}</h3>
                    <p>{`${date[2]}/${date[1]}/${date[0]}, ${hour[0]}:${hour[1]}`}</p>
                    <p>{organizer}</p>
                </div>
            </div>
        </div>
    )
}