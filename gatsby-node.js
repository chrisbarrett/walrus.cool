'use strict';

const path = require('path');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case 'OrgContent': {
      const { category, export_file_name } = node.meta;
      const paths = ['/', category, export_file_name].filter(lpath => lpath);
      const slug = path.posix.join(...paths);
      const value = slug || '';
      createNodeField({ node, name: 'slug', value });
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = await graphql(`
    {
      allOrgContent {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (query.errors) {
    reporter.panic(query.errors);
  }

  query.data.allOrgContent.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields;
    const component = path.resolve(`./src/templates/${layout || 'post'}.tsx`);
    const rtlLang = new RegExp('^/persian/.*').test(slug) ? 'fa' : 'ar';
    const context = { id: node.id, rtlLang };
    createPage({ path: slug, component, context });
  });
};
