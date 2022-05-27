import produce from '../util/produce';
import { AnyAction } from 'redux';
import { Draft } from 'immer';

export const initialState = {
  projectList: [
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
  ],
  projectManagementList: [
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title:
        '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName:
        '식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁',
      userName:
        'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title:
        '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName:
        '식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁',
      userName:
        'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title:
        '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName:
        '식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁',
      userName:
        'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title:
        '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName:
        '식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁식탁',
      userName:
        'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: true },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: true },
        { position: '소니 DSLR', allow: false },
      ],
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      category: '음악, 예능, 스포츠',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
      createdAt: new Date('2022.4.8'),
      position: '기획',
      updatedAt: new Date('2022.4.14'),
      invitedAt: new Date('2022.4.10'),
      participation: [
        { position: 'logic pro logic pro logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
        { position: '소니 DSLR', allow: false },
        { position: 'logic pro', allow: false },
      ],
    },
  ],
};
//
// export const SELECTED_MENU_CHANGE = 'SELECTED_MENU_CHANGE';

export default (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<any>) => {
    switch (action.type) {
      // case SELECTED_MENU_CHANGE:
      //   draft.selectMenu = action.data;
      //   break;
      default:
        break;
    }
  });
