const path = require('path')

const PATH_PREFIX = process.env.PATH_PREFIX

module.exports = {
  pathPrefix: PATH_PREFIX || `/`,
  siteMetadata: {
    title: `Paving Stones`,
    author: `J`,
    description: `Publishing notes to help refine my learning paths and share with others`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-kb`,
      options: {
        rootNote: 'readme',
        contentPath: path.resolve(__dirname, '../publish'),
        ignore: [
          '**/_layouts/**',
          '**/.git/**',
          '**/.github/**',
          '**/.vscode/**',
          '**/.cache/**',
        ],
        // this is an option for extending `gatsby-plugin-mdx` options inside `gatsby-theme-kb`,
        getPluginMdx(defaultPluginMdx) {
          // so you can have your relative referenced files served, e.g. '../assets/img.png'.
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: ['md', 'mdx'],
            },
          })

          // an example of syntax highlighting
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          })
          
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
            },
          })
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-responsive-iframe',
          })

          return defaultPluginMdx
        },
      },
    },
    {
      // this plugin makes sure your static files will be served by gatsby,
      //   but of course you need to reference them by absolute path, e.g. '/assets/img.png'.
      // if you have multiple directories, copy this plugin section and specify other directory
      // check https://github.com/csath/gatsby-plugin-copy-files-enhanced to find docs for this plugin
      resolve: 'gatsby-plugin-copy-files-enhanced',
      options: {
        source: path.resolve(__dirname, `../assets`),
        destination: '/assets',
        purge: false,
      },
    },
  ],
}
