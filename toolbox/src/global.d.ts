export { };

declare global {
  interface Window {
    avalanche?: {
      request: <T>(args: {
        method: string;
        params?: Record<string, unknown> | unknown[];
        id?: number;
      }) => Promise<T>;
      on<T>(event: string, callback: (data: T) => void): void;
      removeListener(event: string, callback: () => void): void;
    }
  }
}
