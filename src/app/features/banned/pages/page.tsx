import Background from '@/components/background';
import { useParams } from 'react-router-dom';
import BannedStatusContainer from '../components/banned-status-container';

function page() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <Background>
      <BannedStatusContainer userId={userId ?? ''} />
    </Background>
  );
}

export default page;
