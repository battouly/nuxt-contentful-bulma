require("dotenv").config();
const contentful = require("contentful");

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "kidocode blog",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content:
          "Read about science and technology from the youngest in the field coached by expert in the field."
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "green",
    height: "4px"
  },
  modules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/markdownit",
    "@nuxtjs/bulma",
    "@nuxtjs/font-awesome",
    [
      "@nuxtjs/pwa",
      {
        icon: false
      }
    ]
  ],
  markdownit: {
    injected: true
  },

  /*
   ** Global CSS
   */
  css: ["~/assets/style.css"],
  /*
   ** Build configuration
   */
  plugins: [
    {
      src: "~plugins/social.js"
    }
  ],
  build: {
    postcss: {
      plugins: {
        "postcss-preset-env": {
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
     ** Run ESLint on save
     */
    manifest: {
      name: "Myknuxt",
      short_name: "knuxtjs",
      icons: [
        {
          src: "static/kidocode_logo.png",
          sizes: "192x192",
          type: "image/png"
        }
      ]
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
        config.module.rules.push({
          test: /(\.vue|\.js)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          exclude: /.nuxt/
        });
      }
      config.node = {
        fs: "empty"
      };
    }
  },
  generate: {
    routes: () => {
      const client = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CD_ACCESS_TOKEN
      });

      return client
        .getEntries({
          content_type: "blogPost",

          "fields.tags[in]": "entry.fields.tags"
        })
        .then(response => {
          return response.items.map(entry => {
            return {
              route: entry.fields.slug,
              imageURL: "https:" + entry.fields.file.fields.file.url,
              payload: entry
            };
          });
        });
    }
  }
};
