import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#16edab",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
