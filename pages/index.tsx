import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AIFeatures from '@/components/AIFeatures';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>TapTap - Умный поиск вещей</title>
        <meta name="description" content="Купи что-угодно за свою цену" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <AIFeatures />
        <StatsSection />
        <Testimonials />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;