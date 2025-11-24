const { check } = require('express-validator');
const mongodb = require('../db/connect');
const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectId;

const checkDuplicate = async (req, res, next) => {
    try {
        const user = await mongodb.getDb().db().collection('users')
            .findOne({ email: req.body.email });
        if (user) {
            return next(createError(400, 'Email already in use'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        }
        const response = await mongodb.getDb().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            throw new Error('Some error occurred while creating the entry.');
        }
    } catch (err) {
        next(err);
    }
}



module.exports = {
    checkDuplicate,
    createUser
};