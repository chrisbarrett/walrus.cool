'use strict';

const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'walrus.cool',
    description: "Chris Barrett's personal site",
    keywords: 'programming, study, arabic, persian, farsi',
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
        path: path.join(__dirname, 'src', 'content'),
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'walrus.cool',
        short_name: 'walrus.cool',
        lang: 'en',
        start_url: '/',
        background_color: '#fdf6e3',
        theme_color: '#007aff',
        display: 'standalone',
        icon: path.join(__dirname, 'src', 'images', 'walrus.png'),
      },
    },
  ],
};
