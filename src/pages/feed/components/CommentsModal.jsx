import style from "../Feed.module.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';

export const CommentsModal = ({ setCommentModal }) => {

    return(
        <div className={style.comment_modal_area}>
            <div className={style.comment_modal}>
                <div className={style.comment_modal_header} onClick={() => setCommentModal(false)}>
                    <ArrowBackIosIcon sx={{fill: "#004643"}} /> Close
                </div>
                <div className={style.comment_modal_list}>
                    
                </div>
                <div className={style.comment_modal_add_new}>
                    <input placeholder="Type your comment here" type="text" />
                    <button><SendIcon sx={{fill: "#ffffff"}}/></button>
                </div>
            </div>
        </div>
    )
}