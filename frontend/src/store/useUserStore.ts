import { create } from "zustand";
import instance from "../axiosInstance";

interface AuthState {
	loginId: string;
	password: string;
	isLoggedIn: boolean;
	userId: number | null;
	token: string | null;
	setLoginId: (value: string) => void;
	setPassword: (value: string) => void;
	login: () => Promise<void>;
	logout: () => void;
	signup: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	loginId: "",
	password: "",
	isLoggedIn: false,
	userId: null,
	token: null,

	setLoginId: (value) => set({ loginId: value }),
	setPassword: (value) => set({ password: value }),


	signup: async () => {
		const { loginId, password } = get();
		try {
			const res = await instance.post("/users/join", { loginId, password });
			alert("회원가입 성공: " + res.data.message);
		} catch (err: any) {
			const message = err.response?.data?.message || "회원가입 오류";
			alert(`에러 ${message}`);
		}
	},


	login: async () => {
		const { loginId, password } = get();
		try {
			const res = await instance.post("/users/login", { loginId, password });
			const user = res.data;

			set({
				isLoggedIn: true,
				userId: user.id,
				token: user.token,
			});

			console.log("로그인 성공:", user.login_id);
		} catch (err: any) {
			const message = err.response?.data?.message || "로그인 오류.";
			alert(`오류 ${message}`);
		}
	},


	logout: () => {
		set({
			loginId: "",
			password: "",
			isLoggedIn: false,
			userId: null,
			token: null,
		});
		console.log("로그아웃 성공");
	},
}));