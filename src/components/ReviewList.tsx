import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { Review } from "@/types";

interface ReviewListProps {
  reviews: Review[] | undefined;
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {(reviews || []).map((review) => (
        <Card
          key={review.id}
          className="bg-card border border-border p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-primary sm:hidden" />
                <User size={16} className="text-primary hidden sm:block" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm sm:text-base">
                  {review.name}
                </div>
                <div className="flex items-center gap-1">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground flex-shrink-0">
              {new Date(review.timestamp).toLocaleDateString()}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-card-foreground leading-relaxed">
            {review.comment}
          </p>
        </Card>
      ))}
    </div>
  );
}
