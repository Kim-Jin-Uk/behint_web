import produce from '../util/produce';
import { AnyAction } from 'redux';
import { Draft } from 'immer';

export const initialState = {
  leftMenuList: [
    { key: '🌏 전체', value: 'all' },
    { key: '😁 예능', value: 'entertainment' },
    { key: '🚲 다큐멘터리', value: 'documentary' },
    { key: '🎞 영화', value: 'movie' },
    { key: '🎥 드라마', value: 'drama' },
    { key: '✏ 애니메이션', value: 'animation' },
    { key: '📣 광고', value: 'advertising' },
    { key: '🎵 음악', value: 'music' },
    { key: '👟 스포츠', value: 'sport' },
    { key: '🎮 게임', value: 'game' },
  ],
  selectMenu: 'all',
  rightTitleList: {
    all: '전체',
    entertainment: '예능',
    documentary: '다큐멘터리',
    movie: '영화',
    drama: '드라마',
    animation: '애니메이션',
    advertising: '광고',
    music: '음악',
    sport: '스포츠',
    game: '게임',
  },
};

export const SELECTED_MENU_CHANGE = 'SELECTED_MENU_CHANGE';

export default (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<any>) => {
    switch (action.type) {
      case SELECTED_MENU_CHANGE:
        draft.selectMenu = action.data;
        break;
      default:
        break;
    }
  });
