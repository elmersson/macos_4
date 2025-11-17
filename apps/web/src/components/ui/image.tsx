import type * as React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function Image(props: ImageProps) {
  const { fallbackSrc, onError, alt, ...rest } = props;

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc) {
      event.currentTarget.src = fallbackSrc;
    }
    if (onError) {
      onError(event);
    }
  };

  return (
    <img decoding="async" loading="lazy" {...rest} onError={handleError} />
  );
}

export const ImageComponent = {
  Root: Image,
};

export default Image;
