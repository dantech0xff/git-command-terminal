import { useState } from "react";
import { Heart } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { Review } from "@/types";

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
  onCancel: () => void;
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      timestamp: Date.now(),
    };

    onSubmit(newReview);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <Card className="bg-card border border-border p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
        Share Your Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="text-xs sm:text-sm font-medium text-foreground mb-2 block">
            Your Name
          </label>
          <Input
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            placeholder="Enter your name"
            className="bg-background text-sm"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium text-foreground mb-2 block">
            Rating
          </label>
          <div className="flex items-center gap-1">
            <StarRating
              rating={reviewRating}
              onClick={setReviewRating}
              interactive
            />
            <span className="ml-2 text-xs sm:text-sm text-muted-foreground">
              {reviewRating} star{reviewRating !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs sm:text-sm font-medium text-foreground mb-2 block">
            Your Review
          </label>
          <Textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Tell us about your experience with Git Command Terminal..."
            className="bg-background min-h-[80px] sm:min-h-[100px] text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="text-sm px-3 py-2">
            Submit Review
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="text-sm px-3 py-2">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
