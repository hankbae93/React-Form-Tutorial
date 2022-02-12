import React, { useRef, useState } from "react";
import { InputDefaultTypes, FormDataType } from "./NormalForm.type";

import FormInput from "./form-input/FormInput";

const NormalForm = () => {
	const [value, setValue] = useState<FormDataType>({
		username: "",
		email: "",
		birthday: "",
		password: "",
		confirmPassword: "",
	});

	const inputs: InputDefaultTypes[] = [
		{
			id: 1,
			name: "username",
			type: "text",
			required: true,
			label: "Username",
			pattern: "^[A-Za-z0-9]{3,16}$",
			errorMessage: "이름은 3-16자 내로 작성해주세요(특수문자 제외)",
		},
		{
			id: 2,
			name: "email",
			type: "email",
			required: true,
			label: "Email",
			errorMessage: "이메일 형식으로 적어주세요",
		},
		{
			id: 3,
			name: "birthday",
			type: "date",
			label: "Birthday",
			errorMessage: "",
		},
		{
			id: 4,
			name: "password",
			type: "password",
			required: true,
			label: "Password",
			pattern:
				"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
			errorMessage:
				"비밀번호는 8-20자 내외에서 적어도 1개 이상의 숫자와 1개의 특수문자를 포함해야됩니다.",
		},
		{
			id: 5,
			name: "confirmPassword",
			type: "password",
			required: true,
			pattern: value.password,
			label: "Confirm Password",
			errorMessage: "비밀번호가 일치하지 않습니다.",
		},
	];

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log(Object.fromEntries(data), "폼데이터 정보");
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div>
			<h2>NormalForm</h2>
			<form onSubmit={handleSubmit}>
				{inputs.map((input) => {
					return (
						<FormInput
							key={input.id}
							{...input}
							value={value[input.name]}
							onChange={onChange}
						/>
					);
				})}
				<button type='submit'>제출</button>
			</form>
		</div>
	);
};

export default NormalForm;
