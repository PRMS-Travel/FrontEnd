// useModal.ts
import { useState } from "react";

type ModalType = 'location' | 'date' | 'destination';

type ModalState = {
	[key in ModalType]: boolean;
};

const defaultModalState: ModalState = {
	location: false,
	date: false,
	destination: false,
};

export const useModal = () => {
	const [isOpenModal, setIsOpenModal] = useState<ModalState>(defaultModalState);

	const toggleModal = (type: ModalType) => {
		setIsOpenModal((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	const closeModal = (type: ModalType) => {
		setIsOpenModal((prev) => ({
			...prev,
			[type]: false,
		}));
	};

	const openModal = (type: ModalType) => {
		setIsOpenModal((prev) => ({
			...prev,
			[type]: true,
		}));
	};

	return { isOpenModal, toggleModal, closeModal, openModal };
};