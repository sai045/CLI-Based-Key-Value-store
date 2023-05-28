const KeyValue = require('../models/KeyValue');

exports.store = async (req, res) => {
  try {
    const { key, value } = req.body;

    const existingPair = await KeyValue.findOne({ key });
    if (existingPair) {
      return res.status(400).json({ error: 'Key already exists' });
    }

    const pair = new KeyValue({ key, value });
    await pair.save();

    res.json({ message: 'Key-value pair stored successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.retrieve = async (req, res) => {
  try {
    const { key } = req.params;

    const pair = await KeyValue.findOne({ key });
    if (!pair) {
      return res.status(404).json({ error: 'Key not found' });
    }

    res.json({ value: pair.value });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.update = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const pair = await KeyValue.findOne({ key });
    if (!pair) {
      return res.status(404).json({ error: 'Key not found' });
    }

    pair.value = value;
    await pair.save();

    res.json({ message: 'Key-value pair updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { key } = req.params;

    const result = await KeyValue.deleteOne({ key });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Key not found' });
    }

    res.json({ message: 'Key-value pair deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
