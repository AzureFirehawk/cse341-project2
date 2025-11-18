const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const stars = await mongodb.getDb().db().collection('stars').find().toArray();
        res.status(200).json(stars);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const id = new ObjectId(req.params.id);
        const star = await mongodb.getDb().db().collection('stars').findOne({ _id: id });
        if (!star) {
            return res.status(404).json({ message: "Star not found" });
        }
        res.status(200).json(star);
    } catch (err) {
        next(err);
    }
};


const createStar = async (req, res) => {
    try {
        const star = {
            name: req.body.name,
            distance: req.body.distance,
            radius: req.body.radius,
            mass: req.body.mass,
            spectralClass: req.body.spectralClass
        }
        const response = await mongodb.getDb().db().collection('stars').insertOne(star);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the entry.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateStar = async (req, res) => {
    const starId = new ObjectId(req.params.id);
    const star = {
        name: req.body.name,
        distance: req.body.distance,
        radius: req.body.radius,
        mass: req.body.mass,
        spectralClass: req.body.spectralClass
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