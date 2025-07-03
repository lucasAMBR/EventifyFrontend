import style from "../Search.module.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";
import { CommentDropDownMenu } from "./CommentDropDownMenu";
import { useNavigate } from "react-router-dom";

export const CommentsModal = ({ setCommentModal, postId, fetchComments }) => {

    const { loggedUser } = useUserContext();

    const navigate = useNavigate();

    const [commentList, setCommentList ] = useState([]);

    const [ commentContent, setCommentContent ] = useState("")

    const handleContentChange = (e) => {
        setCommentContent(e.target.value);
    }

    const handleCloseModal = () => {
        setCommentModal(false);
        fetchComments();
    }

    const fetchCommentList = async() => {
        try{
            const response = await api.get(`/comment/${postId}`)

            setCommentList(response.data);
        }catch (error){
            console.log(error);
        }
    }
    function formatNumber(n) {
        return String(n).padStart(2, '0');
    }

    const handlePublishComment = async() =>{
        const formData = new FormData();
        formData.append("userId", loggedUser);
        formData.append("postId", postId);
        formData.append("content", commentContent);

        try{
            const response = await api.post("/comment", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            fetchCommentList();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCommentList();
    }, [])

    return(
        <div className={style.comment_modal_area}>
            <div className={style.comment_modal}>
                <div className={style.comment_modal_header} onClick={handleCloseModal}>
                    <ArrowBackIosIcon sx={{fill: "#004643"}} /> Close
                </div>
                <div className={style.comment_modal_list}>
                    {commentList.length == 0 && 
                        <div className={style.comment_list_no_comments}>
                            <p>Parece que essa publicação ainda não tem comentarios...</p>
                        </div>
                    }
                    {commentList.length >= 1 && 
                        <>
                            {commentList.map((item, index) => (
                                <div className={style.comment_item}>
                                    <div className={style.comment_header}>
                                        <div className={style.comment_header_content}>
                                        <div className={style.comment_header_photo}>
                                            <img src={`http://localhost:8080${item.userProfilePic}`} />
                                        </div>
                                        <div className={style.comment_header_infos}>
                                            <h3 onClick={() => navigate(item.userId == loggedUser ? `/home/user/profile/me` : `/home/user/profile/${item.userId}`)} style={{cursor: "pointer"}}>{item.userName}</h3>
                                            <p>{`${formatNumber(item.date[2])}/${formatNumber(item.date[1])}/${formatNumber(item.date[0])}, ${formatNumber(item.date[3])}:${formatNumber(item.date[4])}`}</p>
                                        </div>
                                        </div>
                                        {item.userId == loggedUser &&
                                            <CommentDropDownMenu commentContent={item.content} commentId={item.id} fetchComments={fetchCommentList}/>
                                        }
                                    </div>
                                    <p className={style.comment_content}>{item.content}</p>
                                </div>
                            ))}
                        </>
                    }
                </div>
                <div className={style.comment_modal_add_new}>
                    <input placeholder="Type your comment here" type="text" value={commentContent} onChange={handleContentChange}/>
                    <button onClick={handlePublishComment}><SendIcon sx={{fill: "#ffffff"}}/></button>
                </div>
            </div>
        </div>
    )
}