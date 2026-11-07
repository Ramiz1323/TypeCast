module.exports = {
  apps: [
    {
      name: "typecast",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "max", // or set to 1 or 2 depending on your VPS CPU cores
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

