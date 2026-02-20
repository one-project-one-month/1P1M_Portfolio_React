import type { IconProps } from '@radix-ui/themes';

function IconBarChart(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.75 7.17857V2.75C12.75 1.64543 11.8546 0.75 10.75 0.75H8.75C7.64543 0.75 6.75 1.64543 6.75 2.75V11.0357M12.75 7.17857V18.75M12.75 7.17857H16.75C17.8546 7.17857 18.75 8.074 18.75 9.17857V16.75C18.75 17.8546 17.8546 18.75 16.75 18.75H12.75M12.75 18.75H6.75M6.75 18.75V11.0357M6.75 18.75H2.75C1.64543 18.75 0.75 17.8546 0.75 16.75V13.0357C0.75 11.9311 1.64543 11.0357 2.75 11.0357H6.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default IconBarChart;
