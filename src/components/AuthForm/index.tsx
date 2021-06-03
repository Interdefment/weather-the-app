import { Button } from 'antd';
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import styles from './styles.module.css';

export const AuthForm = () => {
	const [mode, setMode] = useState<'login' | 'register'>('login');

	const label = mode === 'login' ? 'Sign Up' : 'Sign In';

	const onLabelClick = () => {
		if (mode === 'login') {
			setMode('register');
		} else {
			setMode('login');
		}
	};

	return (
		<div>
			{mode === 'login' && <LoginForm />}
			{mode === 'register' && <RegisterForm />}
			<Button className={styles.switchButton} onClick={onLabelClick}>
				{label}
			</Button>
		</div>
	);
};
