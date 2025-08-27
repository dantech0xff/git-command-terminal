import { useState } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { LoadingState, ErrorState } from "./LoadingStates";
import { Review } from "@/types";
import { appStrings } from "@/config/strings";

interface ReviewsSectionProps {
  reviews: Review[] | undefined;
  reviewsLoading: boolean;
  reviewsError: string | null;
  onSubmitReview: (review: Review) => Promise<void>;
}

export function ReviewsSection({
  reviews,
  reviewsLoading,
  reviewsError,
  onSubmitReview,
}: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = async (review: Review) => {
    try {
      await onSubmitReview(review);
      setShowReviewForm(false);
    } catch (error) {
      // Error is already handled in the parent component
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
            {appStrings.sections.reviews.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {appStrings.sections.reviews.subtitle}
          </p>
        </div>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center gap-2 text-sm px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          {appStrings.ui.buttons.leaveReview}
        </button>
      </div>

      {showReviewForm && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {reviewsLoading ? (
        <LoadingState
          title={appStrings.loading.reviews.title}
          description={appStrings.loading.reviews.description}
        />
      ) : reviewsError ? (
        <ErrorState
          title={appStrings.errors.reviews.title}
          description={reviewsError}
        />
      ) : (
        <ReviewList reviews={reviews || []} />
      )}
    </div>
  );
}
