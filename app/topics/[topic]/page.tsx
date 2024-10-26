import { fetchArticles } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import keywords from '@/lib/keywords.json';

export const revalidate = 3600;

export async function generateStaticParams() {
  return keywords.topics.map((topic) => ({
    topic: topic.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const topic = params.topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${topic} | AI News Hub`,
    description: `Latest news and developments about ${topic} in the field of artificial intelligence.`,
  };
}

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const topic = params.topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const articles = await fetchArticles(topic);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">{topic}</h1>
          <p className="text-gray-400">Latest developments and insights about {topic}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No articles found for this topic.</p>
          </div>
        )}
      </main>
    </div>
  );
}