import { Flex } from '@radix-ui/themes';

const PortfolioCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full flex flex-col bg-[#FFFFFF17] backdrop-blur-md rounded-[12px] p-[24px] border border-[#FFFFFF33] box-border shadow-sm gap-4">
      <div className="h-[145px] rounded-xl bg-white/20" />

      <div className="flex flex-col gap-2">
        <div className="h-3 w-3/6 rounded bg-white/15" />
        <Flex
          align="center"
          justify="between"
          className="text-[#D1D5DC] font-light leading-5 text-sm font-sans mt-3"
        >
          <div className="h-3 w-2/6 rounded bg-white/15" />
          <div className="h-3 w-2/6 rounded bg-white/15" />
        </Flex>
        <Flex
          align="center"
          justify="between"
          className="text-[#D1D5DC] font-light leading-5 text-sm font-sans"
        >
          <div className="h-3 w-2/6 rounded bg-white/15" />
          <div className="flex -space-x-2">
            {Array.from({ length: 6 })
              ?.slice(0, 3)
              .map(() => (
                <div className="h-8 bg-white/15 w-8 rounded-full border-2 border-[#111827] object-cover" />
              ))}
          </div>
        </Flex>
      </div>

      <div className="flex items-center justify-between">
        <div className="h-7 w-20 rounded-lg bg-white/15" />
        <Flex gap="4">
          <div className="h-5 w-8 rounded bg-white/15" />
          <div className="h-5 w-8 rounded bg-white/15" />
          <div className="h-5 w-8 rounded bg-white/15" />
        </Flex>
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;
