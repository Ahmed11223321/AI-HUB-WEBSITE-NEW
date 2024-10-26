import { Article } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isFeatured = variant === 'featured';
  const height = isFeatured ? 'h-[400px]' : 'h-[300px]';

  return (
    <div className={`relative ${height} rounded-lg overflow-hidden group`}>
      <Image
        src={article.image}
        alt={article.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {article.badges.map((badge, index) => (
          <Badge key={index} variant="secondary">{badge}</Badge>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-gray-200">
            {article.rating.toFixed(1)} ({article.numberOfReviews} reviews)
          </span>
        </div>
        
        <h3 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-bold mb-2 line-clamp-2`}>
          {article.title}
        </h3>
        
        {isFeatured && (
          <p className="text-gray-200 mb-4 line-clamp-2">{article.description}</p>
        )}

        <div className="flex items-center justify-between">
          <Link href={`/articles/${article.id}`}>
            <Button variant={isFeatured ? "default" : "outline"} size={isFeatured ? "default" : "sm"}>
              Read More
            </Button>
          </Link>
          
          <div className="text-sm text-gray-300">
            By {article.manufacturer}
          </div>
        </div>
      </div>
    </div>
  );
}