module.exports = {
  apps : [{
    name: 'docs',
    script: 'index.js',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
