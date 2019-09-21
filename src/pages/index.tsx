import * as React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
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
      edges: Array<{ node: OrgPost }>;
    };
  };
}

const PostItem = (node: OrgPost) => {
  const title = node.meta.title || node.fields.slug;
  const date = node.meta.date || 'no date';
  return (
    <div>
      <h3 style={{ marginBottom: '0.2em' }}>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <small>{date}</small>
    </div>
  );
};

const Preamble: React.SFC = () => (
  <>
    <h1>Hi org-mode people</h1>
    <p>Welcome to your new org-mode based Gatsby site.</p>
  </>
);

const BlogIndex: React.SFC<Props> = ({ data }) => {
  const posts = data.allOrgContent.edges.map(({ node }) => <PostItem {...node} />);
  return (
    <Layout>
      <Preamble />
      {posts}
    </Layout>
  );
};

export default BlogIndex;

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
