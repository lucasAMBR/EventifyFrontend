import { useEffect, useState } from "react";
import style from "../Search.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import api from "../../../services/Api";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import { Accessibility, DateRange } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserContext } from "../../../contexts/UserContext";
import { ErrorMessage } from "./ErrorMessage";

export const SubscribeModal = ({ id, closeModal, fetchEvents }) => {
    const { loggedUser } = useUserContext();

    const [eventData, setEventData] = useState(null);
    const [organizerData, setOrganizerData] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const fetchData = async () => {
        const response = await api.get(`/event/find/${id}`);

        const organizerData = await api.get(
            `/user/profile/${response.data.organizerId}`
        );

        setEventData(response.data);
        setOrganizerData(organizerData.data);
    };

    const handleSubscription = async () => {
        try {
            const response = await api.post(
                `/subscription/create/${id}/${loggedUser}`
            );

            closeModal();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    function formatNumber(n) {
        return String(n).padStart(2, "0");
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={style.subscribe_modal}>
            <div className={style.subscription_area}>
                <p className={style.close_subs_modal} onClick={() => closeModal(false)}>
                    <ArrowBackIosIcon /> Close
                </p>
                <h3>More about this event</h3>
                {eventData != null && (
                    <>
                        <h2>{eventData.title}</h2>
                        <p>{eventData.description}</p>
                        <div className={style.more_infos}>
                            <h3>
                                <AccountCircleIcon sx={{ fill: "#004643" }} />
                                Organizer: {eventData.organizerName}
                            </h3>
                            <h3>
                                <Accessibility sx={{ fill: "#004643" }} />
                                Type: {eventData.type}
                            </h3>
                            <h3>
                                <DateRange sx={{ fill: "#004643" }} />
                                Date:{" "}
                                {`${formatNumber(eventData.date[2])}/${formatNumber(eventData.date[1])}/${formatNumber(eventData.date[0])}`}
                            </h3>
                            <h3>
                                <AccessTimeIcon sx={{ fill: "#004643" }} />
                                Hour: {`${formatNumber(eventData.hour[0])}:${formatNumber(eventData.hour[1])}`}
                            </h3>
                            <h3>
                                <LocationPinIcon sx={{ fill: "#004643" }} />
                                Guest limit: {eventData.subscriptionList.length} /{" "}
                                {eventData.guestLimit}
                            </h3>
                            {eventData.type == "PRESENTIAL" && (
                                <>
                                    <h3>
                                        <LocationPinIcon sx={{ fill: "#004643" }} />
                                        Local: {`${eventData.location}`}
                                    </h3>
                                    <iframe
                                        className={style.map}
                                        width="100%"
                                        height="300"
                                        loading="lazy"
                                        allowFullScreen
                                        src={`https://www.google.com/maps?q=${eventData.latitude},${eventData.longitude}&output=embed`}
                                    />
                                </>
                            )}
                            {eventData.type == "ONLINE" && (
                                <h3>
                                    <LinkIcon sx={{ fill: "#004643" }} /> Link: {eventData.link}
                                </h3>
                            )}
                        </div>
                        {errorMessage != null ? (
                            <ErrorMessage message={errorMessage} />
                        ) : (
                            ""
                        )}
                        <button
                            className={style.subscribe_button}
                            onClick={handleSubscription}
                        >
                            Subscribe
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
