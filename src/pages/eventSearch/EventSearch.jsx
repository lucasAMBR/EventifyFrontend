import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import style from "./EventSearch.module.css";

export const EventSearch = () => {
    
    return(
        <>
            <div className={style.navbar}>
                <img src="/images/LogoWhite.png" />
                <div className={style.search_bar}>
                <div className={style.search_icon}><SearchIcon sx={{fill: '#004643'}} /></div>
                    <input type="text" placeholder="Search event..."/>
                    <div className={style.search_icon_alt}><FilterAltIcon sx={{fill: '#F9B663'}} /></div>
                </div>
            </div>
            <div className={style.event_list_area}>
                ...
            </div>
        </>
    );
}