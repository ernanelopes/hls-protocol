const http = require('http');
const HlsServer = require('hls-server');

const server = http.createServer();

// Specify the path to serve HLS content
const hlsPath = '/hls';

// Specify the directory where your HLS content (segments and manifest) is located
const contentDirectory = './hls_content';

// Set up the HLS server
const hls = new HlsServer(server, {
  path: hlsPath, // The base path for HLS content
  dir: contentDirectory, // The directory where your segments and manifest files are located
  provider: {
    exists: (req, callback) => {
      // Implement custom logic to check if the requested file exists.
      // You can use 'fs' module or any other method suitable for your setup.
      const requestedFile = `${contentDirectory}`;
      // Example using 'fs' module for file existence check:
      const fs = require('fs');
      fs.access(requestedFile, fs.constants.F_OK, (err) => {
        if (err) {
          callback(false); // File does not exist
        } else {
          callback(true); // File exists
        }
      });
    },
  },
});

server.listen(8000, () => {
  console.log('HLS server is running on http://localhost:8000');
});
