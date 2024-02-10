module.exports = {
  devServer: {
    proxy: {
      "/tasks": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/tasks": "" },
      },
    },
  },
};
