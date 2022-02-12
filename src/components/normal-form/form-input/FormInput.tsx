import React from "react";

interface InputProps {
	placeholder: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	required?: boolean;
}

const FormInput = (props: InputProps) => {
	return (
		<div>
			<label htmlFor=''>UserName</label>
			<input
				type='text'
				name=''
				id=''
				placeholder={props.placeholder}
				onChange={(e) => props.setState(e.target.value)}
			/>
		</div>
	);
};

export default FormInput;
