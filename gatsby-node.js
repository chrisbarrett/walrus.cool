'use strict';

const path = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'OrgContent': {
      const { createNodeField } = actions;
      const { category, export_file_name } = node.meta;
      const paths = ['/', category, export_file_name].filter(lpath => lpath);
      const slug = path.posix.join(...paths);

      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });
    }

    case 'MarkdownRemark': {
      const { permalink, layout } = node.frontmatter;
      const { relativePath } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const orgQuery = graphql(`
    {
      allOrgContent(limit: 1000) {
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

  const mdQuery = graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `);

  const allOrg = await orgQuery;
  const allMarkdown = await mdQuery;

  if (allOrg.errors) {
    reporter.panic(allOrg.errors);
  }

  if (allMarkdown.errors) {
    reporter.panic(allMarkdown.errors);
  }

  const { createPage } = actions;

  allOrg.data.allOrgContent.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        id: node.id,
      },
    });
  });

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    });
  });
};
