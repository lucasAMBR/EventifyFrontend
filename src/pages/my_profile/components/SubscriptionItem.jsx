import style from "../Profile.module.css";
import { useState } from "react";

export const SubscriptionItem = ({
    eventId,
    eventTitle,
    eventDate,
    eventHour,
    eventBanner,
    eventLocation,
    eventOrganizer,
}) => {

    const [aspectRatio, setAspectRatio] = useState(null);

    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        const ratio = naturalWidth / naturalHeight;
    
        setAspectRatio(ratio);
    };

    const getStyleByAspectRatio = () => {
        if (!aspectRatio) return {};
        if (aspectRatio > 1.2) {
          // Landscape
          return { height: '100%' };
        } else if (aspectRatio < 0.8) {
          // Portrait
          return { width: '100%' };
        } else {
          // Square-ish
          return {width: '100%' };
        }
      };

    function formatNumber(n) {
        return String(n).padStart(2, "0");
    }
    return (
        <div className={style.subscription_item}>
            <div className={style.subscription_item_image}>
                <img src={eventBanner} alt={eventTitle} onLoad={handleImageLoad} style={getStyleByAspectRatio()} />
            </div>
            <div className={style.subscription_item_infos}>
                <h3>{eventTitle}</h3>
                <p>{`${formatNumber(eventDate[2])}/${formatNumber(
                    eventDate[1]
                )}/${formatNumber(eventDate[0])}, ${formatNumber(
                    eventHour[0]
                )}:${formatNumber(eventHour[1])}`}</p>
            </div>
        </div>
    );
};
