import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { TipOfTheDay } from "@/components/home/TipOfTheDay";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <QuickActions />
      <TipOfTheDay />
    </Layout>
  );
}
