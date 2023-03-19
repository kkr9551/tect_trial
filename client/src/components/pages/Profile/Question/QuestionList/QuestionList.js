import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./QuestionList.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SpinnerImg } from '../../../../Widgets/Loader/Loader';
import { filterQuestions, selectFilteredQuestions } from '../../../../../states/FilterSlice';

import ReactPaginate from "react-paginate";
import { deleteQuestion, getAllQuestions } from '../../../../../states/QuestionsSlice';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Search from '../../Post/PostList/Search/Search';

const QuestionList = ({questions, isLoadingQues}) => {
    const [search, setSearch] = useState("");
    const filteredQuestions = useSelector(selectFilteredQuestions);
    const dispatch = useDispatch();

    const trimmedText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    //delete action
    const delQues = async (id) => {
        console.log(id);
        await dispatch(deleteQuestion(id));
        await dispatch(getAllQuestions);
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete question",
            message: "Are you sure to delete this question?",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => delQues(id)
                },
                {
                    label: "Cancel"
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
        setCurrentItems(filteredQuestions.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredQuestions.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredQuestions]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredQuestions.length;
        setItemOffset(newOffset);
    };
    // end pagination

    useEffect(() => {
        dispatch(filterQuestions({questions, search}))
    }, [questions, search, dispatch]);

    return (
        <div className='questionList'>
            <hr />
            <div className='quesTable'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h2>Question List</h2>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>
                {isLoadingQues && <SpinnerImg />}
                <div>
                    {!isLoadingQues && questions.length === 0 ? (
                        <p>-- No question is found, please add a question</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Book Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((ques, index) => {
                                        const {_id, bookname} = ques;
                                        return(
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{trimmedText(bookname, 25)}</td>
                                                <td className='listIcons'>
                                                    <span>
                                                        <Link to={`/question-details/${_id}`}>
                                                            <AiOutlineEye size={25} color={"purple"} id="eye" />
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <Link>
                                                            <FaEdit size={20} color={"green"} />
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(_id)} />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
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
    );
};

export default QuestionList;