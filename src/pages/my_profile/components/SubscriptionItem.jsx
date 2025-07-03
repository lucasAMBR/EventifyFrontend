import style from "../Profile.module.css";

export const SubscriptionItem = ({ eventId, eventTitle, eventDate, eventHour, eventBanner, eventLocation, eventOrganizer}) => {
    
    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }
    return (
        <div className={style.subscription_item}>
            <div className={style.subscription_item_image}>
                <img src={eventBanner} alt={eventTitle} />
            </div>
            <div className={style.subscription_item_infos}>
                <h3>{eventTitle}</h3>
                <p>{`${formatNumber(eventDate[2])}/${formatNumber(eventDate[1])}/${formatNumber(eventDate[0])}, ${formatNumber(eventHour[0])}:${formatNumber(eventHour[1])}`}</p>
            </div>
        </div>
    )
}