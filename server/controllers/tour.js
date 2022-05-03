const express = require("express");
const mongoose = require("mongoose");
const Tour = require("../models/tour");

exports.createTour = async (req, res) => {
  try {
    req.body.creator = req.userID;
    const tour = Tour.create(req.body);
    res.status(200).send(tour);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getTours = async (req, res) => {
  try{
    const {page} = req.query
    const limit = 6
    const startIndex = Number(page - 1) * limit
    const total = await Tour.countDocuments({})
    const tours = await Tour.find().limit(limit).skip(startIndex)
    res.status(200).send({
      data:tours,
      currentPage:Number(page),
      totalTours:total,
      numberOfPages:Math.ceil(total/limit)
    })
  }catch(err){
  res.status(500).send(err)
  }
};

exports.getTour = (req, res) => {
  Tour.findById(req.params.id)
    .then((tour) => {
      res.status(200).send(tour);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

exports.getToursByUser = async (req, res) => {
  const { userID } = req;

  try {
    const tours = await Tour.find({ creator: userID });

    res.status(200).send(tours);
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .send({ message: `No tour exists with this is: ${id}` });
    }
    await Tour.findByIdAndRemove(id);
    res.status(200).send("Tour Deleted Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status.send(`No tour exists with this id ${id}`);
    }
    const updatedTour = {
      title,
      description,
      creator,
      imageFile,
      tags,
      _id: id,
    };

    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    return res.status(200).send("Update Successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.searchTours = async (req,res)=>{
  const {search} = req.query
  const title = new RegExp(search, 'i')
  try{
    const {page} = req.query
    const limit = 6
    const startIndex = Number(page - 1) * limit
    const total = await Tour.countDocuments({})
    const tours = await Tour.find({title:title}).limit(limit).skip(startIndex)
    res.status(200).send({
      data:tours,
      currentPage:Number(page),
      totalTours:total,
      numberOfPages:Math.ceil(total/limit)
    })
  }catch(err){
    res.status(500).send(err)
  }
}

exports.tagTours = async (req,res) =>{
  const {tag} = req.params
  try{
    const tours  = await Tour.find({tags:{$in:tag}})
    res.status(200).send(tours)
  }catch (err){
    res.status(500).send(err)

  }

}

// exports.relatedTours =async(req,res) =>{
//   try{
//     const {id} = req.params
//     const tour = await Tour.findById(id)
//     const tags = tour.tags
//
//     const relatedTours = await tags.map((tag)=>{
//
//        Tour.find({tags:{$in:tag}}).then((tour)=>{
//         console.log(tour)
//         return tour
//
//        }).catch((err)=>{
//          return res.status(500).send(err)
//        })
//
//     })
//
//     res.status(200).json(relatedTours)
//
//   }catch(err)
//   {
//     res.status(500).send(err.message)
//   }
//
// }


exports.relatedTours = async(req,res) =>{
  try{
    //req.body.tags is an array
    const {tags} = req.body
    //this will search the tags array using $in with the tags array that got from req.body
    const tour = await Tour.find({tags:{$in:tags}})
    res.status(200).send(tour)

  }catch(err){
    res.status(500).send(err)
  }

}

exports.likeTour = async (req,res)=>{
  try{
    const {id} = req.params
    if(id){
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(500).send({message:"Id is not valid"})
      }

      const tour = await Tour.findById(id)
      const index = tour.likes.findIndex((id)=> id === String(req.userID))
      if(index == -1){
        tour.likes.push(req.userID)
      }else{
       tour.likes = tour.likes.filter((id)=> id !== String(req.userID))
        console.log(tour.likes)
      }

      const updatedTour = await Tour.findByIdAndUpdate(id, tour, {new:true})
      res.status(200).send(updatedTour)


    }
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }

}