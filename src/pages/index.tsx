import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import PostItem, { Props as PostProps } from '../components/post-item';
import SEO from '../components/seo';

interface ExtraQueryAttrs {
  meta: {
    publicationYear: string;
    publicationDateString: string;
  };
}

interface Props {
  data: {
    allOrgContent: {
      edges: { node: PostProps & ExtraQueryAttrs }[];
    };
  };
}

const Index: React.SFC<Props> = ({ data }) => {
  const postsByYear = _.groupBy(
    data.allOrgContent.edges,
    ({ node }) => node.meta.publicationYear
  );

  return (
    <Layout>
      <SEO />
      <Styles>
        <h1>Posts</h1>
        {Object.entries(postsByYear).map(([year, posts]) => (
          <div className="year-grouping" key={year}>
            <h2>{year}</h2>
            {posts.map(({ node }) => (
              <PostItem key={node.id} {...node} />
            ))}
          </div>
        ))}
      </Styles>
    </Layout>
  );
};

const Styles = styled.div`
  --column-width: 4rem;
  --title-padding: 1rem;

  @media only screen and (min-width: 735px) {
    --title-padding: 2rem;
  }

  & h1 {
    margin-left: calc(var(--column-width) + var(--title-padding));
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  & time,
  h2 {
    width: var(--column-width);
    color: var(--fg-dim-color);
    font-style: oblique;
    text-align: right;
  }
  & h2 {
    font-weight: 200;
    font-size: 18pt;
  }

  & .post-item {
    display: flex;
  }

  & time {
    order: 1;
    margin-top: 0.25em;
  }

  & h3 {
    padding-left: var(--title-padding);
    vertical-align: center;
    display: inline;
    margin-top: 0;
    order: 2;
  }
`;

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allOrgContent(sort: { fields: meta___date, order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          meta {
            title
            date
            publicationDateString: date(formatString: "MMM D")
            publicationYear: date(formatString: "YYYY")
          }
        }
      }
    }
  }
`;
