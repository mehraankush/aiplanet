import ChallengeList from "@/components/core/HomeComponents/ChallengeList";
import Challenges from "@/components/core/HomeComponents/Challenges";
import HeroSection from "@/components/core/HomeComponents/HeroSection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <div>
        <HeroSection />
      </div>
      <div>
        <Challenges />
      </div>
      <div>
        <ChallengeList />
      </div>
    </main>
  );
}
