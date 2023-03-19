import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//import "./PostList.css";
//import UseRedirectLoggedOutUser from '../../../../../custom hook/UseRedirectLoggedOutUser';
import Loader from '../../../../Widgets/Loader/Loader';
//if user is not logged in, user cannot click handshake, pindown two buttons but just view the evidence list and details
//import { getAllPosts } from '../../../../../states/PostsSlice';
import ReactPaginate from "react-paginate";
import Search from '../../../Profile/Post/PostList/Search/Search';
import { AiOutlineEye } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { filterPosts, selectFilteredPosts } from '../../../../../states/FilterSlice';

const PostList = ({posts, isLoading}) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const filteredPosts = useSelector(selectFilteredPosts);

    const trimmedText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    useEffect(() => {
        dispatch(filterPosts({posts, search}))
    }, [posts, search, dispatch]);

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

    return (
        <div className='publicPostList'>
            <hr />
            <div className='tablePublic'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h2>Evidence List</h2>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>
                {isLoading && <Loader />}
                <div>
                    {
                        !isLoading && posts.length === 0 ? (
                            <p>-- No public evidence is found</p>
                        ) : (
                            <table className='postListTb'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        
                                        <th>Title</th>
                                        <th>Tags</th>
                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItems.map((post, index) => {
                                            const {_id, title, tags, marks, appreciations} = post;
                                            return(
                                                <tr key={_id}>
                                                    <td>{index + 1}</td>
                                                    <td>{trimmedText(title, 10)}</td>
                                                    <td>{tags}</td>
                                                    
                                                    <td className="list-icons">
                                                        <span>
                                                            <Link to={`/public-post-details/${_id}`}>
                                                                <AiOutlineEye size={25} color={"purple"} id="eye" />
                                                            </Link>
                                                        </span>
                                                        <span>
                                                            <BsPinAngleFill size={20} color={"green"} id="pin" />
                                                            <span>{marks ?.length > 0 && (<span>{marks ?.length}</span>)}</span>
                                                            
                                                        </span>
                                                        <span>
                                                            <FaHandsHelping size={20} color={"orange"} id="thank" />
                                                            <span>{appreciations ?.length > 0 && (<span>{appreciations ?.length}</span>)}</span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
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
    );
};

export default PostList;