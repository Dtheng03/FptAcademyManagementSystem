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
      to: "",
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
      to: "",
      children: [
        {
          title: 'View program',
          to: '/tranning-program-list',
        },
        {
          title: 'Create program',
          to: '/create-program',
        },
      ],
    },
    {
      icon: <Icons.ClassIcon />,
      title: 'Class',
      to: "",
      children: [
        {
          title: 'View class',
          to: '/class-list',
        },
        {
          title: 'Create class',
          to: '/create-class',
        },
      ],
    },
    {
      icon: <Icons.TrainingCalendarIcon />,
      title: 'Training calendar',
      to: '/training-calendar',
      children: [],
    },
    {
      icon: <Icons.UserManagementIcon />,
      title: 'User management',
      to: "",
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
      to: "",
      children: [
        {
          title: 'Password',
          to: '/password',
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
