import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';

import main from './main';
import project from './project';
import user from './user';

const rootReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload;
    }
    default: {
      const combinedReducer = combineReducers({
        main,
        project,
        user,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export type leftMenu = { key: string; value: string };
export type projectItem = {
  thumbnailImgUrl: string;
  category: string;
  title: string;
  locationName: string;
  userName: string;
  likeCount: number;
  viewCount: number;
};

export type representativeProject = {
  thumbnailImgUrl: string;
  position: string;
  title: string;
  locationName: string;
  userName: string;
  likeCount: number;
  viewCount: number;
};

export type commentaryItem = {
  id: number;
  title: string;
  createdAt: Date;
  contents: string;
};

export type profileContent = {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  position: string | null;
  detailContents: string | null;
  informationUrl: string | null;
  type: string;
};
