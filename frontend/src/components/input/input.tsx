import React,{ForwardedRef} from "react";
import * as S from './input.style';

import { AUTH_MESSAGES } from "../../constants/authConstants";

type AuthMessageValue = typeof AUTH_MESSAGES[keyof typeof AUTH_MESSAGES];

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string;
	type?: 'email' | 'password' | 'text';
	placeholder?: string;
	label?: AuthMessageValue;
}


export const Input = React.forwardRef((
	{placeholder, label,type, value, onChange,...props}:InputProps, ref:ForwardedRef<HTMLInputElement>
)=>{
	return(
		<S.InputContainer>
			<S.Label>{label}</S.Label>
			<S.Input
				ref={ref}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				{...props}
			/>

		</S.InputContainer>
	)
})