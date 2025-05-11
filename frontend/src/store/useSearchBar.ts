import { create } from "zustand";
import {persist} from "zustand/middleware";

interface SearchBarState {
	range: [Date, Date] | null;
	setRange: (value: [Date, Date] | null) => void;
	location: string;
	setLocation: (value: string) => void;
}

export const useSearchBarStore = create<SearchBarState>()(
	persist(
		(set) => ({
	range: null,
	location: '',
	setRange: (range) => set({ range }),
	setLocation: (location) => set({ location }),
}),
		{
			name:'search-bar-storage',
		}));