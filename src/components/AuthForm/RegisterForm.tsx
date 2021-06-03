import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { registerUser } from '../../api/firebase.api';

export const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onButtonClick = async () => {
		try {
			await registerUser(email, password, username);
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<div>
			<Form.Item label="Name" required>
				<Input value={username} onChange={onUsernameChange} />
			</Form.Item>
			<Form.Item label="Email" required>
				<Input value={email} onChange={onEmailChange} />
			</Form.Item>
			<Form.Item label="Password" required>
				<Input value={password} type="password" onChange={onPasswordChange} />
			</Form.Item>
			<Button onClick={onButtonClick} type="primary">
				Submit
			</Button>
		</div>
	);
};
