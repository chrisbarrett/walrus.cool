import * as React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import PostDate from '../components/post-date';
import './index.css';

interface OrgPost {
  id: string;
  fields: {
    slug: string;
  };
  meta: {
    title?: string;
    date?: string;
  };
}

interface QueryProps {
  data: {
    allOrgContent: {
      edges: { node: OrgPost }[];
    };
  };
}

const PostItem = styled((post: OrgPost) => {
  const date = post.meta.date && new Date(post.meta.date);
  return (
    <>
      <h3>
        <Link to={post.fields.slug}>{post.meta.title}</Link>
      </h3>
      {date && <PostDate value={date} />}
    </>
  );
})`
  margin-bottom: 4em;
`;

const Index: React.SFC<QueryProps> = ({ data }) => {
  const posts = data.allOrgContent.edges.map(({ node }) => (
    <PostItem key={node.id} {...node} />
  ));
  return <Layout>{posts}</Layout>;
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allOrgContent {
      edges {
        node {
          id
          fields {
            slug
          }
          meta {
            title
            date
          }
        }
      }
    }
  }
`;
