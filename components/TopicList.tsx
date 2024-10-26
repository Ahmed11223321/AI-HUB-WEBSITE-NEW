import Link from 'next/link';
import { Button } from "@/components/ui/button";
import keywords from '@/lib/keywords.json';

export function TopicList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {keywords.topics.map((topic) => (
        <Link
          key={topic}
          href={`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Button variant="outline" className="w-full">
            {topic}
          </Button>
        </Link>
      ))}
    </div>
  );
}