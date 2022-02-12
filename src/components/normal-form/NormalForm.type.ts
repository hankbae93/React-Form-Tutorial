export interface ObjType {
	[index: string]: string;
}

export interface FormDataType extends ObjType {
	username: string;
	email: string;
	birthday: string;
	password: string;
	confirmPassword: string;
}

export interface InputDefaultTypes {
	id: number;
	name: string;
	type: string;
	required?: boolean;
	pattern?: string;
	placeholder?: string;
	label: string;
	errorMessage: string;
}

export interface InputProps extends InputDefaultTypes {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
