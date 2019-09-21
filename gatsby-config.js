module.exports = {
    siteMetadata: {
        siteUrl: `https://gine.me`,
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
        }
    ],
}
