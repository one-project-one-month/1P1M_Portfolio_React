import { useDevProfileQuery } from '../../developers/hooks/use-dev-profile';
import FeaturedDevelopersSection from './dev-register';


const FeaturedDevelopersSectionContainer = () => {
  const { data, isLoading, error } = useDevProfileQuery({
    keyword: '',
    page: 0,
    size: 6,
    sortField: 'id',
    sortDirection: 'desc',
  });


  return (
<FeaturedDevelopersSection profiles={data?.data}  error={error}   loading={isLoading}/>
  )



}

export default FeaturedDevelopersSectionContainer 