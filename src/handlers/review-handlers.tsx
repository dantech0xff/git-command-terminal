import { Review } from "@/types";

interface UseReviewHandlersProps {
  submitReview: (review: { name: string; rating: number; comment: string }) => Promise<void>;
}

export function useReviewHandlers({ submitReview }: UseReviewHandlersProps) {
  const handleReviewSubmit = async (review: Review) => {
    try {
      await submitReview({
        name: review.name,
        rating: review.rating,
        comment: review.comment,
      });
    } catch (error) {
      // Error is already handled in the hook
      console.error("Failed to submit review:", error);
    }
  };

  return {
    handleReviewSubmit,
  };
}