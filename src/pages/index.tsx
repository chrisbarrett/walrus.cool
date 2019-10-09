import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostItem, { Props as PostProps } from '../components/post-item';
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
      <SEO title="home" />
      {posts}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
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
