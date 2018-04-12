export default {
  Mutation: {
    createTeam: async (parent, args, { models }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};