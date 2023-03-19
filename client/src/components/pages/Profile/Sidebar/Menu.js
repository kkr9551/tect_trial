import React from 'react';
import { CgDisplayGrid } from "react-icons/cg";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoIssueReopened } from 'react-icons/go';
import { MdAddToPhotos } from 'react-icons/md';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BsFillPatchQuestionFill } from "react-icons/bs";

const Menu = [
    {
        title: 'My detection',
        icon: <CgDisplayGrid />,
        path: "/dashboard"
    },
    {
        title: "Add evidence",
        icon: <MdAddToPhotos />,
        path: "/add-evidence",
    },
    {
        title: "My Question",
        icon: <BsFillPatchQuestionFill />,
        path: "/my-question",
    },
    {
        title: "Add question",
        icon: <MdOutlineQuestionAnswer />,
        path: "/add-question",
    },
    {
        title: 'My account',
        icon: <
            RiAccountCircleLine />,
        childrens: [
            {
                title: 'My profile',
                path: '/my-profile',
            },
            {
                title: 'Edit profile',
                path: '/edit-profile',
            },
        ],
    },
    {
        title: 'Report issues',
        icon: <GoIssueReopened />,
        path: "/contact",
    },
];

export default Menu;