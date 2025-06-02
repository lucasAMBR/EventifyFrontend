import style from "./Feed.module.css"
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export const Feed = () => {

    const navigate = useNavigate();

    const { loggedUser, userRole } = useUserContext();

    useEffect(() => {
        document.title = "Eventfy - Home"
    }, [])

    return(
        <div className={style.feed_area}>
            <div className={style.post_list}>
                <div className={style.add_post_form}>
                    <h2>Make a post</h2>
                    <form>
                        <textarea placeholder="Insert the post content here"></textarea>
                        <div className={style.post_buttons_area}>
                            <div className={style.image_input}>
                                <p>Select the post images (optional) (limit 3 images per post)</p>
                                <input type="file"></input>
                            </div>
                            <button type="submit" className={style.publish_button}>Publish</button>
                        </div>
                    </form> 
                </div>
            </div>
            <div className={style.recomendations}>
                ...
            </div>
        </div>
    )
}