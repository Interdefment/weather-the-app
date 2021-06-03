import { Button, Col, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { signIn } from '../../api/firebase.api';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onButtonClick = async () => {
		try {
			await signIn(email, password);
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<div>
			<Form.Item label="Email">
				<Input value={email} onChange={onEmailChange} />
			</Form.Item>
			<Form.Item label="Password">
				<Input value={password} type="password" onChange={onPasswordChange} />
			</Form.Item>
			<Button onClick={onButtonClick} type="primary">
				Submit
			</Button>
		</div>
	);
};
