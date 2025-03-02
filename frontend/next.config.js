module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://your-backend-url.vercel.app/api/:path*",
            },
        ];
    },
};
