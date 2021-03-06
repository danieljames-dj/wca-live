const { AuthenticationError } = require('apollo-server-express');
const competitionLoader = require('../competition-loader');
const { hasAccess } = require('../logic/competition');

const requireCompetition = async id => {
  const competition = await competitionLoader.get(id);
  if (!competition) {
    throw new Error('Competition not found.');
  }
  return competition;
};

const requireRole = async (role, competitionId, user, session) => {
  const competition = await requireCompetition(competitionId);
  if (!hasAccess(role, competition, user, session)) {
    throw new AuthenticationError('Not authorized.');
  }
  return competition;
};

module.exports = {
  requireCompetition,
  requireRole,
};
