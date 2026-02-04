interface Props {
  className: string;
  style?: object;
  props?: any;
}

export default function FormBackground({
  children,
  className,
  style,
  props,
}: Props & React.PropsWithChildren) {
  return (
    <div
      className={` rounded-3xl  p-8 flex flex-col ${className}`}
      style={{ backgroundColor: '#030712', opacity: 1, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
