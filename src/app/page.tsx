import { Button } from '@/components/ui/button';
import AnnouncementBadge from '@/features/home/components/atoms/announcement-badge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[url(/assets/main-bg.png)]">
      <div className="flex flex-col gap-10 max-w-[900px]">
        <AnnouncementBadge title="Nowa wersja 1.1" linkText="Zobacz co nowego" linkHref="/" />
        <div className="flex flex-col gap-8 text-center">
          <h1 className="text-7xl font-bold text-white leading-tight">
            Zarządzaj swoimi finansami jak <span className="text-purple-300">ekspert!</span>
          </h1>
          <p className="text-2xl text-[#848C9D] max-w-2xl mx-auto">
            Śledź swoje wydatki, planuj budżet i oszczędzaj mądrze – wszystko w jednym miejscu.
          </p>
        </div>
        <Button size="lg" className="self-center text-lg py-5 px-10">
          Rozpocznij
        </Button>
      </div>
    </main>
  );
}
