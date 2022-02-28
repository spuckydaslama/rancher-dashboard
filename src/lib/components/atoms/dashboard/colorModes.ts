export interface ColorMode {
	classes: string;
}

type Mode = 'info' | 'success' | 'warn' | 'error';

export const colorModes: { [key in Mode]: ColorMode } = {
	info: {
		classes: 'bg-sky-300 hover:bg-sky-400'
	},
	success: {
		classes: 'bg-emerald-200 hover:bg-emerald-300'
	},
	warn: {
		classes: 'bg-yellow-100 hover:bg-yellow-200'
	},
	error: {
		classes: 'bg-rose-200 hover:bg-rose-300'
	}
};
