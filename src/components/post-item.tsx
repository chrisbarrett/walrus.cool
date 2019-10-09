import * as React from 'react';
import { Link } from 'gatsby';
import PostDate from './post-date';

export interface Props {
  id: string;
  fields: {
    slug: string;
  };
  meta: {
    title?: string;
    date?: string;
  };
}

const PostItem: React.SFC<Props> = post => {
  const date = post.meta.date && new Date(post.meta.date);
  return (
    <>
      <h3>
        <Link to={post.fields.slug}>{post.meta.title}</Link>
      </h3>
      {date && <PostDate value={date} />}
    </>
  );
};

export default PostItem;
