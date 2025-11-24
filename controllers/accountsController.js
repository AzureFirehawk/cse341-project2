const mongodb = require('../db/connect');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const accounts = await mongodb.getDb().db().collection('accounts').find().toArray();
        res.status(200).json(accounts);
    } catch (err) {
        next(err);
    }
}

const getSingle = async (req, res, next) => {
    try {
        let id;
        try {
            id = new ObjectId(req.params.id);
        } catch (err) {
            return next(createError(400, 'Invalid Account ID'));
        }
        const account = await mongodb.getDb().db().collection('accounts').findOne({ _id: id });
        if (!account) {
            throw createError(404, 'Account not found');
        }
        res.status(200).json(account);
    } catch (err) {
        next(err);
    }
}

const checkDuplicate = async (req, res, next) => {
    try {
        const account = await mongodb.getDb().db().collection('accounts')
            .findOne({ email: req.body.email });
        if (account) {
            return next(createError(400, 'Email already in use'));
        }
        next();
    } catch (err) {
        next(err);
    }
}

const createAccount = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const account = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role
        }
        const response = await mongodb.getDb().db().collection('accounts').insertOne(account);
        if (!response.acknowledged) {
            throw createError(500, 'Some error occurred while creating the entry.');
        } 
        res.status(201).json({
            message: 'Account created successfully',
            userId: response.insertedId
        });
    } catch (err) {
        next(err);
    }
}

const updateAccount = async (req, res, next) => {
    try {
        const accountId = new ObjectId(req.params.id);
        const account = {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        }
        const response = await mongodb.getDb().db().collection('accounts').replaceOne({ _id: accountId }, account);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Some error occurred while updating the entry.');
        }
    } catch (err) {
        next(err);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const accountId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('accounts').deleteOne({ _id: accountId });
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
    checkDuplicate,
    createAccount,
    updateAccount,
    deleteAccount
};