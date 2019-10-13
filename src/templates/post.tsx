import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { graphql } from 'gatsby';
import emoji from 'node-emoji';
import cheerio from 'cheerio';
import Layout from '../components/layout';
import SEO from '../components/seo';

interface Props {
  pageContext: {
    rtlLang: string;
  };
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

const matchArabicOrFarsi = /[آ-ی۰-۹]/;

const isArabicOrFarsi = (element: Cheerio): boolean => {
  const sample = element.text().substring(0, 3);
  return matchArabicOrFarsi.test(sample);
};

const postProcessHtml = (html: string, rtlLang: string): string => {
  const $ = cheerio.load(emoji.emojify(html));

  // Guess the text direction and language of block elements.

  $('p, ol, ul, dl, li, dt, dd, td').each((_, it) => {
    const arabicLike = isArabicOrFarsi($(it));
    const lang = arabicLike ? rtlLang : 'en';
    const dir = arabicLike ? 'rtl' : 'ltr';

    $(it)
      .addClass(dir)
      .attr('dir', dir)
      .attr('lang', lang);
  });

  // HACK: Add a block element to dt's so we have something to align bullets to.

  $('dt').each((_, it) => {
    $(it).prepend('<div class="bullet-hack" />');
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

const Template: React.SFC<Props> = ({ data, pageContext }) => {
  const { meta, html } = data.orgContent;
  const date = moment(meta.date);
  const updatedHtml = postProcessHtml(html, pageContext.rtlLang);

  return (
    <Layout noHeader={true}>
      <SEO title={meta.title} />
      <article>
        <Styles>
          <header>
            <h1>{meta.title}</h1>
            <time dateTime={date.toISOString()}>
              {date.format('MMM D, YYYY')}
            </time>
          </header>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
        </Styles>
      </article>
    </Layout>
  );
};

const Styles = styled.div`
  & h1 {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 0;
  }

  & time {
    text-align: right;
    color: var(--fg-dim-color);
    font-style: oblique;
  }

  & dl:lang(ar) > dd:lang(en),
  dl:lang(fa) > dd:lang(en) {
    font-style: oblique;
    color: var(--fg-dim-color);
    text-align: right;
    margin-right: 1.2em;
  }

  & dl:lang(en) > dd:lang(en) {
    font-style: oblique;
    color: var(--fg-dim-color);
  }

  & dt {
    color: var(--default-text-color);
    font-style: normal;
  }

  & li > dl,
  li > ul,
  li > ol,
  dd > dl,
  dd > ul,
  dd > ol {
    margin-right: 1em;
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

export default Template;
