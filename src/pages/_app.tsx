import Layout from '@/components/global/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {

  return (
    
    // <Layout>
      // <Toaster  position='bottom-center'/>
      <Component {...pageProps} />
    // </Layout>
    )
}

