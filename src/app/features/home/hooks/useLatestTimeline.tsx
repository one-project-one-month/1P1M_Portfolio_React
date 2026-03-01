import { useGetLatestTimeline } from './timeline.query';

type RegisterStatus = 'open' | 'closingSoon' | 'closed';

function useLatestTimeline() {
  const { data } = useGetLatestTimeline();

  const now = new Date();

  const getRegisterStatus = (deadline: Date): RegisterStatus => {
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) return 'closed';

    const hoursLeft = diff / (1000 * 60 * 60);

    if (hoursLeft <= 24) return 'closingSoon';

    return 'open';
  };

  const registerButtonStyle: Record<RegisterStatus, string> = {
    open: 'border-white text-white',
    closingSoon: 'border-yellow-400 text-yellow-400',
    closed: 'border-red-500 text-red-500 cursor-not-allowed',
  };

  const startTime = data?.data?.startDate
    ? new Date(data.data.startDate)
    : new Date();

  const registerStatus = getRegisterStatus(startTime);

  return { registerButtonStyle, registerStatus, startTime };
}

export default useLatestTimeline;
