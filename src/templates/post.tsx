import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    orgContent: {
      html: string;
      excerpt: string;
      meta: {
        title: string;
        date: string;
      };
    };
  };
}

const Template: React.SFC<PageTemplateProps> = props => {
  const post = props.data.orgContent;
  const { title, date } = post.meta;

  return (
    <Layout>
      <h1>{title}</h1>
      <small>{date}</small>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    orgContent(id: { eq: $id }) {
      html
      meta {
        title
        date
      }
    }
  }
`;
