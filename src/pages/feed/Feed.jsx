import style from "./Feed.module.css"
import api from "../../services/Api"
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";

import { PostItem } from "./components/PostItem";
import { ImageSelector } from "./components/ImageSelector";

export const Feed = () => {

    const navigate = useNavigate();

    const { loggedUser, userRole } = useUserContext();

    const [ selectedFeed, setSelectedFeed ] = useState("popular");

    const [ userPopularFeed, setUserPopularFeed ] = useState([]);
    const [ userFollowingFeed, setUserFollowingFeed ] = useState([])

    const [ newPostContent, setNewPostContent ] = useState("");
    const [ images, setImages ] = useState([]);

    const handleNewContentChange = (event) => {
        setNewPostContent(event.target.value);
    }

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (loggedUser) {
            document.title = "Eventfy - Home";
            fetchAllFeeds();
        }
    }, [loggedUser]);

    const fetchPopularFeed = async() => {
        try{
            const response = await api.get(`feed/popular/${loggedUser}`);

            setUserPopularFeed(response.data)
        }catch (error){
            console.log(error);
        }
    }

    const fetchFollowingFeed = async() => {
        try{
            const response = await api.get(`feed/following/${loggedUser}`);
            setUserFollowingFeed(response.data)
        }catch (error){
            console.log(error);
        }
    }
    
    const handleFeedSwitch = (feed) => {
        setSelectedFeed(feed);
        fetchAllFeeds();
    }

    const handleFormSubmit = async(event) => {
        event.preventDefault();

        console.log(loggedUser)
                console.log(images);

        const formData = new FormData();
        formData.append("userId", loggedUser);
        formData.append("content", newPostContent);

        images.forEach((image, index) => {formData.append("postImages", image)});

        try{
            const response = await api.post("post/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            fetchAllFeeds();
            setNewPostContent("")
            setImages([])
        }catch(error){
            console.log(error);
        }
    } 

    const fetchAllFeeds = () => {
        setLoading(true);
        fetchPopularFeed();
        fetchFollowingFeed();
        setLoading(false);
    }

    return(
        <div className={style.feed_area}>
            <div className={style.post_list}>
                <div className={style.add_post_form}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={style.form_header}>
                            <h2 onClick={() => console.log(userPopularFeed)}>Make a post</h2>
                             <ImageSelector onfilesSelected={setImages}/>
                        </div>
                
                        <textarea placeholder="Insert the post content here" value={newPostContent} onChange={handleNewContentChange}></textarea>
                        <div className={style.post_buttons_area}>
                            <button type="submit" className={style.publish_button}>Publish</button>
                        </div>
                    </form> 
                </div>
                <div className={style.feed_selector}>
                <div><span className={selectedFeed == "popular" ? style.selected : ""} onClick={() => handleFeedSwitch("popular")}>Popular</span> | <span className={selectedFeed == "following" ? style.selected : ""} onClick={() => handleFeedSwitch("following")}>Following</span></div>
                <div className={style.feed_post_list}>
                </div>
                    {!loading && userPopularFeed.length == 0 && selectedFeed == "popular" &&
                        <>
                            <p>parece que ainda não temos post</p>
                        </>
                    }
                    {!loading && userPopularFeed.length > 0 && selectedFeed == "popular" &&
                        <>
                            {userPopularFeed.map((post, index) => (
                                <PostItem key={index} postId={post.id} userId={post.userId} userProfilePic={post.userProfilePic} userName={post.userName} content={post.content} imagesPath={post.imagesPath} likeList={post.likeList} commentList={post.commentList} date={post.date}/>
                            ))}
                        </>
                    }
                    {!loading && userFollowingFeed.length > 0 && selectedFeed == "following" &&
                        <>
                            {userFollowingFeed.map((post, index) => (
                                <PostItem key={index} postId={post.id} userId={post.userId} userProfilePic={post.userProfilePic} userName={post.userName} content={post.content} imagesPath={post.imagesPath} likeList={post.likeList} commentList={post.commentList} date={post.date}/>
                            ))}
                        </>
                    }
                    {!loading && userFollowingFeed.length == 0 && selectedFeed == "following" &&
                        <>
                            <p>parece que voce ainda não segue ninguem</p>
                        </>
                    }
                </div>
            </div>
            <div className={style.recomendations}>
                ...
            </div>
        </div>
    )
}