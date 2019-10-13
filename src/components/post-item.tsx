import * as React from 'react';
import { Link } from 'gatsby';
import PostDate from './post-date';
import styled from '@emotion/styled';

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

const Styles = styled.div`
  display: flex;
  & .post-date {
    order: 1;
    width: 35%;
    text-align: right;
    margin-top: 0.25em;
    padding-right: 2rem;
  }
  & h3 {
    vertical-align: center;
    display: inline;
    margin-top: 0;
    order: 2;
  }
`;

const PostItem: React.SFC<Props> = post => {
  const date = post.meta.date && new Date(post.meta.date);
  return (
    <Styles>
      {date && <PostDate className="post-date" value={date} />}
      <h3>
        <Link to={post.fields.slug}>{post.meta.title}</Link>
      </h3>
    </Styles>
  );
};

export default PostItem;
