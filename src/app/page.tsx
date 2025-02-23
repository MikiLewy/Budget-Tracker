import { auth } from '@clerk/nextjs/server';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import Orb from '@/features/home/components/atoms/orb';
import StarBorder from '@/features/home/components/atoms/star-border-button/star-border-button';

const Home = async () => {
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen relative flex-col items-center justify-center gap-4 bg-[#0F172A] overflow-hidden">
      <div className="absolute -top-[100px] left-0 w-full h-[115vh]">
        <Orb hoverIntensity={0} rotateOnHover={false} hue={0} forceHoverState={false} />
      </div>
      <div className="flex flex-col gap-10 max-w-[900px] relative z-20">
        <div className="flex flex-col gap-8 text-center">
          <h1 className="text-7xl font-bold text-white leading-tight">
            Zarządzaj swoimi finansami jak <span className="text-purple-300">ekspert!</span>
          </h1>
          <p className="text-2xl text-[#848C9D] max-w-2xl mx-auto">
            Śledź swoje wydatki, planuj budżet i oszczędzaj mądrze – wszystko w jednym miejscu.
          </p>
        </div>
        <StarBorder as="button" className="self-center px-10" color="cyan" speed="3s">
          <Link href={userId ? '/expenses' : '/sign-in'} className="flex items-center gap-2 text-lg">
            Rozpocznij <ArrowRight className="w-4 h-4" />
          </Link>
        </StarBorder>
      </div>
    </main>
  );
};

export default Home;
