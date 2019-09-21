import React from 'react';
import { graphql } from 'gatsby';
import emoji from 'node-emoji';
import Layout from '../components/layout';
import PostDate from '../components/post-date';

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

const Template: React.SFC<PageTemplateProps> = ({ data }) => {
  const { meta, html } = data.orgContent;
  const processedHtml = emoji.emojify(html);
  const date = meta.date && new Date(meta.date);

  return (
    <Layout>
      <article>
        <h1>{meta.title}</h1>
        {date && <PostDate value={date} />}
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </article>
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
