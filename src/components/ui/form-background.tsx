function FormBackground({
  children,
  className = '',
  style = {},
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={` rounded-3xl p-4 md:p-8 flex flex-col ${className}`}
      style={{ backgroundColor: '#030712', opacity: 1, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default FormBackground;
