import { selectPostVisibility } from "../../../../../states/PostsSlice";
import { useSelector } from "react-redux";

export const LinkToPublic = ({children}) => {
    const isPublic = useSelector(selectPostVisibility);

    if (isPublic === "public") {
        return(<>{children}</>)
    } else {
        return null;
    }
};

export const LinkToPrivate = ({children}) => {
    const isPrivate = useSelector(selectPostVisibility);

    if (isPrivate === "private") {
        return(<>{children}</>)
    } else {
        return null;
    }
};