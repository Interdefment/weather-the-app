import React from 'react';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';

type NavMenuProps = {
	mode?: 'horizontal' | 'vertical';
	onLinkClick?: () => void;
};

export const NavMenu: React.FC<NavMenuProps> = ({ mode, onLinkClick }) => {
	const path = useLocation().pathname.split('/')[1];

	return (
		<Menu theme="dark" mode={mode} selectedKeys={[path]}>
			<Menu.Item key="today">
				<NavLink to="/today" onClick={onLinkClick} exact>
					Today
				</NavLink>
			</Menu.Item>
			<Menu.Item key="tomorrow" onClick={onLinkClick}>
				<NavLink to="/tomorrow">Tomorrow</NavLink>
			</Menu.Item>
			<Menu.Item key="week" onClick={onLinkClick}>
				<NavLink to="/week">Week</NavLink>
			</Menu.Item>
		</Menu>
	);
};
