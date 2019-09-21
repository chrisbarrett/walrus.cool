import * as React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';

interface OrgPost {
  fields: {
    slug: string;
  };
  meta: {
    title?: string;
    date?: string;
  };
}

interface Props {
  data: {
    allOrgContent: {
      edges: { node: OrgPost }[];
    };
  };
}

const StyledPost = styled.h3`
  margin-bottom: 0.2em;
`;

const PostItem = (post: OrgPost) => (
  <StyledPost>
    <h3>
      <Link to={post.fields.slug}>{post.meta.title}</Link>
    </h3>
    <small>{post.meta.date}</small>
  </StyledPost>
);

const Index: React.SFC<Props> = ({ data }) => {
  const posts = data.allOrgContent.edges.map(({ node }) => <PostItem {...node} />);
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
