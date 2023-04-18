const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET route to render form for creating new movie done
router.get('/movies/create', async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { celebrities });
  } catch (err) {
    console.log(err);
  }
});

// GET route to render all movies, done
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (err) {
    console.log(err);
  }
});

// POST route to handle form submission for creating new movie, done
router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = req.body;
    const movie = await Movie.create(newMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    res.render("movies/new-movies");
  }
});

// GET route to render details of a specific movie, done
router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', { movie });
    })
    .catch(err => {
      next(err);
    });
});

// POST route to handle deleting a specific movie
router.post('/movies/:id/delete', (req, res, next) => {
  const movieId = req.params.id;
  console.log('movieId:', movieId);
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log(error);
    });
});

/*delete movie from Alex
router.get("/id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
  .then((response) => {
    res.render("movies/movies");
  })
}); 


//edit movie from Alex
router.get("/id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/edit-movies");
    });
});*/

// GET route to render form for editing a specific movie
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      Celebrity.find()
        .then(celebrities => {
          res.render('movies/edit-movie', { movie, celebrities });
        })
        .catch(error => {
          next(error);
        });
    })
    });

// POST route to handle form submission for editing a specific movie
router.post('/movies/:id', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
