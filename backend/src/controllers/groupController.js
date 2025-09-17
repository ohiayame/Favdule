import {
  GetUserGroups,
  GetSelectGroups,
  RenameGroup,
} from "../models/groups.js";
import {
  GetChannels,
  GetChannelsId,
  AddChannel,
  AddGroupChannels,
  DeleteGroupChannel,
} from "../models/channels.js";

// ---------------------------------------------------------
// 사용자의 전체 그룹 조회
// ---------------------------------------------------------
export const getUserGroups = async (req, res) => {
  const { userId } = req.params;

  const groups = await GetUserGroups(userId);
  console.log("groups:", groups);

  res.json(groups);
};

// ---------------------------------------------------------
// 그룹의 전체 채널 조회
// ---------------------------------------------------------
export const getGroupChannels = async (req, res) => {
  const { groupId } = req.params;

  const channels = await GetChannels(groupId);
  res.json(channels);
};

// ---------------------------------------------------------
// 채널 id 조회 (추가 후 id 받아오기) -> 채널이 없는 그룹 조회
// ---------------------------------------------------------
export const getOrCreateChannelsIdANDgetGroups = async (req, res) => {
  const channel = req.body.channel; // 객체
  const user_id = req.body.user_id;
  // console.log("channel -> ", channel);
  console.log("user_id -> ", user_id);
  // id 조회
  let c_id = await GetChannelsId(channel.channelId);
  console.log("c_id", c_id);

  // 없으면 추가 (id 받음)
  if (c_id.length === 0) {
    console.log("channel 없음");
    c_id = await AddChannel(channel);
  } else {
    console.log("channel 있음");
  }

  // 채널이 없는 사용자 그룹 조회
  const groups = await GetSelectGroups(user_id, c_id);

  // 저장 가능한 그룹과 id반환
  res.json({ groups: groups, channel_id: c_id });
};

// ---------------------------------------------------------
// 채널을 그룹에 추가
// ---------------------------------------------------------
export const postGroupsChannel = async (req, res) => {
  console.log(req.body);
  const groupsIds = req.body.groupIds; // 배열
  const channel_id = req.body.channel_id;

  // for) groupIds [channels : id, user_groups : id]
  groupsIds.forEach(async (g_id) => {
    await AddGroupChannels(g_id, channel_id);
  });

  console.log("추가 완료");
  res.json({ success: true });
};

// ---------------------------------------------------------
// Rename Group
// ---------------------------------------------------------
export const patchGroupName = async (req, res) => {
  const { groupId } = req.params;
  const group_name = req.body.name;
  // 수정
  await RenameGroup(groupId, group_name);
  res.json(group_name);
};

// ---------------------------------------------------------
// delete channel
// ---------------------------------------------------------
export const deleteChannel = async (req, res) => {
  const { groupId, channel_id } = req.params;
  const response = await DeleteGroupChannel(groupId, channel_id);
  res.json(response);
};
