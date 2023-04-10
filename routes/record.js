const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const data = require("../data")

//get All records
recordRoutes.route("/record").get(function(req, res){
    let db_connect = dbo.getDB("records");
    db_connect
        .collection("records")
        .find({})
        .toArray(function(err, result) {
            if(err) throw err
            res.json(result)
        })
})

//get all statistics records
recordRoutes.route("/record/stats").get(function(req, res){
    let db_connect = dbo.getDB("statDatas");
    db_connect.collection("statDatas").find({}).toArray(function(err, result){
        if(err) throw err
        res.json(result)
    })
})

// get a singl record by ID
recordRoutes.route("/record/:id").get(function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id ) };
    db_connect
        .collection("records")
        .findOne(myQuery, function(err, result){
            if(err) throw err
            res.json(result)
        })
})

// get a singl record by Name
recordRoutes.route("/record/:name").get(function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { name: req.body.name };
    db_connect
        .collection("records")
        .findOne(myQuery, function(err, result){
            if(err) throw err
            res.json(result)
        })
})

// create a new record
recordRoutes.route("/record/add").post(function(req, res){
    let db_connect = dbo.getDB();
    let totalAmount = 0;
    totalAmount = req.body.balance + totalAmount;
    let newObj = {
      surname: req.body.surname,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      school: req.body.school,
      level: req.body.level,
      street: req.body.street,
      postalCode: req.body.postalCode,
      city: req.body.city,
      contact1: req.body.contact1,
      tel1: req.body.tel1,
      parentSSN: req.body.parentSSN,
      parentDOB: req.body.parentDOB,
      childSSN: req.body.childSSN,
      contact2: req.body.contact2,
      tel2: req.body.tel2,
      email: req.body.email,
      allergies: req.body.allergies,
      medicals: req.body.medicals,
      parentRemarks: req.body.parentRemarks,
      teamRemarks: req.body.teamRemarks,
      week1: req.body.week1,
      week2: req.body.week2,
      week3: req.body.week3,
      week4: req.body.week4,
      presence: req.body.presence,
      balance: req.body.balance,
      social: req.body.social,
      totalAmount: totalAmount,
    };
    db_connect
        .collection("records")
        .insertOne(newObj, function(err, result) {
            if(err) throw err
            console.log("1 record inserted");
            res.json(result)
        })
})

// create a new statData
recordRoutes.route("/record/stats/add").post(function(req, res){
    let db_connect = dbo.getDB()
    let newObj = {
      name: req.body.name,
      balance: req.body.balance,
      social: req.body.social,
      date: req.body.date,
    };
    db_connect.collection("statDatas").insertOne(newObj, function(err, result){
        if(err) throw err
        res.json(result)
    })
})

// update a record
recordRoutes.route("/update/:id").put(function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { _id:ObjectId( req.params.id ) };
    let newValues = {
      $set: {
        surname: req.body.surname,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        school: req.body.school,
        level: req.body.level,
        street: req.body.street,
        postalCode: req.body.postalCode,
        city: req.body.city,
        contact1: req.body.contact1,
        tel1: req.body.tel1,
        contact2: req.body.contact2,
        tel2: req.body.tel2,
        parentSSN: req.body.parentSSN,
        parentDOB: req.body.parentDOB,
        childSSN: req.body.childSSN,
        email: req.body.email,
        allergies: req.body.allergies,
        medicals: req.body.medicals,
        parentRemarks: req.body.parentRemarks,
        teamRemarks: req.body.teamRemarks,
        week1: req.body.week1,
        week2: req.body.week2,
        week3: req.body.week3,
        week4: req.body.week4,
        presence: req.body.presence,
        balance: req.body.balance,
        social: req.body.social,
        totalAmount: req.body.totalAmount,
      },
    };
    db_connect
        .collection("records")
        .updateOne(myQuery, newValues, function(err, result){
            if(err) throw err
            console.log("1 record updated!");
            res.json(result);
        })
})

// delete a record
recordRoutes.route("/:id").delete(function(req, res) {
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id ) };
    db_connect
        .collection("records")
        .deleteOne(myQuery, function(err, result){
            if(err) throw err
            res.json(result)
        })
})

// delete a daily registration
recordRoutes.route('/record/deleteAStat/:id').delete(function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id )};
    db_connect.collection("statDatas").deleteOne(myQuery, function(err, result){
        if(err) throw err
        res.json(result)
    })
})
// delete all the daily registrations
recordRoutes.route('/record/deleteAllStats').delete(function(req, res){
    let db_connect = dbo.getDB();
    db_connect.collection("statDatas").deleteMany({})
})

// save many records
recordRoutes.route('/record/addAll').post(function (req, res) {
  let db_connect = dbo.getDB();
  
  db_connect.collection('records').insertMany(data, function(err, result) {
    if (err) throw err;
    console.log('All records inserted');
    res.json(result);
  })

});

module.exports = recordRoutes;