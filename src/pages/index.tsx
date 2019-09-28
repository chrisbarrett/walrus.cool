import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostDate from '../components/post-date';
import SEO from '../components/seo';

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

const PostItem: React.SFC<OrgPost> = post => {
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

const Index: React.SFC<QueryProps> = ({ data }) => {
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
