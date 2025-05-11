import { create } from "zustand";
import { persist } from "zustand/middleware";
import instance from "../axiosInstance";

interface AuthState {
	loginId: string;
	pwd: string;
	isLoggedIn: boolean;
	userId: number | null;
	token: string | null;
	userName: string | null;
	setLoginId: (value: string) => void;
	setPassword: (value: string) => void;
	login: () => Promise<void>;
	logout: () => void;
	signup: () => Promise<void>;
	resetFields: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			loginId: "",
			pwd: "",
			isLoggedIn: false,
			userId: null,
			token: null,
			userName: null,

			setLoginId: (value) => set({ loginId: value }),
			setPassword: (value) => set({ pwd: value }),

			resetFields: () => set({ loginId: "", pwd: "" }),

			signup: async () => {
				const { loginId, pwd } = get();
				try {
					const res = await instance.post("/users/join", { loginId, pwd });
					alert("회원가입 성공: " + res.data.message);
					get().resetFields();
				} catch (err: any) {
					const message = err.response?.data?.message || "회원가입 오류";
					alert(`에러 ${message}`);
					get().resetFields();
				}
			},

			login: async () => {
				const { loginId, pwd } = get();
				try {
					const res = await instance.post("/users/login", { loginId, pwd });
					const { loginUser, token } = res.data;
					localStorage.setItem("accessToken", token);
					set({
						isLoggedIn: true,
						userId: loginUser.id,
						userName: loginUser.login_id,
						token: token ?? null,
					});

					get().resetFields();
					console.log("로그인 성공:", loginUser.login_id);
				} catch (err: any) {
					const message = err.response?.data?.message || "로그인 오류.";
					alert(`오류 ${message}`);
					get().resetFields();
				}
			},

			logout: () => {
				localStorage.removeItem("accessToken");
				set({
					loginId: "",
					pwd: "",
					isLoggedIn: false,
					userId: null,
					token: null,
					userName: null,
				});

				get().resetFields();
				console.log("로그아웃 성공");
			},
		}),
		{
			name: "auth-storage", // localStorage에 저장될 이름
		}
	)
);