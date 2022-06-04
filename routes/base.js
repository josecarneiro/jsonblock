'use strict';

const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

const formatResource = ({ _id, createdAt, updatedAt, data }) => ({
  ...data,
  _id,
  createdAt,
  updatedAt
});

const formatData = ({ _id, createdAt, updatedAt, ...data }) => data;

router.get('/', async (req, res, next) => {
  try {
    const { block } = req.params;
    const resources = await Resource.find({ block });
    res.json(resources.map(formatResource));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    const resource = await Resource.findOne({ _id: id, block });
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { block } = req.params;
    const data = req.body ? formatData(req.body) : {};
    const resource = await Resource.create({ block, data });
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    const data = req.body ? formatData(req.body) : {};
    const resource = await Resource.findOneAndUpdate(
      { block, _id: id },
      { data },
      { new: true }
    );
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    const data = req.body ? formatData(req.body) : {};
    const resource = await Resource.findOneAndUpdate(
      { block, _id: id },
      { data },
      { new: true }
    );
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    await Resource.findOneAndDelete({ block, _id: id });
    res.json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
