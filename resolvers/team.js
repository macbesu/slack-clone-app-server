export default {
  Mutation: {
    createTeam: (parent, args, { models }) => models.Team.create(args),
  },
};