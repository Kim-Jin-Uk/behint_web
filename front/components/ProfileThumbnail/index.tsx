import { MouseEventHandler } from 'react';
import styles from './styles.module.scss';

const ProfileThumbnail = (props: {
  size: number;
  borderRadius: number;
  image: string;
  onClick: MouseEventHandler<HTMLDivElement> | null;
}) => {
  const size = props.size ? props.size : 30;
  const borderRadius = props.borderRadius ? props.borderRadius : props.size;
  return (
    <div
      className={`${styles.component}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "url('" + props.image + "')",
        borderRadius: borderRadius,
      }}
      onClick={props.onClick!}
    ></div>
  );
};

export default ProfileThumbnail;
