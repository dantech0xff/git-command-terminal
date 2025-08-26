/**
 * Utility functions for environment detection and development helpers
 */

/**
 * Check if the application is running in localhost/development environment
 * @returns true if running on localhost or 127.0.0.1
 */
export const isLocalhost = (): boolean => {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") || // Local network
    hostname.endsWith(".local")
  ); // Local domain
};

/**
 * Check if the application is running in development mode
 * Checks both NODE_ENV and localhost detection
 * @returns true if in development environment
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV || isLocalhost();
};

/**
 * Check if the application is running in production mode
 * @returns true if in production environment
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD && !isLocalhost();
};

/**
 * Get the current environment name
 * @returns 'development', 'production', or 'localhost'
 */
export const getEnvironment = ():
  | "development"
  | "production"
  | "localhost" => {
  if (isLocalhost()) return "localhost";
  if (import.meta.env.PROD) return "production";
  return "development";
};

/**
 * Log only in development/localhost environments
 * @param message - Message to log
 * @param data - Optional data to log
 */
export const devLog = (message: string, ...data: any[]): void => {
  if (isDevelopment()) {
    console.log(`[DEV] ${message}`, ...data);
  }
};

/**
 * Warning log for development environments
 * @param message - Warning message
 * @param data - Optional data to log
 */
export const devWarn = (message: string, ...data: any[]): void => {
  if (isDevelopment()) {
    console.warn(`[DEV WARNING] ${message}`, ...data);
  }
};

/**
 * Error log for development environments
 * @param message - Error message
 * @param data - Optional data to log
 */
export const devError = (message: string, ...data: any[]): void => {
  if (isDevelopment()) {
    console.error(`[DEV ERROR] ${message}`, ...data);
  }
};
