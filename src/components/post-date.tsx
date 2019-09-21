import * as React from 'react';

interface Props {
  value: string | undefined;
}

export const PostDate: React.SFC<Props> = ({ value }) => (
  <small>{value || 'undated'}</small>
);

export default PostDate;
