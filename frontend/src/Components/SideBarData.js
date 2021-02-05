import React from 'react';
import { RiArrowDownSFill, RiArrowUpSFill, RiHome7Line,
  RiCheckDoubleFill, RiEditFill, RiLineChartFill } from 'react-icons/ri'


export const SideBarData = [
  {
    title: 'Home',
    path: '/path',
    icon: <RiHome7Line/>,
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <RiCheckDoubleFill/>,
    iconOpened: <RiArrowUpSFill/>,
    iconClosed: <RiArrowDownSFill/>,
    subItem: [
      {
        title: 'Instagram Tasks',
        path: '/inst_tasks',
        icon: '',
      },
      {
        title: 'VK Tasks',
        path: '/vk_tasks',
        icon: '',
      },
      {
        title: 'Facebook Tasks',
        path: '/facebook_tasks',
        icon: '',
      },
      {
        title: 'YouTube Tasks',
        path: '/youtube_tasks',
        icon: '',
      },
    ],
  },
  {
    title: 'Create Task',
    path: '/create_tasks',
    icon: <RiEditFill/>,
    iconOpened: <RiArrowUpSFill/>,
    iconClosed: <RiArrowDownSFill/>,
    subItem: [
      {
        title: 'Create Instagram Task',
        path: '/create_inst_task',
        icon: '',
      },
      {
        title: 'Create VK Task',
        path: '/create_vk_task',
        icon: '',
      },
      {
        title: 'Create Facebook Task',
        path: '/create_facebook_task',
        icon: '',
      },
      {
        title: 'Create YouTube Task',
        path: '/create_youtube_task',
        icon: '',
      },
    ]
  },
  {
    title: 'Stats',
    path: '/stats',
    icon: <RiLineChartFill/>,
  },
]
