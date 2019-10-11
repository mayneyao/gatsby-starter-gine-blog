module.exports = {
    siteMetadata: {
        siteUrl: `https://gine.me`,
        title: `Mayne's Blog`,
        description: `All things about Mayne`,
    },
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                configTable: "https://www.notion.so/985e04f545f844a3b76cd53452597ce3?v=a8a081148ad84e8f9d0f859931fa0274"
            }
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                configTable: "https://www.notion.so/993b4be5b3c943379d748ad377d3ae7d?v=ea2e5358c6c349c6b4e421c6636a3384"
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: `UA-89592481-3`,
                head: true,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `/sitemap.xml`,
                exclude: [],
                query: `
                {
                  site {
                    siteMetadata {
                        siteUrl
                    }
                  }
                  allSitePage {
                    edges {
                      node {
                        path
                      }
                    }
                  }
              }`,
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/notion.gine.workers.dev/,
                        handler: `staleWhileRevalidate`,
                    },
                    {
                        // fixme 此接口比较特殊，无法通用，这里暂时写死
                        urlPattern: /^https:\/\/api.gine.me\/$/,
                        handler: `staleWhileRevalidate`,
                    },
                    {
                        // Add runtime caching of various other page resources
                        urlPattern: /^https?:.*\/.netlify\/functions\/notion/,
                        handler: `staleWhileRevalidate`,
                    },
                    {
                        // Use cacheFirst since these don't need to be revalidated (same RegExp
                        // and same reason as above)
                        urlPattern: /(\.js$|\.css$|static\/)/,
                        handler: `cacheFirst`,
                    },
                    {
                        // Add runtime caching of various other page resources
                        urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
                        handler: `staleWhileRevalidate`,
                    },
                    {
                        // Google Fonts CSS (doesn't end in .css so we need to specify it)
                        urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                        handler: `staleWhileRevalidate`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Mayne's Blog`,
                short_name: `Mayne's Blog`,
                icon: `src/static/icon.png`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `standalone`,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
                feeds: [
                    {
                        serialize: ({ query: { site, allPosts } }) => {
                            return allPosts.edges.map(edge => {
                                return {
                                    title: edge.node.name,
                                    description: edge.node.desc,
                                    date: edge.node.public_date,
                                    url: `${site.siteMetadata.siteUrl}/posts/${edge.node.slug}`,
                                    guid: edge.node.slug,
                                    custom_elements: [{ "content:encoded": edge.node.name }],
                                }
                            })
                        },
                        query: `
                    {
                        allPosts(sort: {order: DESC, fields: public_date}, filter: {status: {eq: "published"}}) {
                            edges {
                              node {
                                name
                                desc
                                slug
                                public_date
                              }
                            }
                        }
                    }
                  `,
                        output: "/rss.xml",
                        title: "Mayne's Blog RSS Feed",
                        // optional configuration to insert feed reference in pages:
                        // if `string` is used, it will be used to create RegExp and then test if pathname of
                        // current page satisfied this regular expression;
                        // if not provided or `undefined`, all pages will have feed reference inserted
                        match: "^/blog/",
                    },
                ],
            },
        },
    ],
}
