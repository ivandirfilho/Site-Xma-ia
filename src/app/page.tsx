import HeroSection from '@/components/Hero/HeroSection';
import BentoGrid from '@/components/Features/BentoGrid';
import LiveInsights from '@/components/LiveInsights/LiveInsights';
import AboutSection from '@/components/About/AboutSection';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export default function Home() {
    return (
        <main>
            <Header />
            <HeroSection />
            <BentoGrid />
            <LiveInsights />
            <AboutSection />
            <Footer />
        </main>
    );
}
