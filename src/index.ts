import express from 'express';
import * as http from 'http';

import setupRouters from './router';
import setupSocket from './socket';
import startListening from './webserver';

export async function setupServer(dirname: string) {
  const app = express();
  const httpServer = new http.Server(app);

  setupRouters(app, dirname);
  await setupSocket(httpServer);
  startListening(httpServer);
}
