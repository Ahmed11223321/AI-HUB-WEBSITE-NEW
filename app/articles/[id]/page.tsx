import { fetchArticleById, fetchArticleReviews } from '@/lib/api';
import { ReviewCard } from '@/components/ReviewCard';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const [article, reviewsData] = await Promise.all([
    fetchArticleById(params.id),
    fetchArticleReviews(params.id)
  ]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.badges.map((badge, index) => (
              <Badge key={index} variant="secondary">{badge}</Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center space-x-4 mb-8 text-gray-400">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{article.manufacturer}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span>{article.rating.toFixed(1)} ({article.numberOfReviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Category: {article.category}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: article.longDescription }} />
            
            {article.productHighlights.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {article.productHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {reviewsData.customerReviews.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Reviews ({reviewsData.customerReviews.length})
              </h2>
              <div className="space-y-6">
                {reviewsData.customerReviews.map((review) => (
                  <ReviewCard key={review.reviewId} review={review} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}