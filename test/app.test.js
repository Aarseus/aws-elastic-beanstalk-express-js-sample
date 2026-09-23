const assert = require('assert');
const http = require('http');

require('../src/app');

setTimeout(
  () => {
    http
      .get('http://localhost:8080/', (res) => {
        assert.strictEqual(
          res.statusCode,
          200,
          `Expected status 200, got ${res.statusCode} instead`,
        );

        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          assert.strictEqual(
            body,
            'Hello World!',
            `Unexpected response body: ${body}`,
          );
          console.log('All tests passed.');
          process.exit(0);
        });
      })
      .on('error', (err) => {
        console.log('Test Failed!', err.message);
        process.exit(1);
      });
  },

  500,
);
