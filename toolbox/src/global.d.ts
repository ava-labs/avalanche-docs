export { };

declare global {
  interface Window {
    avalanche?: {
      request: <T>(args: {
        method: string;
        params?: Record<string, unknown>;
        id?: number;
      }) => Promise<T>;
      on: (event: string, callback: (newChainId: string) => void) => void;
      removeListener: (event: string, callback: () => void) => void;
    }
  }
}
