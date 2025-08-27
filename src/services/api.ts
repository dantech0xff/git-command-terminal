import { Review, Testimonial } from "@/types";
import {
  getNetworkDelay,
  shouldSimulateError,
  logNetworkOperation,
  networkConfig,
} from "@/config/network";
import { appStrings } from "@/config/strings";

// Mock data that was previously in App.tsx
const mockReviews: Review[] = [
  //   {
  //     id: "demo-1",
  //     name: "Jordan Smith",
  //     rating: 5,
  //     comment:
  //       "This is exactly what I needed to finally understand Git! The terminal interface makes it feel like real practice.",
  //     timestamp: Date.now() - 86400000 * 2, // 2 days ago
  //   },
  //   {
  //     id: "demo-2",
  //     name: "Taylor Johnson",
  //     rating: 4,
  //     comment:
  //       "Great tool for learning. Would love to see more advanced Git workflows covered in the future.",
  //     timestamp: Date.now() - 86400000 * 5, // 5 days ago
  //   },
];

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dan Tech",
    role: appStrings.community.roles.juniorDeveloper,
    rating: 5,
    comment:
      "This terminal helped me learn Git commands so much faster! The interactive approach makes it easy to understand what each command does.",
    avatar: "🗽",
  },
  {
    id: "2",
    name: "0xFF",
    role: appStrings.community.roles.student,
    rating: 5,
    comment:
      "Perfect for beginners! I went from being scared of Git to confidently using it in my projects. The command suggestions are brilliant.",
    avatar: "👨‍🎓",
  },
  {
    id: "3",
    name: "Huu Danh Tran",
    role: appStrings.community.roles.bootcampGraduate,
    rating: 4,
    comment:
      "Great learning tool. The terminal interface feels authentic and the explanations are clear and concise.",
    avatar: "🧑‍💻",
  },
];

// Simulate network delay with configurable timing
const simulateNetworkDelay = (operation: string = "default"): Promise<void> => {
  const delay = getNetworkDelay();
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Enhanced error simulation with specific operation context
const checkForSimulatedError = (
  operation: keyof typeof networkConfig.errorRates
): void => {
  if (shouldSimulateError(operation)) {
    throw new Error(`Network error during ${operation}`);
  }
};

// API functions that simulate network requests
export const apiService = {
  // Fetch initial reviews (simulates GET /api/reviews)
  async fetchReviews(): Promise<Review[]> {
    const startTime = Date.now();
    let error: Error | undefined;

    try {
      await simulateNetworkDelay(appStrings.apiOperations.fetchReviews);
      checkForSimulatedError(appStrings.apiOperations.fetchReviews);

      const result = [...mockReviews];
      logNetworkOperation(
        appStrings.apiOperations.fetchReviews,
        Date.now() - startTime
      );
      return result;
    } catch (err) {
      error =
        err instanceof Error
          ? err
          : new Error(appStrings.errors.network.unknownError);
      logNetworkOperation(
        appStrings.apiOperations.fetchReviews,
        Date.now() - startTime,
        error
      );
      throw error;
    }
  },

  // Fetch testimonials (simulates GET /api/testimonials)
  async fetchTestimonials(): Promise<Testimonial[]> {
    const startTime = Date.now();
    let error: Error | undefined;

    try {
      await simulateNetworkDelay(appStrings.apiOperations.fetchTestimonials);
      checkForSimulatedError(appStrings.apiOperations.fetchTestimonials);

      const result = [...mockTestimonials];
      logNetworkOperation(
        appStrings.apiOperations.fetchTestimonials,
        Date.now() - startTime
      );
      return result;
    } catch (err) {
      error =
        err instanceof Error
          ? err
          : new Error(appStrings.errors.network.unknownError);
      logNetworkOperation(
        appStrings.apiOperations.fetchTestimonials,
        Date.now() - startTime,
        error
      );
      throw error;
    }
  },

  // Submit a new review (simulates POST /api/reviews)
  async submitReview(
    review: Omit<Review, "id" | "timestamp">
  ): Promise<Review> {
    const startTime = Date.now();
    let error: Error | undefined;

    try {
      // Use POST delay configuration
      const delay = getNetworkDelay("post");
      await new Promise((resolve) => setTimeout(resolve, delay));
      checkForSimulatedError(appStrings.apiOperations.submitReview);

      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      // In a real app, this would be handled by the backend
      mockReviews.unshift(newReview);

      logNetworkOperation(
        appStrings.apiOperations.submitReview,
        Date.now() - startTime
      );
      return newReview;
    } catch (err) {
      error =
        err instanceof Error
          ? err
          : new Error(appStrings.errors.network.unknownError);
      logNetworkOperation(
        appStrings.apiOperations.submitReview,
        Date.now() - startTime,
        error
      );
      throw error;
    }
  },

  // Delete a review (simulates DELETE /api/reviews/:id)
  async deleteReview(reviewId: string): Promise<void> {
    const startTime = Date.now();
    let error: Error | undefined;

    try {
      await simulateNetworkDelay(appStrings.apiOperations.deleteReview);
      checkForSimulatedError(appStrings.apiOperations.deleteReview);

      const index = mockReviews.findIndex((review) => review.id === reviewId);
      if (index > -1) {
        mockReviews.splice(index, 1);
      }

      logNetworkOperation(
        appStrings.apiOperations.deleteReview,
        Date.now() - startTime
      );
    } catch (err) {
      error =
        err instanceof Error
          ? err
          : new Error(appStrings.errors.network.unknownError);
      logNetworkOperation(
        appStrings.apiOperations.deleteReview,
        Date.now() - startTime,
        error
      );
      throw error;
    }
  },

  // Update a review (simulates PUT /api/reviews/:id)
  async updateReview(
    reviewId: string,
    updates: Partial<Review>
  ): Promise<Review> {
    const startTime = Date.now();
    let error: Error | undefined;

    try {
      await simulateNetworkDelay(appStrings.apiOperations.updateReview);
      checkForSimulatedError(appStrings.apiOperations.updateReview);

      const reviewIndex = mockReviews.findIndex(
        (review) => review.id === reviewId
      );
      if (reviewIndex === -1) {
        throw new Error(appStrings.terminal.errors.reviewNotFound);
      }

      mockReviews[reviewIndex] = { ...mockReviews[reviewIndex], ...updates };
      const result = mockReviews[reviewIndex];

      logNetworkOperation(
        appStrings.apiOperations.updateReview,
        Date.now() - startTime
      );
      return result;
    } catch (err) {
      error =
        err instanceof Error
          ? err
          : new Error(appStrings.errors.network.unknownError);
      logNetworkOperation(
        appStrings.apiOperations.updateReview,
        Date.now() - startTime,
        error
      );
      throw error;
    }
  },
};

// Types for API responses
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
