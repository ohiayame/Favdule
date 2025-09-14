import GetGroups from "../models/groups.js";
import GetChannels from "../models/channels.js";

export const getUserGroups = async (req, res) => {
  const { userId } = req.params;

  const groups = await GetGroups(userId);
  // console.log("groups:", groups);

  res.json(groups);
};

export const getGroupChannels = async (req, res) => {
  const { groupId } = req.params;

  const channels = await GetChannels(groupId);
  res.json(channels);
};
