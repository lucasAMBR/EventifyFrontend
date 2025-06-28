import style from "../Search.module.css"
import { useEffect, useRef, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";

export const CommentDropDownMenu = ({commentId, commentContent, fetchComments}) => {
        
    const { loggedUser } = useUserContext();

    const [ open, setOpen ] = useState(false);

    const [ deleteModalIsOpen, setDeleteModalIsOpen ] = useState(false);
    const [ updateModalIsOpen, setUpdateModalIsOpen ] = useState(false);

    const [ updatedText, setUpdatedText ] = useState(commentContent);

    const handleUpdateText = (event) => {
        setUpdatedText(event.target.value);
    }

    const menuRef = useRef(null); 
    
    const handleOutSideClick = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setOpen(false);
        }
    }

    const handelDeleteAction = async() => {
        try{
            const response = await api.delete(`comment/${commentId}`, {
                data: loggedUser
            });

            fetchComments()
            setDeleteModalIsOpen(false)
        }catch (error){
            console.log(error);
        }
    }

    const handleUpdateAction = async() => {
        const formData = new FormData();

        formData.append("userId", loggedUser);
        formData.append("content", updatedText)

        try{
            const response = await api.put(`comment/${commentId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            fetchComments()
            setUpdateModalIsOpen(false)
        }catch (error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleOutSideClick);
        return () => document.removeEventListener("click", handleOutSideClick)
    }, [])

    return(
        <div className={style.menuContainer} ref={menuRef}>
            <button onClick={() => setOpen(!open)} className={style.menuButton} style={open ? {backgroundColor: "#609490"} : {}}>⋮</button>
            {open && (
                <div className={style.dropdown}>
                    <button className={style.update} onClick={() => setUpdateModalIsOpen(true)}><EditIcon sx={{fill: "#004643"}}/> Edit</button>
                    <button className={style.delete} onClick={() => setDeleteModalIsOpen(true)}><DeleteIcon sx={{fill: "#ff0000"}}/>Delete</button>
                </div>
            )}
            {deleteModalIsOpen && 
                <div className={style.delete_post_modal}>
                    <div className={style.delete_area}>
                        <h3>Are you sure that you wanna delete this comment?</h3>
                        <p>This action is permanent</p>
                        <button className={style.confirm_delete} onClick={handelDeleteAction}>Delete</button>
                        <button className={style.cancel_delete} onClick={() => setDeleteModalIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            }
            {updateModalIsOpen &&
                <div className={style.delete_post_modal}>
                    <div className={style.update_area}>
                        <h3>Edit post content</h3>
                        <p>This action is permanent</p>
                        <textarea value={updatedText} onChange={handleUpdateText}/>
                        <button className={style.edit_button} onClick={() => handleUpdateAction()}>Edit</button>
                        <button className={style.cancel_delete} onClick={() => setUpdateModalIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    );
}