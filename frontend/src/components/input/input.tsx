import React,{ForwardedRef} from "react";

import * as S from './input.style';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	inputValueType?: 'email'|'password'|'passwordConfirm'
	inputStyleType?:'email'|'password'|'passwordConfirm'
}

export const Input = React.forwardRef((
	{placeholder, inputValueType, inputStyleType, onChange,...props}:InputProps, ref:ForwardedRef<HTMLInputElement>
)=>{
	return(
		<S.InputContainer>
			<S.Input
				placeholder={placeholder}
				ref={ref}
				value={inputValueType}
				type={inputStyleType}
				onChange={onChange}
				{...props}/>

		</S.InputContainer>
	)
})