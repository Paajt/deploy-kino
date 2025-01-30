import express from 'express';
// import { initApp, setupVite } from './src/js/app.js';
import { cmsAdapter, cmsAdapterScreenings } from './cmsAdapter.js';
import screenings from '../../lib/screenings.js';
const router = express.Router();

// screenings API
router.get('/screenings', async (req, res) => {
  const screenings = cmsAdapterScreenings.loadAllScreenings();
  res.json({ screenings });
});

router.get('/api/screenings/:id/movie', async (req, res) => {
  const movieId = req.params.id;
  console.log('calling screenings');
  try {
    const data = await screenings(movieId);
    res.json(data);
  } catch (error) {
    console.error('Error fetching screening:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
