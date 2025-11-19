const mongodb = require('../db/connect');
const createError = require('http-errors');
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
        let id;
        try{
            id = new ObjectId(req.params.id);
        } catch (err) {
            return next(createError(400, 'Invalid Star ID'));
        }
        const star = await mongodb.getDb().db().collection('stars').findOne({ _id: id });
        if (!star) {
            throw createError(404, 'Star not found');
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
            throw new Error('Some error occurred while creating the entry.');
        }
    } catch (err) {
        next(err);
    }
};

const updateStar = async (req, res) => {
    try {
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
            throw new Error('Some error occurred while updating the entry.');
        }
    } catch (err) {
        next(err);
    }
};

const deleteStar = async (req, res) => {
    try {
        const starId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('stars').deleteOne({ _id: starId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
           throw new Error('Some error occurred while deleting the entry.');
        }    
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createStar,
    updateStar,
    deleteStar
};