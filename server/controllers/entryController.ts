import express, { Request, Response } from "express";
import knex from '../../database/knex';
const router = express.Router();

// endpoint for all of one user's entries
router.get('/:uid', async (req: Request, res: Response) => {
  const uid = req.params.uid
  try {
    await knex.select('posts.id', 'title', 'body', 'flagged', 'intensity')
      .from('posts')
      .where('users.UID', uid)
      .join('users', 'users.id', '=', 'posts.user_id')
      .orderBy('id', 'desc')
    .then(result => {
      res.status(200).send(result);
    });    
  } catch (error) {
    res.status(400).send(error);
  }
});

// endpoint for posting a new entry submission
router.post(':/uid/submission', async (req: Request, res: Response) => {
  const { tagName, timesUsed, title, body, timeOfDay, flagged, intensity } = req.body;
  const uid = req.params.uid
  const userId = await knex.select('id')
    .from('users')
    .where('UID', '=', uid);
  try {
    const tagQuery: any = await knex('tags')
      .returning('id')
      .update({
        'times_used': timesUsed
      })
      .where('tag_name', '=', tagName);

    const postQuery: any = await knex('posts')
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
    
    await knex('tag_to_post')
      .insert({
        'tag_id': tagQuery[0].id,
        'post_id': postQuery[0].id
      });
    res.status(200).send(postQuery)

  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;