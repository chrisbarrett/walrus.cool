'use strict';

module.exports = {
  siteMetadata: {
    title: 'walrus.cool',
    description: "Chris Barrett's personal site",
    keywords: 'gatsbyjs, gatsby, javascript, sample, something',
    siteUrl: 'https://www.walrus.cool',
    author: {
      name: 'Chris Barrett',
      url: 'walrus.cool',
    },
  },
  plugins: [
    'gatsby-transformer-orga',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://walrus.cool',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
