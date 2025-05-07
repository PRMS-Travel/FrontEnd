import { create } from "zustand";

interface SearchBarState {
	range: [Date, Date] | null;
	setRange: (value: [Date, Date] | null) => void;
	location: string;
	setLocation: (value: string) => void;
}

export const useSearchBarStore = create<SearchBarState>((set) => ({
	range: null,
	location: '',
	setRange: (range) => set({ range }),
	setLocation: (location) => set({ location }),
}));