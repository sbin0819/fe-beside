/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
    env: {
        APP_ENV: String(process.env.APP_ENV),
    },
}

module.exports = nextConfig
