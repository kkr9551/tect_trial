import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../../../Widgets/Loader/Loader';
import Search from '../../../Profile/Post/PostList/Search/Search';
import { AiOutlineEye } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
import { filterQuestions, selectFilteredQuestions } from '../../../../../states/FilterSlice';

const QuestionList = ({questions, isLoading}) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const filteredPosts = useSelector(selectFilteredQuestions);

    return (
        <div>QuestionList</div>
    );
};

export default QuestionList;