import { Description } from "@mui/icons-material";
import style from "../Subscriptions.module.css";

import CoPresentIcon from "@mui/icons-material/CoPresent";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useLocation, useNavigate } from "react-router-dom";

export const SubscriptionCard = ({
    EventId,
    EventBanner,
    EventTitle,
    EventDate,
    EventHour,
    status,
    setCancel,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    function formatNumber(n) {
        return String(n).padStart(2, "0");
    }

    return (
        <div className={style.event_card}>
            <div className={style.card_image}>
                <img src={EventBanner} />
            </div>
            <div className={style.card_infos}>
                <p className={style.card_title}>{EventTitle}</p>
                <p>
                    <AccessTimeIcon sx={{ fill: "#004643" }} />{" "}
                    {`${formatNumber(EventDate[2])}/${formatNumber(
                        EventDate[1]
                    )}/${formatNumber(EventDate[0])}, ${formatNumber(
                        EventHour[0]
                    )}:${formatNumber(EventHour[1])}`}
                </p>
                <p>
                    <CoPresentIcon sxx={{ fill: "#004643" }} /> Presence: {status}
                </p>
                <button
                    className={style.normal_subs_button}
                    onClick={() => navigate(`/home/event/${EventId}`)}
                >
                    View event feed
                </button>
                <button
                    className={style.cancel_subs_button}
                    onClick={() => setCancel(EventId)}
                >
                    Cancel Subscription
                </button>
            </div>
        </div>
    );
};
