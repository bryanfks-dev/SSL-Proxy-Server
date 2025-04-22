import express, { Express, Request, Response } from "express";
import httpProxy from "http-proxy";
import fs, { readFileSync } from "fs";
import path from "path";
import https from "https";
import assert from "assert";

/**
 * CERT_PATH is the path to the SSL certificate file.
 *
 * @type {string}
 */
const CERT_PATH: string = path.join(__dirname, "../certificates/localhost.pem");

/**
 * KEY_PATH is the path to the SSL key file.
 *
 * @type {string}
 */
const KEY_PATH: string = path.join(
  __dirname,
  "../certificates/localhost-key.pem"
);

/**
 * loadFile is a utility function to load a file from the filesystem.
 * It checks if the file exists and throws an error if it does not.
 *
 * @param {string} filePath - The path to the file to load
 *
 * @returns {Buffer} - The contents of the file as a Buffer
 */
const loadFile = (filePath: string): Buffer => {
  assert(fs.existsSync(filePath), `File does not exist: ${filePath}`);

  return readFileSync(filePath);
};

/**
 * Function to create an HTTPS proxy server
 *
 * @param {string} target_url - The target URL to proxy requests to
 *
 * @returns {void}
 */
export default (target_url: string): void => {
  // Load the certificate and key files
  const cert: Buffer = loadFile(CERT_PATH);
  const key: Buffer = loadFile(KEY_PATH);

  // Create an express application
  const app: Express = express();

  // Proxy middleware setup
  const proxy: httpProxy = httpProxy.createProxyServer({
    target: target_url,
    changeOrigin: true,
    secure: false, // Do not change this to true if you are using self-signed certificates
  });

  // App middleware to handle requests
  app.use((req: Request, res: Response): void => {
    // Add more middleware here..

    // Register the proxy error handler
    proxy.web(req, res, {}, (err: Error): void => {
      res.status(500).send("Proxy error: " + err.message);
    });
  });

  // Create the HTTPS server with the certificate and key
  // Note: The `key` and `cert` options are used to specify the SSL certificate and key
  // for the HTTPS server.
  const server = https.createServer({ key, cert }, app);

  // Start the server
  server.listen(443, (): void => {
    console.info(`[INFO] SSL proxy server is running on https://localhost:443`);
  });
};
