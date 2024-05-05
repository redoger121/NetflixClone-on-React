const router = require('express').Router();

const { prisma } = require('../db');
router.get('/movies/list', async (req, res) => {
  const offset = parseInt(req.query.offset, 10) | 0;

  const movies = await prisma.movie.findMany({
    take: 12,
    skip: offset,
  });
  const count = await prisma.movie.count();
  return res.json({ movies, count });
});

router.get('/movie/:id', async (req, res) => {
  const id = req.params.id;
  const movie = await prisma.movie.findUnique({
    where: {
      id: +id,
    },
  });
  return res.send(movie);
});

module.exports = router;
