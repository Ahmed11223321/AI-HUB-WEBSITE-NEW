import Link from 'next/link';
import { Button } from "@/components/ui/button";
import keywords from '@/lib/keywords.json';

export function TechnologyList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {keywords.technologies.map((technology) => (
        <Link
          key={technology}
          href={`/technologies/${technology.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Button variant="outline" className="w-full">
            {technology}
          </Button>
        </Link>
      ))}
    </div>
  );
}