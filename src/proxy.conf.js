const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
    target: "https://localhost:36322", 
    secure: false, 
    changeOrigin: true, 
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
