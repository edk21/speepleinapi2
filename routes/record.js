const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const data = require("../data")

//get All records
// recordRoutes.route("/record").get(function(req, res){
//     let db_connect = dbo.getDB("records");
//     db_connect
//         .collection("records")
//         .find({})
//         .toArray(function(err, result) {
//             if(err) throw err
//             res.json(result)
//         })
// })
recordRoutes.route("/record").get(async function (req, response) {
    let db_connect = dbo.getDB("records");
  
    try {
      const records = await db_connect
        .collection("records")
        .find({})
        .toArray();
      response.json(records);
    } catch (error) {
      console.log("An error occurred pulling the records. " + error);
    }
  
  });

//get all statistics records
recordRoutes.route("/record/stats").get(async function(req, res){
    let db_connect = dbo.getDB("statDatas");
    try {
        const records = await db_connect
          .collection("statDatas")
          .find({})
          .toArray();

        res.json(records)
    } catch (error) {
        console.log("An error occurred pulling the stats records. " + error);
    }
    
})

// get a singl record by ID
recordRoutes.route("/record/:id").get(async function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id ) };
    try {
        const record = await db_connect
          .collection("records")
          .findOne(myQuery)
        res.json(record)
    } catch (error) {
      console.log("An error occurred pulling the record. " + error);
    }
})

// get a singl record by Name
recordRoutes.route("/record/:name").get(async function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { name: req.body.name };
    try {
      const record = await db_connect
        .collection("records")
        .findOne(myQuery)
        res.json(record)
    } catch (error) {
      console.log("An error occurred pulling the record. " + error);
    }
})

// create a new record
recordRoutes.route("/record/add").post(async function(req, res){
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
    try {
      const record = await db_connect
        .collection("records")
        .insertOne(newObj)
        res.json(record)
    } catch (error) {
      console.log("An error occurred pulling creating records. " + error);
    }
})

// create a new statData
recordRoutes.route("/record/stats/add").post(async function(req, res){
    let db_connect = dbo.getDB()
    let newObj = {
      name: req.body.name,
      balance: req.body.balance,
      social: req.body.social,
      date: req.body.date,
    };
    try {
      const statData = await db_connect
        .collection("statDatas")
        .insertOne(newObj)
        res.json(statData)
    } catch (error) {
      console.log("An error occurred creating the stats records. " + error);
    }
})

// update a record
recordRoutes.route("/update/:id").put(async function(req, res){
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
    try {
      const records = await db_connect
        .collection("records")
        .updateOne(myQuery, newValues)
        res.json(records);
    } catch (error) {
      console.log("An error occurred creating the updating record. " + error);
    }
})

// delete a record
recordRoutes.route("/:id").delete(async function(req, res) {
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id ) };
    try {
      const record = await db_connect
        .collection("records")
        .deleteOne(myQuery)
        res.json(record)
    } catch (error) {
      console.log("An error occurred creating the deleting record. " + error);
    }
    
})

// delete a daily registration
recordRoutes.route('/record/deleteAStat/:id').delete(async function(req, res){
    let db_connect = dbo.getDB();
    let myQuery = { _id: ObjectId( req.params.id )};
    try {
      const record = await db_connect.collection("statDatas").deleteOne(myQuery)
      res.json(record)
    } catch (error) {
      console.log("An error occurred creating the deleting daily record. " + error);
    }
})
// delete all the daily registrations
recordRoutes.route('/record/deleteAllStats').delete(function(req, res){
    let db_connect = dbo.getDB();
    db_connect.collection("statDatas").deleteMany({})
})

// save many records
recordRoutes.route('/record/addAll').post(async function (req, res) {
  let db_connect = dbo.getDB();
  
  try {
    const records = await db_connect.collection('records').insertMany(data)
    res.json(records);
  } catch (error) {
    console.log("An error occurred creating the deleting daily record. " + error);
  }

});

module.exports = recordRoutes;