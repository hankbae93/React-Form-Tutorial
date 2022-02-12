import React, { useState } from "react";
import { InputProps } from "../NormalForm.type";

import { Label, Input, ErrorMessage } from "./FormInput.elements";
const FormInput = (props: InputProps) => {
	const [focused, setFocused] = useState(false);
	const { label, onChange, id, errorMessage, ...inputProps } = props;

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocused(true);
	};

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
