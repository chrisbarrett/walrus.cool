import * as React from 'react';
import styled from '@emotion/styled';

interface Props {
  value: Date;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'full',
} as any);

export const PostDate: React.SFC<Props> = ({ className, value }) => {
  const humanFormatted = dateFormatter.format(value);
  return (
    <div className={className}>
      <small>
        <time dateTime={value.toISOString()}>{humanFormatted}</time>
      </small>
    </div>
  );
};

export default styled(PostDate)`
  text-align: right;
  color: var(--foreground-dim-color);
  font-style: oblique;
`;
