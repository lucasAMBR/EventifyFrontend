import style from "../Feed.module.css"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import api from "../../../services/Api";
import { DropDownMenu } from "./DropDownMenu";

export const PostItem = ({postId, userId, userProfilePic, userName, content, imagesPath, likeList, commentList, date }) => {

const { loggedUser } = useUserContext();

    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likeList.length);

    useEffect(() => {
        const hasLiked = likeList.some(like => like.userId === loggedUser);
        setLiked(hasLiked);
    }, [likeList, loggedUser]);

    const handleLikeClick = async () => {
        setLiked(prev => !prev);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);

        try {
            await api.post(`like/add/${loggedUser}/${postId}`);
        } catch (error) {
            console.error("Erro ao curtir/descurtir:", error);
            setLiked(prev => !prev);
            setLikesCount(prev => liked ? prev + 1 : prev - 1);
        }
    };
    return(
        <div className={style.post_item}>
            <div className={style.post_header}>
                <div className={style.post_header_infos}>
                    <div className={style.owner_profile_pic}>
                        <img src={`http://localhost:8080${userProfilePic}`} />
                    </div>
                    <div className={style.post_infos}>
                        <h3>{userName}</h3>
                        <p>{`${formatNumber(date[2])}/${formatNumber(date[1])}/${formatNumber(date[0])}, ${formatNumber(date[3])}:${formatNumber(date[4])}`}</p>
                    </div>
                </div>
                <div className={style.logged_user_post_menu}>
                    {userId == loggedUser ? <DropDownMenu /> : ""}
                </div>
            </div>
            <div className={style.post_text_content}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
            </div>
            <div className={style.post_images}>
                {imagesPath.length === 0 && ""}
                {imagesPath.length === 1 && 
                    <div className={style.single_image}>
                        <img src={`http://localhost:8080${imagesPath[0]}`}/>
                    </div>
                }
                {imagesPath.length === 2 && 
                    <>
                        <div className={style.divided_image}>
                            <img src={`http://localhost:8080${imagesPath[0]}`}/>
                        </div>
                        <div className={style.divided_image}>
                            <img src={`http://localhost:8080${imagesPath[1]}`}/>
                        </div>
                    </>
                }
                {imagesPath.length === 3 && 
                    <>
                        <div className={style.one_image}>
                            <img src={`http://localhost:8080${imagesPath[0]}`}/>
                        </div>
                        <div className={style.image_column}>
                            <div className={style.two_image}>
                                <img src={`http://localhost:8080${imagesPath[1]}`}/>
                            </div>
                            <div className={style.three_image}>
                                <img src={`http://localhost:8080${imagesPath[2]}`}/>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className={style.feedback_infos}>
                <div className={style.feedback_button} onClick={handleLikeClick}>{liked ? <FavoriteIcon sx={{ fill: "#004643" }} /> : <FavoriteBorderIcon sx={{ fill: "#004643" }} />} {likesCount}</div>
                <div className={style.feedback_button}><ChatBubbleOutlineIcon sx={{fill: "#004643"}}/> {`${commentList.length}`}</div>
            </div>
        </div>
    )
}