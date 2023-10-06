"use client";

import LoadingProvider from "./LoadingProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import ToastProvider from "./ToastProvider";

export function Providers({ children }) {
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
