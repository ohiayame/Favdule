import * as groupService from "../service/group-service.js";
import * as channelService from "../service/channel-service.js";

// ---------------------------------------------------------
// 사용자의 전체 그룹 조회
// ---------------------------------------------------------
export const getUserGroups = async (req, res) => {
  const { userId } = req.params;
  const groups = await groupService.getUserGroups(userId);
  // console.log("groups:", groups);
  res.status(200).json(groups);
};

// ---------------------------------------------------------
// c 그룹의 전체 채널 조회
// ---------------------------------------------------------
export const getGroupChannels = async (req, res) => {
  const { groupId } = req.params;
  // console.log("groupId", groupId);
  const channels = await channelService.getGroupChannels(groupId);
  res.status(200).json(channels);
};

// ---------------------------------------------------------
// c,g 채널 id 조회 (추가 후 id 받아오기) -> 채널이 없는 그룹 조회
// ---------------------------------------------------------
export const getOrCreateChannelsIdANDgetGroups = async (req, res) => {
  const channel = req.body.channel; // 객체
  const user_id = req.body.user_id;

  const channel_id = await channelService.GetChannelId(channel);
  const groups = await groupService.GetSelectGroups(user_id, channel_id);

  // 저장 가능한 그룹과 id반환
  res.status(200).json({ groups, channel_id });
};

// ---------------------------------------------------------
// c 채널을 그룹에 추가
// ---------------------------------------------------------
export const postGroupsChannel = async (req, res) => {
  const groupsIds = req.body.groupIds; // 배열
  const channel_id = req.body.channel_id;

  await channelService.postGroupsChannel(groupsIds, channel_id);
  // console.log("추가 완료");
  res.status(200).json({ success: true });
};

// ---------------------------------------------------------
// g Rename Group / Add Group
// ---------------------------------------------------------
export const patchGroupName = async (req, res) => {
  const { groupId } = req.params;
  const group_name = req.body.name;
  const user_id = req.body.user_id;
  await groupService.patchGroupName(groupId, group_name, user_id);
  res.status(200).json(group_name);
};

// ---------------------------------------------------------
// c delete channel
// ---------------------------------------------------------
export const deleteChannel = async (req, res) => {
  const { groupId, channel_id } = req.params;
  const response = await channelService.deleteChannel(groupId, channel_id);
  res.status(200).json(response);
};

// ---------------------------------------------------------
// g delete Group
// ---------------------------------------------------------
export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  await groupService.deleteGroup(groupId);
  res.status(200).json(true);
};

// ---------------------------------------------------------
// 그룹의 영상 조회
// ---------------------------------------------------------
export const getGroupVideos = async (req, res) => {
  const groupId = req.body.groupId;
  let channels = req.body.channels;
  if (groupId) {
    channels = await groupService.getGroupChannels(groupId);
  }
  const resList = channelService.getGroupVideos(channels);
  res.status(200).json(resList);
};