import { useUserContext } from "../../../contexts/UserContext";
import api from "../../../services/Api";
import style from "../Feed.module.css";

export const UserCard = ({
    userId,
    profilePic,
    userName,
    usertype,
    followers,
    following,
    posts,
    fetchPopulars,
}) => {
    const { loggedUser } = useUserContext();

    const handleFollow = async () => {
        try {
            const response = await api.post(`user/follow/${loggedUser}/${userId}`);

            fetchPopulars();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.user_card}>
            <div className={style.card_infos}>
                <div className={style.card_pic}>
                    <img src={`http://localhost:8080${profilePic}`} />
                </div>
                <div className={style.user_details}>
                    <h3>
                    {userName} {usertype == "ORGANIZER" && <span>Organizer</span>}
                    </h3>
                    <p>
                        Followers: {followers} | Following: {following} | Posts: {posts}
                    </p>
                </div>
            </div>
            <button onClick={handleFollow}>Follow</button>
        </div>
    );
};
