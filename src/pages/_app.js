import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
// import { DefaultSeo } from 'next-seo'
// import SEO from 'next-seo.config'
import { Provider } from 'react-redux'
import { useStore } from 'src/store/reducer'
import { AuthProvider } from "src/components/auth-provider/auth-provider"
import { AuthGuard } from 'src/components/auth-provider/auth-guard'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import createEmotionCache from 'src/themes/create-emotion-cache'
import theme from 'src/themes/theme'
import "../styles/globals.css";
import { motion } from 'framer-motion';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const LayoutComponent = dynamic(() => import('src/layouts/layout'), { 
  loading: () => 
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img style={{width: '30px'}} src='/loading.gif' alt="app loading" />
    </div>, 
});

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const store = useStore(pageProps.initialReduxState)
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              {
                // if requireAuth property is present - protect the page 
                Component.requireAuth ? (                
                  <AuthGuard>
                    <LayoutComponent>
                      
                      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                      <CssBaseline />
                      <motion.div key={props?.router?.route} initial="pageInitial" animate="pageAnimate" variants={{
                        pageInitial: {
                          opacity: 0
                        },
                        pageAnimate: {
                          opacity: 1
                        },
                      }}>
                        <Component {...pageProps} />
                      </motion.div>
                    </LayoutComponent>
                  </AuthGuard>                
                ) : (
                  // public page
                  <LayoutComponent>
                    
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <motion.div key={props?.router?.route} initial="pageInitial" animate="pageAnimate" variants={{
                      pageInitial: {
                        opacity: 0
                      },
                      pageAnimate: {
                        opacity: 1
                      },
                    }}>
                      <Component {...pageProps} />
                    </motion.div>
                  </LayoutComponent>
                )
              }
            </AuthProvider>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    )
  }
}

export default MyApp
