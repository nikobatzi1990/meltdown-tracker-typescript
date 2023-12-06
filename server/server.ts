import express, { Express, Request, Response } from "express";
import path from 'path';
import knex from '../database/knex';
import cors from 'cors';
const tagController = require('./controllers/tagController');
const entryController = require('./controllers/entryController');

function setUpServer() {
  const app: Express = express();

  app.use(cors());
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.use(express.json());
  app.use('/api/tags', tagController);
  app.use('/api/entries', entryController);

  // signup endpoint
  app.post('/api/signup', async (req: Request, res: Response) => {
    const { username, email, uid } = req.body;
    try {
      await knex('users').insert({ 'username': username, 'email': email, 'UID': uid, 'created_at': new Date() });
      res.status(200).send("New User Created");
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/*', function(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  
  return app;
}
export default setUpServer;