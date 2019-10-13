import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostItem, { Props as PostProps } from '../components/post-item';
import styled from '@emotion/styled';
import SEO from '../components/seo';

interface Props {
  data: {
    allOrgContent: {
      edges: { node: PostProps }[];
    };
  };
}

const Index: React.SFC<Props> = ({ data }) => {
  const posts = data.allOrgContent.edges.map(({ node }) => (
    <PostItem key={node.id} {...node} />
  ));
  return (
    <Layout>
      <SEO />
      <HeadingStyles>
        <h1>All Posts</h1>
      </HeadingStyles>
      {posts}
    </Layout>
  );
};

const HeadingStyles = styled.div`
  margin-left: calc(35% + 2rem);
  & > h1 {
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
`;

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allOrgContent(sort: { fields: meta___date, order: DESC }) {
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
