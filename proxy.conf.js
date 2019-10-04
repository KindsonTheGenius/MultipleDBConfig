const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
      "/auth/**",
      "/robots.txt*",
    ],
    target: "http://localhost:8090",
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
