import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#0A0A0A',
			paper: '#2C2C2C',
		},
		primary: {
			main: '#50C878',
		},
		text: {
			primary: '#E0E0E0',
		},
	},
	typography: {
		fontFamily: 'Poppins, sans-serif',
		allVariants: {
			color: '#FFFFFF',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        html, body, button, a, input, textarea {
          font-family: 'Poppins', sans-serif;
          color: #FFFFFF;
        }
      `,
		},
		MuiLink: {
			styleOverrides: {
				root: {
					fontFamily: 'Poppins, sans-serif',
					color: '#50C878',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					fontFamily: 'Poppins, sans-serif',
				},
			},
		},
	},
});

export default theme;
