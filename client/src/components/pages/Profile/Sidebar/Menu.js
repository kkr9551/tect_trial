import React from 'react';
import { CgDisplayGrid } from "react-icons/cg";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoIssueReopened } from 'react-icons/go';
import { MdOutlineSecurity } from 'react-icons/md';

const Menu = [
    {
        title: 'My detection',
        icon: <CgDisplayGrid />,
        path: "/myposts"
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
    {
        title: 'Security',
        icon: <MdOutlineSecurity />,
        path: "/reset",
    }
];

export default Menu;