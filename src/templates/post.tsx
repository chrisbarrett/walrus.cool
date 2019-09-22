import React from 'react';
import { graphql } from 'gatsby';
import emoji from 'node-emoji';
import Layout from '../components/layout';
import PostDate from '../components/post-date';
import cheerio from 'cheerio';

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

const matchArabicOrPersian = /[آ-ی]/;

const Template: React.SFC<PageTemplateProps> = ({ data }) => {
  const { meta, html } = data.orgContent;
  const date = meta.date && new Date(meta.date);

  const $ = cheerio.load(emoji.emojify(html));

  // If there are arabic chars in the first few chars of a list item, make it
  // RTL.
  $('dt').each(function(_i, element) {
    const definition = $(element);
    const sample = definition.text().substring(0, 10);

    if (matchArabicOrPersian.test(sample)) {
      $(definition).attr('dir', 'rtl');
    }
  });

  return (
    <Layout>
      <article>
        <h1>{meta.title}</h1>
        {date && <PostDate value={date} />}
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: $.html() }} />
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
