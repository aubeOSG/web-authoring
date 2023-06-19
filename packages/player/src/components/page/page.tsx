import React, { useEffect, useRef } from 'react';
import { PageProps } from './page.types';
import getSlide from './get-slide';
import { BoundaryError } from '../';

export const Page = ({
  slides,
  templates,
  slideId,
  lesson,
  passingThreshold,
  controller,
  ...props
}: PageProps) => {
  const lastSlideNodeRef = useRef<HTMLDivElement>(null);
  const lastSlideIdx = slides.length - 1;

  useEffect(() => {
    if (lastSlideNodeRef.current) {
      lastSlideNodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastSlideNodeRef.current]);

  return (
    <BoundaryError>
      {slides.map((slide, idx) => {
        const SlideComp = getSlide({
          slide,
          parentId: props.id || '',
          idx,
          templates,
          controller,
          lesson,
          passingThreshold,
        });

        if (lastSlideIdx === idx) {
          return (
            <div key={idx} ref={lastSlideNodeRef}>
              <SlideComp />
            </div>
          );
        }

        return (
          <div key={idx}>
            <SlideComp />
          </div>
        );
      })}
    </BoundaryError>
  );
};

export default Page;
