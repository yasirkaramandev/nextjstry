export default {
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/yasirkaramandev',
        permanent: true,
      },
      {
        source: '/linkedln',
        destination: 'https://www.linkedin.com/in/yasirkaraman/',
        permanent: true,
      }
    ]
  },
}
