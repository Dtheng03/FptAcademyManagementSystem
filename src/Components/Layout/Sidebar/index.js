import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import NavItem from './NavItem';
import * as Icons from '../../Common/Icons/NavMenuIcons';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      icon: <Icons.HomeIcon />,
      title: 'Home',
      to: '/home',
      children: [],
    },
    {
      icon: <Icons.SyllabusIcon />,
      title: 'Syllabus',

      children: [
        {
          title: 'View syllabus',
          to: '/view-syllabus',
        },
        {
          title: 'Create syllabus',
          to: '/create-syllabus',
        },
      ],
    },
    {
      icon: <Icons.TrainingProgramIcon />,
      title: 'Traning program',
      to: '/tranning-program-list',
      children: [
        {
          title: 'View program',
          to: '',
        },
        {
          title: 'Create program',
          to: '',
        },
      ],
    },
    {
      icon: <Icons.ClassIcon />,
      title: 'Class',

      children: [
        {
          title: 'View class',
          to: '/class-list',
        },
        {
          title: 'Create class',
          to: '',
        },
      ],
    },
    {
      icon: <Icons.TrainingCalendarIcon />,
      title: 'Training calendar',
      to: '',
      children: [],
    },
    {
      icon: <Icons.UserManagementIcon />,
      title: 'User management',

      children: [
        {
          title: 'User list',
          to: '/user-list',
        },
        {
          title: 'User permission',
          to: '/user-permission',
        },
      ],
    },
    {
      icon: <Icons.LearningMaterialsIcon />,
      title: 'Learning materials',
      to: '/materials',
      children: [],
    },
    {
      icon: <Icons.SettingIcon />,
      title: 'Setting',

      children: [
        {
          title: 'Calendar',
          to: '',
        },
      ],
    },
  ];

  return (
    <Sider
      className={cx('sidebar')}
      collapsed={collapsed}
      theme='light'
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--white-color)',
      }}
    >
      <div
        className={collapsed ? cx('close') : cx('open')}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <Icons.MenuIcon /> : <Icons.CloseIcon />}
      </div>
      {navItems.map((item) => (
        <NavItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          to={item.to}
          children={item.children}
          collapsed={collapsed}
        />
      ))}
    </Sider>
  );
}

export default Sidebar;
