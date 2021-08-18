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

const updateTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const speakers = await speakersUtil.readSpeakers();
  const talker = speakers.find((item) => item.id === +id);
  const response = { ...talker, age, name, talk };
  const newArr = [...speakers, response];
  await speakersUtil.writeSpeakers(newArr);
  return res.status(200).json(response);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const verify = new VerifyCredentials(req, res);
  const vToken = verify.verifyToken();
  if (vToken) {
    const speakers = await speakersUtil.readSpeakers();
    const newSpeakers = speakers.filter((item) => item.id !== +id);
    await speakersUtil.writeSpeakers(newSpeakers);
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const verify = new VerifyCredentials(req, res);
  const vToken = verify.verifyToken();
  const speakers = await speakersUtil.readSpeakers();

  if (!q) {
    return res.status(200).json(speakers);
  }
  const newArr = speakers.filter((item) => item.name.includes(q));

  if (vToken) {
  res.status(200).json(newArr);
  }
};

module.exports = {
  getAllTalkers,
  getTalker,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};
