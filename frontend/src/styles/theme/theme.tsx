import { Theme } from "@emotion/react";

declare module '@emotion/react' {
	export interface Theme {
		fontSizes: {
			xxs:string
			xs: string
			sm: string
			base:string
			md: string
			lg: string
			xl: string
		};
		colors: {
			black: string
			gray:string
			gray100:string
			gray200:string
			sodomy:string
			sodomy200:string
			white: string
			white100:string
			white200:string
			blue:string
		};
		borderRadius: {
			xxs:string;
			xs:string;
			base: string;
			sm: string;
			md: string;
			lg: string;
		}
	}
}

const theme: Theme = {
	fontSizes: {
		xxs:'10px',
		xs: '12px',
		sm:'14px',
		base: '16px',
		md: '20px',
		lg: '40px',
		xl: '42px',

	},
	colors: {
	sodomy200:'#1E2A3C',
		sodomy:'#3D3E48',
		black: '#12101D',
		white: '#FFFFFF',
		white200:'#D1D1D1',
		white100:'#F8F8F8',
		gray:'#BCC2CC',
		gray100:'#CACACA',
		gray200:'#7B7B7B',
	blue:'#009DFF',
	},
	borderRadius:{
		xxs:'0.25rem',
		xs:'0.3125rem',
		base: '0.625rem',
		sm:'0.5rem',
		md:'1rem',
		lg:' 1.25rem',
	}
}

export default theme;