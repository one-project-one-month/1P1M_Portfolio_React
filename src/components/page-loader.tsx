import { Suspense, type ComponentType, type FC } from 'react';

export default function PageLoader<P extends object>(
  Component: ComponentType<P>,
): FC<P> {
  const WrappedComponent: FC<P> = (props) => {
    return (
      <Suspense fallback={<DefaultLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };

  // for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `withPageLoader(${displayName})`;

  return WrappedComponent;
}

const DefaultLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <p className="text-sm font-medium animate-pulse">Loading...</p>
  </div>
);
