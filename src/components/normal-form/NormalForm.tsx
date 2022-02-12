import React, { useRef, useState } from "react";
import FormInput from "./form-input/FormInput";

interface FormDataType {
	username: string;
	email: string;
	birthday: string;
	password: string;
	confirmPassword: string;
}

const NormalForm = () => {
	const [username, setUsername] = useState<FormDataType>({
		username: "",
		email: "",
		birthday: "",
		password: "",
		confirmPassword: "",
	});
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		/*
    폼데이터는 그냥 객체가 아니라 XMLHttpRequest 전송을 위해 설계되어 문자화할 수 없는 객체여서 콘솔에 찍어보면 
    데이터의 entries에 담겨잇다는 사실만 확인할 수 잇다.
    */
		console.log(Object.fromEntries(data));
	};
	console.log(username);

	return (
		<div>
			<h2>NormalForm</h2>
			<form onSubmit={handleSubmit}>
				<FormInput placeholder='username' setState={setUsername} />
				{/* <FormInput /> */}
				{/* <FormInput /> */}
				{/* <FormInput /> */}
				<button type='submit'>제출</button>
			</form>
		</div>
	);
};

export default NormalForm;
