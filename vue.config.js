module.exports = {
  devServer: {
    proxy: {
      '/operators': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
      '/token': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
