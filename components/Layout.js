import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>I-Code</title>
        <meta
          name="description"
          content="An online programming platform provides courses, tutorials, and exercises for learning programming languages"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
