import { Analytics } from "@vercel/analytics/react"
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-[#300050]"> {/* Добавлен класс для фона */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TapTap - Умный поиск вещей</title>
        <meta name="description" content="TapTap - Удобный и умный поиск вещей. Купи что-угодно за свою цену." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;