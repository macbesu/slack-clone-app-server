export default (sequelize, Datatypes) => {
  const Member = sequelize.define('member', {
    admin: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    }
  });

  return Member;
};
