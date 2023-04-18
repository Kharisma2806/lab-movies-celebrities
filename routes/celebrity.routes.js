
const router = require("express").Router();

const Celebrity=require("../models/Celebrity.model")


router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});


/*router.post("/celebrities/create", async (req, res) => {
  try {
    const newCelebrity = req.body;
    const celebrity = await Celebrity.create(newCelebrity);
    res.render("/celebrities", { celebrity });
  }
    catch (err) {
    console.log(err);
    res.render("celebrities/new-celebrity");
  }
});*/


router.post("/celebrities/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/celebrities", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (err) {
    console.log("Error in getting celebrity", err);
  }
});

module.exports = router;