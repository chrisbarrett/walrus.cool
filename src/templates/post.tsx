import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import emoji from 'node-emoji';
import cheerio from 'cheerio';
import Layout from '../components/layout';
import PostDate from '../components/post-date';
import SEO from '../components/seo';

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

const isArabicOrPersian = (element: Cheerio): boolean => {
  const sample = element.text().substring(0, 3);
  return matchArabicOrPersian.test(sample);
};

const postProcessHtml = (html: string): string => {
  const $ = cheerio.load(emoji.emojify(html));

  // Apply lang tags and text-direction for Persian text.

  $('dt, li, dd, p').each((_i, hit) => {
    const element = $(hit);

    if (isArabicOrPersian(element)) {
      element.addClass('rtl').attr('dir', 'rtl');

      if (hit.name === 'p') {
        element.attr('lang', 'fa');
      } else {
        element
          .contents()
          .filter((_, element) => isArabicOrPersian($(element)))
          .each((_, element) => $(element).wrap('<span lang="fa" />'));
      }
    } else {
      element.attr('dir', 'ltr');
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
      <SEO title={meta.title} />
      <article>
        <Styles>
          <HeaderSection>
            <h1>{meta.title}</h1>
            {date && <PostDate value={date} />}
          </HeaderSection>
          <BodySection>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: updatedHtml }} />
          </BodySection>
        </Styles>
      </article>
    </Layout>
  );
};

export default Template;

const HeaderSection = styled.div``;

const BodySection = styled.section``;

const Styles = styled.div``;

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
