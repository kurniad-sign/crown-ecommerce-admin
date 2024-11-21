import Image from 'next/image';
import { CSSProperties, ReactNode, useMemo } from 'react';

import { Text } from '~/components/atom';

type EmptyStateProps = {
  imageSrc: string;
  imageStyle?: CSSProperties;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
};

export function EmptyStates(props: EmptyStateProps) {
  const { imageSrc, imageStyle, title, description, children } = props;

  const renderTitle = useMemo(
    () =>
      typeof title === 'string' ? (
        <Text component="div" weight="semibold">
          {title}
        </Text>
      ) : (
        title
      ),
    [title]
  );

  const renderDescription = useMemo(
    () =>
      typeof description === 'string' ? (
        <Text
          component="div"
          align="center"
          className="text-office-brown-600"
          size="small"
        >
          {description}
        </Text>
      ) : (
        description
      ),
    [description]
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      <div style={imageStyle} className="relative">
        <Image
          fill
          src={imageSrc}
          alt="Empty Illustration State"
          className="object-cover"
        />
      </div>
      {renderTitle ? renderTitle : null}
      {renderDescription ? renderDescription : null}
      {children}
    </div>
  );
}
