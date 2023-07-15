import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@/styles/global.css";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
