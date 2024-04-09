const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const data = require("../data")
const datas = require("../datas")

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
    //let ObjectId = new ObjectID();
    let myQuery = { _id: new ObjectId( req.params.id ) };
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
    let myQuery = { name: req.body.childName };
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
      childName: req.body.childName,
      childFamilieName: req.body.childFamilieName,
      childDateOfBirth: req.body.childDateOfBirth,
      childSchool: req.body.childSchool,
      childLevel: req.body.childLevel,
      childGender: req.body.childGender,
      childPassport: req.body.childPassport,
      streetAndHouseNumber: req.body.streetAndHouseNumber,
      postalCodeAndCity: req.body.postalCodeAndCity,
      parentName1: req.body.parentName1,
      parentFamilieName1: req.body.parentFamilieName1,
      parentTel1: req.body.parentTel1,
      parentEmail1: req.body.parentEmail1,
      parentDOB: req.body.parentDOB,
      parentName2: req.body.parentName2,
      parentFamilieName2: req.body.parentFamilieName2,
      parentTel2: req.body.parentTel2,
      parentEmail2: req.body.parentEmail2,
      parentSSN: req.body.parentSSN,
      childSSN: req.body.childSSN,
      childAllergies: req.body.childAllergies,
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
      console.log("An error occurred creating the record. " + error);
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
    //let ObjectID = new ObjectId();
    let myQuery = { _id: new ObjectId( req.params.id ) };
    let newValues = {
      $set: {
        childName: req.body.childName,
        childFamilieName: req.body.childFamilieName,
        childDateOfBirth: req.body.childDateOfBirth,
        childSchool: req.body.childSchool,
        childLevel: req.body.childLevel,
        childGender: req.body.childGender,
        childPassport: req.body.childPassport,
        streetAndHouseNumber: req.body.streetAndHouseNumber,
        postalCodeAndCity: req.body.postalCodeAndCity,
        parentName1: req.body.parentName1,
        parentFamilieName1: req.body.parentFamilieName1,
        parentTel1: req.body.parentTel1,
        parentEmail1: req.body.parentEmail1,
        parentDOB: req.body.parentDOB,
        parentName2: req.body.parentName2,
        parentFamilieName2: req.body.parentFamilieName2,
        parentTel2: req.body.parentTel2,
        parentEmail2: req.body.parentEmail2,
        parentSSN: req.body.parentSSN,
        childSSN: req.body.childSSN,
        childAllergies: req.body.childAllergies,
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
      console.log("An error occurred updating the record. " + error);
    }
})

// delete a record
recordRoutes.route("/:id").delete(async function(req, res) {
    let db_connect = dbo.getDB();
    //let ObjectID = new ObjectId();
    let myQuery = { _id: new ObjectId( req.params.id ) };
    try {
      const record = await db_connect
        .collection("records")
        .deleteOne(myQuery)
        res.json(record)
    } catch (error) {
      console.log("An error occurred deleting the record. " + error);
    }
    
})

// delete a daily registration
recordRoutes.route('/record/deleteAStat/:id').delete(async function(req, res){
    let db_connect = dbo.getDB();
    //let ObjectID = new ObjectId();
    let myQuery = { _id: new ObjectId( req.params.id )};
    try {
      const record = await db_connect.collection("statDatas").deleteOne(myQuery)
      res.json(record)
    } catch (error) {
      console.log("An error occurred deleting a daily record. " + error);
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
    const records = await db_connect.collection('records').insertMany(datas)
    res.json(records);
  } catch (error) {
    console.log("An error occurred saving all the records. " + error);
  }

});

module.exports = recordRoutes;