const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('stars').find();
    result.toArray().then((stars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(stars);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('stars').find({ _id: userId });
    result.toArray().then((stars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(stars[0]);
    });
};

const createStar = async (req, res) => {
    const star = {
        name: req.body.name,
        distance: req.body.distance,
        stellarMass: req.body.mass,
        luminosity: req.body.luminosity,
        color: req.body.color
    }
    const response = await mongodb.getDb().db().collection('stars').insertOne(star);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the entry.');
    }
};

const updateStar = async (req, res) => {
    const starId = new ObjectId(req.params.id);
    const star = {
        name: req.body.name,
        distance: req.body.distance,
        stellarMass: req.body.mass,
        luminosity: req.body.luminosity,
        color: req.body.color
    }
    const response = await mongodb.getDb().db().collection('stars').replaceOne({ _id: starId }, star);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the entry.');
    }
};

const deleteStar = async (req, res) => {
    const starId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('stars').deleteOne({ _id: starId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the entry.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createStar,
    updateStar,
    deleteStar
};