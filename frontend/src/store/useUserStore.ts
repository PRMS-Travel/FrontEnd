import { create } from "zustand";
import instance from "../axiosInstance";


interface AuthState {
	loginId: string;
	pwd: string;
	isLoggedIn: boolean;
	userId: number | null;
	token: string | null;
	setLoginId: (value: string) => void;
	setPassword: (value: string) => void;
	login: () => Promise<void>;
	logout: () => void;
	signup: () => Promise<void>;
	resetFields: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	loginId: "",
	pwd: "",
	isLoggedIn: false,
	userId: null,
	token: null,

	setLoginId: (value) => set({ loginId: value }),
	setPassword: (value) => set({ pwd: value }),

	resetFields: () => set({ loginId: "", pwd: "" }),
	signup: async () => {
		const { loginId, pwd } = get();
		try {
			const res = await instance.post("/users/join", { loginId, pwd });
			alert("회원가입 성공: " + res.data.message);

		} catch (err: any) {
			const message = err.response?.data?.message || "회원가입 오류";
			alert(`에러 ${message}`);
		}
	},


	login: async () => {
		const { loginId, pwd } = get();
		try {
			const res = await instance.post("/users/login", { loginId, pwd });
			const user = res.data;
			set({
				isLoggedIn: true,
				userId: user.id,
				token: user.token,
			});
			get().resetFields();
			console.log("로그인 성공:", user.login_id);
		} catch (err: any) {
			const message = err.response?.data?.message || "로그인 오류.";
			alert(`오류 ${message}`);
		}
	},


	logout: () => {
		set({
			loginId: "",
			pwd: "",
			isLoggedIn: false,
			userId: null,
			token: null,
		});
		get().resetFields();
		console.log("로그아웃 성공");
	},
}));