/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    env: {
        APP_ENV: String(process.env.APP_ENV),
    },
}

module.exports = nextConfig
