"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar height='4px' color='var(--primary-clr-darker)' options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default LoadingProvider;
