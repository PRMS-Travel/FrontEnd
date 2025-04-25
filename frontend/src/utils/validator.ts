import {EMAIL_REGEX} from "../constants/reg";

export const isEmailValid = (email: string)=> {
	EMAIL_REGEX.test(email);
}