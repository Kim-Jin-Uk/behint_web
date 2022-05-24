import { useEffect, useRef } from 'react';

const useIntersectionObservationEdit = (setActiveId) => {
  const contentRef = useRef({});

  useEffect(() => {
    const callback = (observedContent) => {
      observedContent.forEach((content) => {
        contentRef.current[content.target.id] = content;
      });

      const visibleContent = Object.values(contentRef.current).filter(
        (content) => content.isIntersecting,
      );

      const idToIndex = [
        '기본정보',
        '자기소개',
        '근무경험',
        '콘텐츠제작',
        '보유능력',
        '학력',
        '수상',
        '채널',
      ];
      visibleContent.length > 0 &&
        setActiveId(idToIndex.indexOf(visibleContent[0].target.id));
    };
    //1. 새로운 observer 설정
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-30% 0px',
      threshold: [0, 0.5, 1],
    });

    //2. DOM 요소 찾고 Observer달아주기
    const contents = [
      document.querySelector('#기본정보'),
      document.querySelector('#자기소개'),
      document.querySelector('#근무경험'),
      document.querySelector('#콘텐츠제작'),
      document.querySelector('#보유능력'),
      document.querySelector('#학력'),
      document.querySelector('#수상'),
      document.querySelector('#채널'),
    ];

    contents.forEach((content) => observer.observe(content));

    //3. 언 마운트시 옵저버 해제
    return () => observer.disconnect();
  }, [setActiveId]);
};

export default useIntersectionObservationEdit;
