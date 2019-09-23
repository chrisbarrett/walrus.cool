import React from 'react';
import styled from '@emotion/styled';
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
  $('dt, li').each(function(_i, element) {
    const definition = $(element);
    const sample = definition.text().substring(0, 5);

    if (matchArabicOrPersian.test(sample)) {
      $(definition)
        .attr('dir', 'rtl')
        .addClass('rtl');
    }
  });

  return (
    <Layout>
      <article>
        <Styles>
          <h1>{meta.title}</h1>
          {date && <PostDate value={date} />}
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: $.html() }} />
        </Styles>
      </article>
    </Layout>
  );
};

export default Template;

const Styles = styled.div`
  & .rtl {
    direction: rtl;
    text-align: right;
  }

  & dl {
    line-height: 2em;
  }

  & dt.rtl {
    float: right;
    clear: right;
  }

  & dd {
    margin-left: 0;
    color: var(--fg-dim-color);
    font-style: italic;
  }

  & dd li {
    max-width: 300px;
  }
`;

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
