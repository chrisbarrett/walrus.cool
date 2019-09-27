import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import emoji from 'node-emoji';
import cheerio from 'cheerio';
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

const matchArabicOrPersian = /[آ-ی]/;

const postProcessHtml = (html: string): string => {
  const $ = cheerio.load(emoji.emojify(html));

  // Apply lang tags and text-direction for Persian text.
  $('dt, li, dd, p').each((_i, element) => {
    const definition = $(element);
    const sample = definition.text().substring(0, 3);

    if (matchArabicOrPersian.test(sample)) {
      $(definition)
        .attr('dir', 'rtl')
        .attr('lang', 'fa');
    }
  });

  // Shift heading tags in generated HTML so we can use h1 for the page title.
  $('h1, h2, h3, h4, h5').each((_i, element) => {
    const heading = $(element);
    const name = heading.prop('tagName');
    const [, level] = name.match(/^h([\d]+)$/i);
    const updated = `h${parseInt(level, 10) + 1}`;
    heading.replaceWith(`<${updated}>${heading.html()}</${updated}>`);
  });
  return $.html();
};

const Template: React.SFC<PageTemplateProps> = ({ data }) => {
  const { meta, html } = data.orgContent;
  const date = meta.date && new Date(meta.date);
  const updatedHtml = postProcessHtml(html);

  return (
    <Layout>
      <article>
        <Styles>
          <h1>{meta.title}</h1>
          {date && <PostDate value={date} />}
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
        </Styles>
      </article>
    </Layout>
  );
};

export default Template;

const Styles = styled.div`
  & dl {
    line-height: 2em;
  }

  & dt:dir(rtl) {
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

  & .callout {
    font-size: 32pt;
    position: relative;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    border-top: 1px var(--border-color) solid;
    border-bottom: 1px var(--border-color) solid;
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
