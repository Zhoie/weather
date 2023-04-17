import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
