import styles from './style.module.scss';
import { useRouter } from 'next/router';
import Header from '../../../components/Header';
const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <div>{id}</div>
    </>
  );
};

export default ProjectDetail;
