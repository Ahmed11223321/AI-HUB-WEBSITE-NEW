import Link from 'next/link';
import { Button } from "@/components/ui/button";
import keywords from '@/lib/keywords.json';

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {keywords.categories.map((category) => (
        <Link
          key={category}
          href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Button variant="outline" className="w-full">
            {category}
          </Button>
        </Link>
      ))}
    </div>
  );
}