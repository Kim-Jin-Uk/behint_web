import { useRouter } from 'next/router';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';
import { SELECTED_MENU_CHANGE } from '../../reducers/main';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { projectItem, RootState } from '../../reducers';
import ProjectItem from '../../components/ProjectItem';

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
  const { projectList } = useSelector((state: RootState) => state.project);

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
        {projectList.map((v: projectItem) => {
          return (
            <>
              <ProjectItem
                projectItem={v}
                case={false}
                rankingNum={null}
              ></ProjectItem>
            </>
          );
        })}
      </MainLayout>
    </>
  );
};

export default Project;
