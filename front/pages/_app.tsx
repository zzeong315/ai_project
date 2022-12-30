import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo, { SeoPageProps } from "../components/Seo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { darkTheme, lightTheme } from "../styles/theme";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/Error";
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<SeoPageProps>) {
  const { pageTitle, pageDesc } = pageProps;

  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    themeCheck();
  }, [darkMode]);

  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <ErrorBoundary FallbackComponent={Error}>
              <Suspense fallback={<div>loading...</div>}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Seo pageTitle={pageTitle} pageDesc={pageDesc}></Seo>
                  <Component {...pageProps} />
                  <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
                </Layout>
              </Suspense>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
