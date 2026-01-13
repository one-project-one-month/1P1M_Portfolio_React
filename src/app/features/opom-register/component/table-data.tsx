import Table from '@/app/features/opom-register/component/table';
import { getAllOpomRegister } from '@/app/features/opom-register/service/register-list';
import type { RegisterListProps } from '@/types/register';
import { useEffect, useState } from 'react';
export default function TableContainer() {
  const [data, setData] = useState<RegisterListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllOpomRegister();
        if (res.success) {
          setData(res.data.projects);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return <Table data={data} loading={loading} />;
}
