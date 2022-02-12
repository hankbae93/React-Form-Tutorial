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
