import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { networkConfig } from "@/config/network";
import { apiService } from "@/services/api";
import { LoadingSpinner } from "./LoadingStates";
import { appStrings } from "@/config/strings";

export function NetworkDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const runNetworkTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    addResult("Starting network simulation tests...");

    try {
      // Test 1: Fetch testimonials
      addResult("🔄 Fetching testimonials...");
      const testimonials = await apiService.fetchTestimonials();
      addResult(`✅ Fetched ${testimonials.length} testimonials`);

      // Test 2: Fetch reviews
      addResult("🔄 Fetching reviews...");
      const reviews = await apiService.fetchReviews();
      addResult(`✅ Fetched ${reviews.length} reviews`);

      // Test 3: Submit a test review
      addResult("🔄 Submitting test review...");
      const testReview = await apiService.submitReview({
        name: "Test User",
        rating: 5,
        comment: "This is a test review to demonstrate network simulation.",
      });
      addResult(`✅ Submitted review with ID: ${testReview.id}`);

      addResult("🎉 All network tests completed successfully!");
    } catch (error) {
      addResult(
        `❌ Network test failed: ${
          error instanceof Error
            ? error.message
            : appStrings.errors.network.unknownError
        }`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const toggleDemoMode = () => {
    // Toggle force errors for demo purposes
    networkConfig.dev.forceErrors = !networkConfig.dev.forceErrors;
    addResult(
      networkConfig.dev.forceErrors
        ? "🚫 Enabled error simulation mode"
        : "✅ Disabled error simulation mode"
    );
  };

  const toggleSlowNetwork = () => {
    // Toggle slow network for demo purposes
    networkConfig.dev.forceSlowNetwork = !networkConfig.dev.forceSlowNetwork;
    addResult(
      networkConfig.dev.forceSlowNetwork
        ? "🐌 Enabled slow network mode (2-5s delays)"
        : "⚡ Disabled slow network mode"
    );
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          variant="outline"
          size="sm"
          className="bg-background/90 backdrop-blur">
          🌐 Network Demo
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="bg-background/95 backdrop-blur border shadow-lg">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">
              Network Simulation Demo
            </h3>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0">
              ✕
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Simulates real network delays (200-800ms)</div>
            <div>• Random error simulation (3-8% chance)</div>
            <div>• Console logging of API calls</div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={toggleDemoMode}
                variant="outline"
                size="sm"
                className="text-xs">
                {networkConfig.dev.forceErrors
                  ? "🚫 Force Errors"
                  : "✅ Normal Mode"}
              </Button>
              <Button
                onClick={toggleSlowNetwork}
                variant="outline"
                size="sm"
                className="text-xs">
                {networkConfig.dev.forceSlowNetwork
                  ? "🐌 Slow Network"
                  : "⚡ Fast Network"}
              </Button>
            </div>

            <Button
              onClick={runNetworkTest}
              disabled={isRunning}
              className="w-full text-sm">
              {isRunning ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Running Tests...
                </>
              ) : (
                "🧪 Run Network Tests"
              )}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-muted/50 rounded p-2 max-h-32 overflow-y-auto">
              <div className="text-xs font-mono space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-muted-foreground">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
