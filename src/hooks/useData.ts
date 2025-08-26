import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Review, Testimonial } from "@/types";
import { apiService, ApiError } from "@/services/api";
import { toast } from "sonner";

interface UseDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for managing reviews with network simulation
export function useReviews() {
  const [reviews, setReviews] = useKV<Review[]>("user-reviews", []);
  const [state, setState] = useState<UseDataState<Review[]>>({
    data: null,
    loading: true,
    error: null,
  });

  // Fetch initial reviews on mount
  useEffect(() => {
    const fetchInitialReviews = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // If we have cached reviews, use them while fetching fresh data
        if (reviews && reviews.length > 0) {
          setState((prev) => ({ ...prev, data: reviews, loading: false }));
        }

        const fetchedReviews = await apiService.fetchReviews();

        // Merge with existing local reviews (simulate offline-first approach)
        const localReviews = reviews || [];
        const mergedReviews = [
          ...localReviews.filter(
            (local) =>
              !fetchedReviews.some((fetched) => fetched.id === local.id)
          ),
          ...fetchedReviews,
        ].sort((a, b) => b.timestamp - a.timestamp);

        setReviews(mergedReviews);
        setState({
          data: mergedReviews,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch reviews";
        setState({
          data: reviews || [],
          loading: false,
          error: errorMessage,
        });
        console.error("Failed to fetch reviews:", error);
        toast.error("Failed to load reviews. Using cached data.");
      }
    };

    fetchInitialReviews();
  }, []); // Run only on mount

  const submitReview = async (reviewData: Omit<Review, "id" | "timestamp">) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const newReview = await apiService.submitReview(reviewData);

      const updatedReviews = [newReview, ...(reviews || [])];
      setReviews(updatedReviews);
      setState((prev) => ({
        ...prev,
        data: updatedReviews,
        loading: false,
      }));

      toast.success("Review submitted successfully!");
      return newReview;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit review";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      toast.error("Failed to submit review. Please try again.");
      throw error;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await apiService.deleteReview(reviewId);

      const updatedReviews = (reviews || []).filter(
        (review) => review.id !== reviewId
      );
      setReviews(updatedReviews);
      setState((prev) => ({
        ...prev,
        data: updatedReviews,
      }));

      toast.success("Review deleted successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete review";
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    reviews: state.data || [],
    loading: state.loading,
    error: state.error,
    submitReview,
    deleteReview,
    refetch: () => {
      // Re-run the fetch effect
      setState((prev) => ({ ...prev, loading: true, error: null }));
    },
  };
}

// Hook for managing testimonials with network simulation
export function useTestimonials() {
  const [state, setState] = useState<UseDataState<Testimonial[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const testimonials = await apiService.fetchTestimonials();

        setState({
          data: testimonials,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch testimonials";
        setState({
          data: [],
          loading: false,
          error: errorMessage,
        });
        console.error("Failed to fetch testimonials:", error);
        toast.error("Failed to load testimonials.");
      }
    };

    fetchTestimonials();
  }, []);

  return {
    testimonials: state.data || [],
    loading: state.loading,
    error: state.error,
    refetch: () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
    },
  };
}

// Combined hook that merges testimonials with user reviews
export function useAllTestimonials() {
  const { reviews } = useReviews();
  const { testimonials, loading, error } = useTestimonials();

  const allTestimonials = [
    ...testimonials,
    ...(reviews || []).map((review) => ({
      id: review.id,
      name: review.name,
      role: "Community Member",
      rating: review.rating,
      comment: review.comment,
      avatar: "👤",
    })),
  ];

  return {
    testimonials: allTestimonials,
    loading,
    error,
  };
}
