import { useState } from "react";
import style from "../Feed.module.css";
import { SubscribeModal } from "./SubscribeModal";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

export const EventCard = ({
    id,
    title,
    type,
    organizer,
    organizerId,
    banner,
    date,
    hour,
    setModal,
}) => {
    const { loggedUser } = useUserContext();

    const navigate = useNavigate();

    
    function formatNumber(n) {
        return String(n).padStart(2, "0");
    }

    return (
        <div className={style.popular_event_card} onClick={() => setModal(id)}>
            <div className={style.popular_event_image}>
                <img src={banner} />
            </div>
            <div className={style.popular_event_infos}>
                <div className={style.popular_infos_text}>
                    <h3>{title}</h3>
                    <p>{`${formatNumber(date[2])}/${formatNumber(date[1])}/${formatNumber(date[0])}, ${formatNumber(hour[0])}:${formatNumber(hour[1])}`}</p>
                    <p
                        onClick={() =>
                            navigate(
                                organizerId == loggedUser
                                    ? `/home/user/profile/me`
                                    : `/home/user/profile/${organizerId}`
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <p style={{fontWeight: "bold"}}>{organizer}</p>
                    </p>
                </div>
            </div>
        </div>
    );
};
