const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb.getDb().db().collection('planets').find().toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    })
};

const getSingle = (req, res) => {
    const userId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('planets').find({ _id: userId }).toArray((err, planets) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(planets[0]);
    });
};

const createPlanet = async (req, res) => {
    const planet = {
        name: req.body.name,
        starName: req.body.starName,
        starDistance: req.body.starDistance,
        mass: req.body.mass,
        gravity: req.body.gravity,
        moons: req.body.moons,
        day: req.body.day,
        year: req.body.year
    }
    const response = await mongodb.getDb().db().collection('planets').insertOne(planet);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the entry.');
    }
}

const updatePlanet = async (req, res) => {
    const planetId = new ObjectId(req.params.id);
    const planet = {
        name: req.body.name,
        starName: req.body.starName,
        starDistance: req.body.starDistance,
        mass: req.body.mass,
        gravity: req.body.gravity,
        moons: req.body.moons,
        day: req.body.day,
        year: req.body.year
    }
    const response = await mongodb.getDb().db().collection('planets').replaceOne({ _id: planetId }, planet);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the entry.');
    }
}

const deletePlanet = async (req, res) => {
    const planetId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('planets').deleteOne({ _id: planetId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the entry.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createPlanet,
    updatePlanet,
    deletePlanet
};