import React, { useRef, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import nProgress from "nprogress";
import 'nprogress/nprogress.css';

const Layout = ({ children }, showAfterMs = 250, options = { minimum: 0.01, speed: 500 }) => {
  const router = useRouter();
  // only showHeader on /menu and /history
  const showHeader = router.asPath === "/menu" || router.asPath === "/orders" || router.pathname === "/order/[id]";
  const showFooter = router.asPath === "/menu" || router.asPath === "/orders" || router.pathname === "/order/[id]";
  // const showHeader = router.pathname !== "/menu" ? false : true;
  // const showFooter = router.pathname !== "/menu" ? false : true;
  
  const timer = useRef(null);

  const routeChangeStart = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(nProgress.start, showAfterMs);
  }

  const routeChangeEnd = () => {
    clearTimeout(timer.current);
    nProgress.done()
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (options) {
      nProgress.configure(options);
    }

    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);

    return () => {
      Router.events.on("routeChangeStart", routeChangeStart);
      Router.events.on("routeChangeComplete", routeChangeEnd);
      Router.events.on("routeChangeError", routeChangeEnd);
    }
  }, [showAfterMs, options]);

  return (
    <div className="content">
      <Head>
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      {showHeader && <Header />}
      <main style={showFooter ? {marginBottom: '60px'} : {marginBottom: '0'}}>
        { children }
      </main>
      {showFooter && <Footer />}
    </div> 
  );
}
 
export default Layout;