import formatErrors from '../utils/formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
      models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    addTeamMember: requiresAuth.createResolver( async (parent, { email, teamId }, { models, user }) => {
      try {
        const teamPromise = models.findOne({ where: { id: teamId } }, { raw: true });
        const userToAdd = models.findOne({ where: { email } }, { raw: true });

        if (team.owner !== user.id) {
          return {
            ok: false,
          };
        }
        
        await models.Member.create({ userId: userToAdd.id, teamId });
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    }),
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });
        await models.Channel.create({ name: 'general', public: true, teamId: team.id });
        return {
          ok: true,
          team,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    }),
  },
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { teamId: id } }),
  }
};