import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /* Lora font with weight 400 */
        @font-face {
          font-family: 'Lora';
          font-style: normal;
          font-weight: 400;
          src: url('/fonts/lora-regular.woff2') format('woff2'),
               url('/fonts/lora-regular.woff') format('woff');
        }
        /* Lora font with weight 700 */
        @font-face {
          font-family: 'Lora';
          font-style: normal;
          font-weight: 700;
          src: url('/fonts/lora-bold.woff2') format('woff2'),
               url('/fonts/lora-bold.woff') format('woff');
        }

        /* Zen Dots font with weight 400 */
        @font-face {
          font-family: 'Zen Dots';
          font-style: normal;
          font-weight: 400;
          src: url('/fonts/zen-dots-regular.woff2') format('woff2'),
               url('/fonts/zen-dots-regular.woff') format('woff');
        }

        /* Zen Dots font with weight 700 */
        @font-face {
          font-family: 'Zen Dots';
          font-style: normal;
          font-weight: 700;
          src: url('/fonts/zen-dots-bold.woff2') format('woff2'),
               url('/fonts/zen-dots-bold.woff') format('woff');
        }
      `,
    },
  },
});

export default theme;
