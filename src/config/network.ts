// Configuration for network simulation
import { isLocalhost } from "@/utils/environment";

export const networkConfig = {
  // Enable/disable network simulation
  enabled: true,

  // Network delay ranges (in milliseconds)
  delays: {
    min: 200,
    max: 800,

    // Special delays for specific operations
    post: { min: 500, max: 1200 }, // Longer for POST requests
    error: { min: 100, max: 300 }, // Shorter for errors
  },

  // Error simulation rates (0.0 to 1.0)
  errorRates: {
    fetchReviews: 0.05, // 5% chance
    fetchTestimonials: 0.03, // 3% chance
    submitReview: 0.08, // 8% chance
    deleteReview: 0.05, // 5% chance
    updateReview: 0.05, // 5% chance
  },

  // When to show network status indicator
  ui: {
    showLoadingAfter: 300, // Show loading after 300ms
    hideSuccessAfter: 2000, // Hide success after 2s
    autoRetryDelay: 3000, // Auto retry after 3s
  },

  // Development settings - only active in localhost
  dev: {
    logRequests: isLocalhost(), // Only log in localhost
    forceErrors: false, // Force all requests to fail (for testing)
    forceSlowNetwork: false, // Force slow network (2-5s delays)
  },
};

// Function to get delay based on operation type
export function getNetworkDelay(
  operation: keyof typeof networkConfig.delays = "min"
): number {
  if (!networkConfig.enabled) return 0;

  const config = networkConfig.delays;
  const delay = config[operation] || { min: config.min, max: config.max };

  if (networkConfig.dev.forceSlowNetwork) {
    return Math.random() * (5000 - 2000) + 2000; // 2-5 seconds
  }

  if (typeof delay === "object") {
    return Math.random() * (delay.max - delay.min) + delay.min;
  }

  return Math.random() * (config.max - config.min) + config.min;
}

// Function to check if an error should occur
export function shouldSimulateError(
  operation: keyof typeof networkConfig.errorRates
): boolean {
  if (!networkConfig.enabled) return false;
  if (networkConfig.dev.forceErrors) return true;

  const errorRate = networkConfig.errorRates[operation] || 0;
  return Math.random() < errorRate;
}

// Function to log network operations (for development)
export function logNetworkOperation(
  operation: string,
  duration: number,
  error?: Error
): void {
  if (!networkConfig.dev.logRequests) return;

  const status = error ? "❌ FAILED" : "✅ SUCCESS";
  const message = error ? error.message : "OK";

  console.group(`🌐 ${operation} - ${status}`);
  console.log(`Duration: ${Math.round(duration)}ms`);
  console.log(`Result: ${message}`);
  console.groupEnd();
}
