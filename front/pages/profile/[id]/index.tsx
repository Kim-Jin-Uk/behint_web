import { useRouter } from 'next/router';
import ProfileWrapper from '../../../components/ProfileWrapper';
import Header from '../../../components/Header';

const ProfileByEmail = () => {
  return (
    <>
      <Header></Header>
      <ProfileWrapper type={'home'}></ProfileWrapper>
    </>
  );
};

export default ProfileByEmail;
