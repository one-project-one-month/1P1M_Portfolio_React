import type { IconProps } from '@radix-ui/themes';

function IconPieChart(props: IconProps) {
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
        d="M9.75 0.75C4.77944 0.75 0.75 4.77944 0.75 9.75C0.75 14.7206 4.77944 18.75 9.75 18.75C12.2353 18.75 14.4853 17.7426 16.114 16.114M9.75 0.75C14.7206 0.75 18.75 4.77944 18.75 9.75C18.75 12.2353 17.7426 14.4853 16.114 16.114M9.75 0.75V9.75L16.114 16.114"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default IconPieChart;
