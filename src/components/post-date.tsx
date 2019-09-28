import * as React from 'react';
import styled from '@emotion/styled';

interface Props {
  value: Date;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'full',
} as Intl.DateTimeFormatOptions);

export const PostDate: React.SFC<Props> = ({ className, value }) => {
  const humanFormatted = dateFormatter.format(value);
  return (
    <div className={className}>
      <time dateTime={value.toISOString()}>{humanFormatted}</time>
    </div>
  );
};

export default styled(PostDate)`
  color: var(--fg-dim-color);
  font-style: oblique;
`;
