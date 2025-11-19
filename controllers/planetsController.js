const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const stars = await mongodb.getDb().db().collection('planets').find().toArray();
        res.status(200).json(stars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const planet = await mongodb.getDb().db().collection('planets').findOne({ _id: id });
        if (!planet) {
            return res.status(404).json({ message: "Planet not found" });
        }
        res.status(200).json([planet]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createPlanet = async (req, res) => {
    try {
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
            throw new Error('Some error occurred while creating the entry.');
        }
    } catch (err) {
        next(err);
    }
}

const updatePlanet = async (req, res) => {
    try {
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
    } catch (err) {
        next(err);
    }
}

const deletePlanet = async (req, res) => {
    try {
        const planetId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('planets').deleteOne({ _id: planetId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the entry.');
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getSingle,
    createPlanet,
    updatePlanet,
    deletePlanet
};