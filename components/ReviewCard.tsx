import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface ReviewCardProps {
  review: {
    userNickname: string;
    reviewSubmissionTime: string;
    reviewTitle: string;
    reviewText: string;
    rating: number;
    positiveFeedback: number;
    negativeFeedback: number;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{review.userNickname}</span>
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'stroke-current opacity-40'}`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-400">{review.reviewSubmissionTime}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{review.reviewTitle}</h3>
      <p className="text-gray-300 mb-4">{review.reviewText}</p>

      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{review.positiveFeedback}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ThumbsDown className="h-4 w-4" />
          <span>{review.negativeFeedback}</span>
        </div>
      </div>
    </div>
  );
}