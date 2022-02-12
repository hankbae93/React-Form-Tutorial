# React-Form-Tutorial

## 1. FormData

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const data = new FormData(e.currentTarget);
	console.log(Object.fromEntries(data));
};
```

폼데이터는 그냥 객체가 아니라 XMLHttpRequest 전송을 위해 설계되어 문자화할 수 없는 객체여서

formdata를 콘솔에서 확인해보면
데이터의 entries에 담겨잇다는 사실만 확인할 수 잇다.

<br/>

## 2. Forms without Library

- <strong>우선 제출할 데이터의 이름들을 useState의 객체로 관리하자.</strong>

```tsx
-NormalForm.tsx;
const [value, setValue] = useState<FormDataType>({
	username: "",
	email: "",
	birthday: "",
	password: "",
	confirmPassword: "",
});
```

- <strong>한 input을 사용하는데 필요할 데이터들로 이뤄진 객체배열을 작성하자. 저 중에는 input 태그의 prop도 될 것이고 에러처리할 데이터에도 쓰일 것이다.</strong>

```tsx
-NormalForm.tsx;
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
```

- <strong>이제 객체배열을 map으로 컴포넌트들을 리턴해주자</strong>

```tsx
- NormalForm.tsx

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log(Object.fromEntries(data), "폼데이터 정보");
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue((prev) => ({ ...prev,
			// 해당 인풋의 네임과 일치하는 value의 키값을 변경한다.
			[e.target.name]: e.target.value
		}));
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
```

- <strong>이제 input컴포넌트와 유효하지 않을 때 에러처리를 추가해주자</strong>

```tsx
-FormInput.tsx;
import React, { useState } from "react";
import { InputProps } from "../NormalForm.type";

import { Label, Input, ErrorMessage } from "./FormInput.elements";
const FormInput = (props: InputProps) => {
	const [focused, setFocused] = useState(false);
	const { label, onChange, id, errorMessage, ...inputProps } = props;

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocused(true);
	};

	// 마지막 인풋은 submit버튼을 클릭하지 않고는 에러메세지를 확인할 수 없기 때문에 onFocus에 항상 체크하게 해놓자
	const handleLastFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		inputProps.name === "confirmPassword" && setFocused(true);
	};

	return (
		<div>
			<Label htmlFor=''>{label}</Label>
			<Input
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={handleLastFocus}
				focused={focused}
			/>
			<ErrorMessage>{errorMessage}</ErrorMessage>
		</div>
	);
};

export default FormInput;
```

- <strong>Error메세지가 처음부터 뜨면 사용자경험에서 이상하기에 입력을 하고 다음 인풋으로 넘어가 focus가 해제됐을 때만 css 처리를 해주자</strong>

```tsx
-FormInput.elements.tsx;
import styled from "styled-components";

export const Label = styled.label``;

export const Input = styled.input<{ focused?: boolean }>`
	padding: 15px;
	margin: 10px 0;

	&:invalid {
		${({ focused }) =>
			focused
				? `
    border: 1px solid red;  
    `
				: ``}
	}

	&:invalid ~ span {
		${({ focused }) =>
			focused
				? `
    display: block;  
    `
				: ``}
	}
`;

export const ErrorMessage = styled.span`
	display: none;
	color: red;
`;
```
