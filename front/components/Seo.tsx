import { DehydratedState } from "@tanstack/react-query";
import Head from "next/head";

export type SeoPageProps = {
  pageTitle: string;
  pageDesc: string;
  dehydratedState?: DehydratedState;
};
const Seo = ({ pageTitle, pageDesc }: SeoPageProps) => {
  return (
    <Head>
      <link rel="icon" href="tabicon.png" />
      <title>{pageTitle} | Hi Five</title>
      <meta property="og:title" content={pageTitle ? pageTitle : "우쥬"} key="ogtitle" />
      <meta property="og:description" content={pageDesc ? pageDesc : "교환일기 | 일정관리 "} key="ogdesc" />
      {/* <meta name="keywords" content="키워드1, 키워드2, 키워드3, 키워드10" /> */}
    </Head>
  );
};

export default Seo;
