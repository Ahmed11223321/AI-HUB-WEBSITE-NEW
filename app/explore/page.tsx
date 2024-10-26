import { CategoryList } from '@/components/CategoryList';
import { TopicList } from '@/components/TopicList';
import { TechnologyList } from '@/components/TechnologyList';

export const metadata = {
  title: 'Explore AI Topics | AI News Hub',
  description: 'Explore the latest news and developments across various AI categories, topics, and technologies.',
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore AI Topics</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <CategoryList />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Popular Topics</h2>
          <TopicList />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technologies</h2>
          <TechnologyList />
        </section>
      </main>
    </div>
  );
}