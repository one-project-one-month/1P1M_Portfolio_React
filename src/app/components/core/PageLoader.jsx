import React, { Suspense } from "react";

export default function PageLoader(Component) {
  return function WrappedComponent(props) {
    return (
      <Suspense fallback={<>Loading...</>}>
        <Component {...props} />
      </Suspense>
    );
  };
}
