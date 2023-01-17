import React from 'react';
import { CgDisplayGrid } from "react-icons/cg";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoIssueReopened } from 'react-icons/go';
import { MdAddToPhotos } from 'react-icons/md';

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