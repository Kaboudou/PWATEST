module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{json,html,js,css}"
  ],
    "runtimeCaching": [{
        "urlPattern": "/\.(?:jpg|jpeg)$/",
        "handler":"CacheFirst",
    }],
    "globIgnores": [
        'node_modules/**/*',
        'workbox-config.js',
        'workbox-v4.2.0'
    ],
    "importWorkboxFrom":"local",
  "swDest": "service-worker.js",

};