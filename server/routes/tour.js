const express = require("express");
const Router = express.Router();
const {
  createTour,
  getTours,
  getTour,
  getToursByUser,
  deleteTour,
  updateTour,
  searchTours,
  tagTours,
  relatedTours,
  likeTour
} = require("../controllers/tour");
const auth = require("../middlewares/auth");

Router.route("/").post(auth, createTour).get(getTours);
Router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
Router.route("/userTours").post(auth, getToursByUser);
Router.route("/search").post(searchTours);
Router.get('/taggable/:tag', tagTours)
Router.post('/related', relatedTours)
Router.patch('/like/:id', auth, likeTour)
module.exports = Router;
