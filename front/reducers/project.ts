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
  thumbnailUrl: null,
  videoUrl: null,
  thumbnailList: null,

  uploadVideoLoading: false,
  uploadVideoSuccess: false,
  uploadVideoError: null,

  uploadVideoFileLoading: false,
  uploadVideoFileSuccess: false,
  uploadVideoFileError: null,

  getThumbnailListLoading: false,
  getThumbnailListSuccess: false,
  getThumbnailListError: null,
};

export const UPLOAD_VIDEO_REQUEST = 'UPLOAD_VIDEO_REQUEST';
export const UPLOAD_VIDEO_SUCCESS = 'UPLOAD_VIDEO_SUCCESS';
export const UPLOAD_VIDEO_FAILURE = 'UPLOAD_VIDEO_FAILURE';

export const UPLOAD_VIDEO_FILE_REQUEST = 'UPLOAD_VIDEO_FILE_REQUEST';
export const UPLOAD_VIDEO_FILE_SUCCESS = 'UPLOAD_VIDEO_FILE_SUCCESS';
export const UPLOAD_VIDEO_FILE_FAILURE = 'UPLOAD_VIDEO_FILE_FAILURE';

export const GET_THUMBNAIL_LIST_REQUEST = 'GET_THUMBNAIL_LIST_REQUEST';
export const GET_THUMBNAIL_LIST_SUCCESS = 'GET_THUMBNAIL_LIST_SUCCESS';
export const GET_THUMBNAIL_LIST_FAILURE = 'GET_THUMBNAIL_LIST_FAILURE';

export default (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<any>) => {
    switch (action.type) {
      case UPLOAD_VIDEO_FILE_REQUEST:
        draft.uploadVideoFileLoading = true;
        draft.uploadVideoFileSuccess = false;
        draft.uploadVideoFileError = null;
        break;
      case UPLOAD_VIDEO_FILE_SUCCESS:
        draft.uploadVideoFileLoading = false;
        draft.uploadVideoFileSuccess = true;
        draft.uploadVideoFileError = null;
        draft.videoUrl = action.data;
        break;
      case UPLOAD_VIDEO_FILE_FAILURE:
        draft.uploadVideoFileLoading = false;
        draft.uploadVideoFileSuccess = false;
        draft.uploadVideoFileError = action.error;
        draft.videoUrl = null;
        break;

      case UPLOAD_VIDEO_REQUEST:
        draft.uploadVideoLoading = true;
        draft.uploadVideoSuccess = false;
        draft.uploadVideoError = null;
        break;
      case UPLOAD_VIDEO_SUCCESS:
        draft.uploadVideoLoading = false;
        draft.uploadVideoSuccess = true;
        draft.uploadVideoError = null;
        draft.thumbnailUrl = action.data;
        break;
      case UPLOAD_VIDEO_FAILURE:
        draft.uploadVideoLoading = false;
        draft.uploadVideoSuccess = false;
        draft.uploadVideoError = action.error;
        draft.thumbnailUrl = null;
        break;

      case GET_THUMBNAIL_LIST_REQUEST:
        draft.getThumbnailListLoading = true;
        draft.getThumbnailListSuccess = false;
        draft.getThumbnailListError = null;
        break;
      case GET_THUMBNAIL_LIST_SUCCESS:
        draft.getThumbnailListLoading = false;
        draft.getThumbnailListSuccess = true;
        draft.getThumbnailListError = null;
        draft.thumbnailList = action.data;
        break;
      case GET_THUMBNAIL_LIST_FAILURE:
        draft.getThumbnailListLoading = false;
        draft.getThumbnailListSuccess = false;
        draft.getThumbnailListError = action.error;
        draft.thumbnailList = null;
        break;

      default:
        break;
    }
  });
