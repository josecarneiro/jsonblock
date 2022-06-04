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

router.get('/:block', async (req, res, next) => {
  try {
    const { block } = req.params;
    const resources = await Resource.find({ block });
    res.json(resources.map(formatResource));
  } catch (error) {
    next(error);
  }
});

router.get('/:block/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    const resource = await Resource.findOne({ _id: id, block });
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.post('/:block', async (req, res, next) => {
  try {
    const { block } = req.params;
    const data = req.body ? formatData(req.body) : {};
    const resource = await Resource.create({ block, data });
    res.json(resource && formatResource(resource));
  } catch (error) {
    next(error);
  }
});

router.patch('/:block/:id', async (req, res, next) => {
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

router.put('/:block/:id', async (req, res, next) => {
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

router.delete('/:block/:id', async (req, res, next) => {
  try {
    const { block, id } = req.params;
    await Resource.findOneAndDelete({ block, _id: id });
    res.json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
