import style from "../Feed.module.css"
import { useEffect, useRef, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const DropDownMenu = () => {
        
    const [ open, setOpen ] = useState(false);
    const menuRef = useRef(null); 
    
    const handleOutSideClick = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setOpen(false);
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
                    <button className={style.update}><EditIcon sx={{fill: "#004643"}}/> Update</button>
                    <button className={style.delete}><DeleteIcon sx={{fill: "#ff0000"}}/>Delete</button>
                </div>
            )}
        </div>
    );
}