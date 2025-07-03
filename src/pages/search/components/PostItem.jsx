import style from "../Search.module.css"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import api from "../../../services/Api";
import { DropDownMenu } from "./DropDownMenu";
import { CommentsModal } from "./CommentModal";
import { useNavigate } from "react-router-dom";

export const PostItem = ({postId, userId, userProfilePic, userName, content, imagesPath, likeList, commentList, date }) => {

    const navigate = useNavigate();

    const { loggedUser } = useUserContext();

    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likeList.length);

    const [ removed, setRemoved ] = useState(false);

    const [ postContent, setPostContent] = useState(content);

    const [ commentModalIsOpen, setCommentModalIsOpen ] = useState(false);

    const [liveCommentList, setLiveCommentList ] = useState([]);

    const fetchComments = async() => {
        try{
            const response = await api.get(`/comment/${postId}`)

            setLiveCommentList(response.data);
        }catch (error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchComments();
    },[])

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
        <div className={style.post_item} style={removed ? {display: "none"} : {}}>
            <div className={style.post_header}>
                <div className={style.post_header_infos}>
                    <div className={style.owner_profile_pic}>
                        <img src={`http://localhost:8080${userProfilePic}`} />
                    </div>
                    <div className={style.post_infos}>
                        <h3 onClick={() => navigate(userId == loggedUser ? `/home/user/profile/me` : `/home/user/profile/${userId}`)} style={{cursor: "pointer"}}>{userName}</h3>
                        <p>{`${formatNumber(date[2])}/${formatNumber(date[1])}/${formatNumber(date[0])}, ${formatNumber(date[3])}:${formatNumber(date[4])}`}</p>
                    </div>
                </div>
                <div className={style.logged_user_post_menu}>
                    {userId == loggedUser ? <DropDownMenu postId={postId} setRemoved={setRemoved} postContent={content} setPostContent={setPostContent}/> : ""}
                </div>
            </div>
            <div className={style.post_text_content}>
                <p>{postContent}</p>
            </div>
            <div className={style.post_images}>
                {imagesPath.length === 0 && ""}
                {imagesPath.length === 1 && 
                    <img src={`http://localhost:8080${imagesPath[0]}`} className={style.single_image} />
                }
                {imagesPath.length === 2 && 
                    <div className={style.two_images}>
                        {imagesPath.map((src, i) => (
                            <img key={i} src={`http://localhost:8080${src}`} className={style.two_image_item} alt={`post ${i}`} />
                        ))}
                    </div>
                }
                {imagesPath.length === 3 && 
                    <div className={style.three_images}>
                        <img src={`http://localhost:8080${imagesPath[0]}`} className={style.three_main_image} alt="main" />
                        <div className={style.three_side_images}>
                            <img src={`http://localhost:8080${imagesPath[1]}`} className={style.three_side_image} alt="side1" />
                            <img src={`http://localhost:8080${imagesPath[2]}`} className={style.three_side_image} alt="side2" />
                        </div>
                    </div>
                }
            </div>
            <div className={style.feedback_infos}>
                <div className={style.feedback_button} onClick={handleLikeClick}>{liked ? <FavoriteIcon sx={{ fill: "#004643" }} /> : <FavoriteBorderIcon sx={{ fill: "#004643" }} />} {likesCount}</div>
                <div className={style.feedback_button} onClick={() => setCommentModalIsOpen(true)}><ChatBubbleOutlineIcon sx={{fill: "#004643"}}/> {`${liveCommentList.length}`}</div>
            </div>
            {commentModalIsOpen && <CommentsModal setCommentModal={() => setCommentModalIsOpen(false)} postId={postId} fetchComments={fetchComments}/>}
        </div>
    )
}