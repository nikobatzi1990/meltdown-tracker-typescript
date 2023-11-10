import express, { Request, Response } from "express";
import knex from '../../database/knex';
const router = express.Router();

router.get(
// endpoint for getting a user's created tags
'/', async (req: Request, res: Response) => {
  const tagList: string[] = [];
  await knex.select('tag_name').from('tags')
    .where('users.UID', req.params.uid)
    .join('users', 'users.id', '=', 'tags.user_id')
  .then(result => {
    result.map((e) => {
      tagList.push(e.tag_name);
    })
    res.status(200).send(tagList)})
  .catch(error => res.status(400).send(error))
});

// /api/:uid/tags

// endpoint for posting a new tag
router.post('/newTag', async (req: Request, res: Response) => {
  const { tagName, uid } = req.body;
  try {
    const userId = await knex.select('id')
      .from('users')
      .where('users.UID', uid);

    const newTag = await knex('tags')
      .insert({ 
        'user_id': userId[0].id, 
        'tag_name': tagName, 
        'times_used': 0 
      });
    res.status(200).send(newTag);
  } catch (error) {
      res.status(400).send(error);
  }
});

router.post(
  // endpoint for getting the number of times a tag has been used
  '/:tagName/timesUsed', async (req: Request, res: Response) => {
    let timesUsed: number;
    await knex.select('times_used').from('tags')
      .where('tag_name', req.params.tagName)
      .join('users', 'users.id', '=', 'tags.user_id')

    .then(result => {
      result.map((e) => {
        timesUsed = e.times_used.toString();
      });
      res.status(200).send(timesUsed)
    })
    .catch(error => res.status(400).send(error))
  });
