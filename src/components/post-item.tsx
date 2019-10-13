import * as React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';

export interface Props {
  id: string;
  fields: {
    slug: string;
  };
  meta: {
    title: string;
    date: string;
  };
}

const PostItem: React.SFC<Props> = post => {
  const date = moment(post.meta.date);
  return (
    <div className="post-item">
      {date && (
        <time dateTime={date.toISOString()}>{date.format('MMM D')}</time>
      )}
      <h3>
        <Link to={post.fields.slug}>{post.meta.title}</Link>
      </h3>
    </div>
  );
};

export default PostItem;
