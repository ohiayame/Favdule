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
import { format, addDays } from "date-and-time";
import { searchVideos } from "../controllers/youtubeController.js";

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
  console.log("groupId", groupId);
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

// ---------------------------------------------------------
// 그룹의 영상 조회
// ---------------------------------------------------------
// 1) 그룹의 channelId조회
export const getGroupVideos = async (req, res) => {
  const { groupId } = req.params;
  const channels = await GetChannels(groupId);

  let result = null;
  const now = new Date(); // 현재
  const yesterdayStart = getKSTMidnightRFC3339(now, -1);
  const tomorrowEnd = getKSTMidnightRFC3339(now, 2);

  // 2) 각 채널의 어제 ~ 내일의 영상 조회
  const videos = await Promise.all(
    channels.map(async (channel) => {
      return await searchVideos(channel.channelId, yesterdayStart, tomorrowEnd);
    })
  );
  // console.log("videos", videos.flat());
  result = videos.flat();
  // 시간 축으로 정렬
  const sortResult = result.sort(
    (a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt)
  );

  // 어제, 오늘 내일로 분할
  const resList = { yesterday: [], today: [], tomorrow: [] }; // 반환할 객체
  const yesterday_today = new Date(getKSTMidnightRFC3339(now)); // 어제까지
  const today_tomorrow = new Date(getKSTMidnightRFC3339(now, 1)); // 오늘까지
  // 시간축으로 정렬한 영상들을 날짜별로 분할
  sortResult.map((vi) => {
    const videoTime = new Date(vi.snippet.publishedAt);
    if (yesterday_today > videoTime) {
      // 어제
      resList.yesterday.push(vi);
    } else if (today_tomorrow > videoTime) {
      // 오늘
      resList.today.push(vi);
    } else {
      // 어제
      resList.tomorrow.push(vi);
    }
  });

  console.log("result", resList);
  res.json(resList);
};

// ---------------------------------------------------------
// 시간 계산 함수
// ---------------------------------------------------------
function getKSTMidnightRFC3339(baseDate, offsetDays = 0) {
  const target = addDays(baseDate, offsetDays);

  // 한국 기준 0시
  const kstMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
    0,
    0,
    0
  );

  // UTC 변환 (KST = UTC+9 → 9시간 빼줌)
  const utcTime = new Date(kstMidnight.getTime() - 9 * 60 * 60 * 1000);

  return utcTime.toISOString();
}
