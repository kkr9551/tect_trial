import { useDispatch } from "react-redux";
import { likeAdded } from "../postsSlice";
import { 
    MdOutlineThumbUpOffAlt,
    /*MdOutlineBookmarkBorder, 
    MdOutlineDeleteOutline, 
    MdOutlineModeEdit*/ 
} from "react-icons/md";

const likeIcon = {
    thumbsUp: 'thumbsUp',
    /* mark: 'mark',
    edit: 'edit',
    delete: 'delete'*/
};

const LikeBtn = ({post}) => {
    const dispatch = useDispatch();
    const likeBtn = Object.entries(likeIcon).map(([name, icon]) => {
        return(
            <button
                key={name}
                type="button"
                className="like-btn"
                onClick={() => 
                    dispatch(likeAdded({postId: post.id, likeCount: name}))
                }
            >
                {icon === "thumbsUp" && (<MdOutlineThumbUpOffAlt />)} {post.likeCount["thumbsUp"]}
            </button>
        );
    })
    return(
        <div>{likeBtn}</div>
    );
};

export default LikeBtn;