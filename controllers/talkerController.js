const speakersUtil = require('../utils/fs-utils');
const VerifyCredentials = require('../utils/verifyCredentials');

const getAllTalkers = async (req, res) => {
  const speakers = await speakersUtil.readSpeakers();
  if (!speakers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(speakers);
};

const getTalker = async (req, res) => {
  const { id } = req.params;
  const speakers = await speakersUtil.readSpeakers();
  const talker = speakers.find((item) => item.id === +id);
  if (!talker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const speakers = await speakersUtil.readSpeakers();
  const len = speakers.length;
  const response = { id: len + 1, age, name, talk };
  const newArr = [...speakers, response];
  await speakersUtil.writeSpeakers(newArr);
  return res.status(201).json(response);
};

module.exports = {
  getAllTalkers,
  getTalker,
  createTalker,
};
