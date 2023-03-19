import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./PostList.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SpinnerImg } from '../../../../Widgets/Loader/Loader';
import Search from './Search/Search';
import { filterPosts, selectFilteredPosts } from '../../../../../states/FilterSlice';
import ReactPaginate from "react-paginate";
//import { MdOutlinePublic, MdOutlinePublicOff } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deletePost, getAllPosts } from '../../../../../states/PostsSlice';
import { Link } from "react-router-dom";
//import { LinkToPublic, LinkToPrivate } from './ShiftIcon';

const PostList = ({posts, isLoading}) => {
    const [search, setSearch] = useState("");
    const filteredPosts = useSelector(selectFilteredPosts);

    const dispatch = useDispatch();

    const trimmedText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    //delete action
    const delPost = async (id) => {
        console.log(id);
        await dispatch(deletePost(id));
        await dispatch(getAllPosts());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete evidence',
            message: 'Are you sure to continue?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => delPost(id),
                },
                {
                    label: 'Cancel',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    };

    //begin pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredPosts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredPosts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredPosts]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredPosts.length;
        setItemOffset(newOffset);
    };
    // end pagination

    useEffect(() => {
        dispatch(filterPosts({posts, search}))
    }, [posts, search, dispatch]);

    /*const postVisibility = useSelector(selectPostVisibility);

    useEffect(() => {
        dispatch(DETERM_PUBLIC_STATUS(post))
    }, [dispatch, post]);*/

    return (
        <div className='postList'>
            <hr />
            <div className='table'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h2>Evidence List</h2>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>
                {isLoading && <SpinnerImg />}
                <div>
                    {!isLoading && posts.length === 0 ? (
                        <p>-- No evidence is found, please add a piece of evidence</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Tags</th>
                                    
                                    <th>Visibility</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((post, index) => {
                                        const {_id, title, tags, visibility} = post;
                                        return(
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{trimmedText(title, 10)}</td>
                                                <td>{tags}</td>
                                                
                                                <td>{visibility}</td>
                                                <td className="list-icons">
                                                    <span>
                                                        {/**Note: if the post is not public,  */}
                                                        {/**Maybe I could use two icons linked to two different pages. */}
                                                        {/**but the list will display these two icons according to the visibility status of posts */}
                                                        
                                                        <Link to={`/post-details/${_id}`}>
                                                            <AiOutlineEye size={25} color={"purple"} id="eye" />
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <Link to={`/edit-evidence/${_id}`}>
                                                            <FaEdit size={20} color={"green"} />
                                                        </Link>
                                                    </span>
                                                    {/*<span>
                                                        {
                                                            {visibility} === "public" ? (<MdOutlinePublic color={"blue"} id="public" />) : (<MdOutlinePublicOff color={"blue"} id="publicOff" />)
                                                        }
                                                    </span>*/}
                                                    <span>
                                                        <FaTrashAlt 
                                                            size={20} 
                                                            color={"red"}
                                                            onClick={() => confirmDelete(_id)} />
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    activeLinkClassName='activePage'
                />
            </div>
        </div>
    )
};

export default PostList;