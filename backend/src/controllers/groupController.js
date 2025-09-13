import GetGroups from "../models/groups.js";

export const getUserGroups = async (req, res) => {
  const { userId } = req.params;

  const groups = await GetGroups(userId);
  console.log("groups:", groups);

  res.json(groups);
};
