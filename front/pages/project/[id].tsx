import { useRouter } from 'next/router';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';
import { SELECTED_MENU_CHANGE } from '../../reducers/main';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Project = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const effectiveUrlList = [
    'all',
    'entertainment',
    'documentary',
    'movie',
    'drama',
    'animation',
    'advertising',
    'music',
    'sport',
    'game',
  ];

  useEffect(() => {
    if (id) {
      if (!effectiveUrlList.includes(id as string)) {
        router.replace('/404');
      }
    }
  }, [id]);

  dispatch({
    type: SELECTED_MENU_CHANGE,
    data: id,
  });

  return (
    <>
      <Header></Header>
      <MainLayout selectedMenu={id as string}>
        <div>{id}</div>
      </MainLayout>
    </>
  );
};

export default Project;
