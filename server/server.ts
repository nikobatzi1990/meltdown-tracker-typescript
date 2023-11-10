import express, { Express, Request, Response } from "express";
import path from 'path';
import knex from '../database/knex';
const tagController = require('./controllers/tagController');

function setUpServer() {
  const app: Express = express();

  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.use(express.json());
  app.use('/api/:uid/tags', tagController);

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

  // endpoint for posting a new entry submission
  app.post('/api/entries/submission', async (req: Request, res: Response) => {
    const { uid, tagName, timesUsed, title, body, timeOfDay, flagged, intensity } = req.body;
      const userId = await knex.select('id')
        .from('users')
        .where('UID', '=', uid);
      
      try {
      const tagQuery = await knex('tags')
        .returning('id')
        .update({
          'times_used': timesUsed
        })
        .where('tag_name', '=', tagName);

        console.log('🤗', tagQuery);

      const postQuery = await knex('posts')
        .returning('id')
        .insert({ 
          'title': title, 
          'body': body,
          'user_id': userId[0].id,
          'time_of_day': timeOfDay,
          'created_at': new Date(),
          'flagged': flagged,
          'intensity': intensity
        });

      // await knex('tag_to_post')
      //   .insert({
      //     'tag_id': tagQuery[0].id,
      //     'post_id': postQuery[0].id
      //   });

      res.status(200).send(postQuery)
      
    } catch (error) {
        res.status(400).send(error);
    }
  });

  // endpoint for all of one user's entries
  app.get('/api/:uid/entries', async (req: Request, res: Response) => {
    
    try {
      await knex.select('posts.id', 'title', 'body', 'flagged', 'intensity')
        .from('posts')
        .where('users.UID', req.params.uid)
        .join('users', 'users.id', '=', 'posts.user_id')
        .orderBy('id', 'desc')
      .then(result => {
        res.status(200).send(result);
      });
      
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // endpoint for all entries that include specified tag
  app.get('/api/entries/:tagName', async (req: Request, res: Response) => {
    try {
      const result = await knex.select('title', 'body')
      .from('posts')
      .join('tag_to_post', 'tag_to_post.post_id', '=','posts.id')
      .join('tags', 'tag_to_post.tag_id', '=', 'tags.id')
      .where('tags.tag_name', '=', req.params.tagName);
      res.status(200).send(result);

    } catch (error) {
      res.status(400).send(error);
    }
  });

  // endpoint for getting one entry by id
  app.get('/api/entries/entry/:entryId', async (req: Request, res: Response) => {
    try {
      const entry = await knex
        .from('posts')
        .join('tag_to_post', 'tag_to_post.post_id', '=','posts.id')
        .join('tags', 'tag_to_post.tag_id', '=', 'tags.id')
        .select('title', 'body', 'time_of_day', 'flagged', 'tags.tag_name', 'created_at', 'intensity')
        .where('posts.id', '=', req.params.entryId);
        res.status(200).send(entry[0])

    } catch (error) {
      res.status(400).send(error);
    }
  });

  // endpoint for editing an entry by id
  app.patch('/api/entries/:entryId/edit', async (req: Request, res: Response) => {
    const { title, body, timeOfDay, flagged, intensity } = req.body;

    try {
      await knex('posts')
        .where('posts.id', '=', req.params.entryId)
        .update({
        'title': title, 
        'body': body,
        'time_of_day': timeOfDay,
        'flagged': flagged,
        'updated_at': new Date(),
        'intensity': intensity
      });
      res.status(200).send("Post Edited!")

    } catch (error) {
      res.status(400).send(error);
    }
  });

  // endpoint for deleting an entry
  app.delete('/api/entries/:entryId/deletion', async (req: Request, res: Response) => {
    try {
      await knex('posts')
        .delete()
        .where('posts.id', req.params.entryId);
      res.status(200).send("Post deleted")

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