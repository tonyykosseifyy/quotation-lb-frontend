"use client";

import LoadingProvider from "./LoadingProvider";
import ToastProvider from "./ToastProvider";

export function Providers({ children }) {
  return (
    <ToastProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </ToastProvider>
  );
}
