import {
  GetUserGroups,
  GetSelectGroups,
  RenameGroup,
  AddGroup,
  DeleteGroup,
} from "../models/groups.js";
import {
  GetChannels,
  GetChannelsId,
  AddChannel,
  AddGroupChannels,
  DeleteGroupChannel,
} from "../models/channels.js";
import { addDays } from "date-and-time";
import { searchVideos, v_info } from "../controllers/youtubeController.js";

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
// Rename Group / Add Group
// ---------------------------------------------------------
export const patchGroupName = async (req, res) => {
  const { groupId } = req.params;
  const group_name = req.body.name;
  const user_id = req.body.user_id;
  console.log("groupId", groupId, user_id);
  // 수정 / 추가
  if (groupId != "null") await RenameGroup(groupId, group_name);
  else await AddGroup(user_id, group_name);
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
// delete Group
// ---------------------------------------------------------
export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  await DeleteGroup(groupId);
  res.json(true);
};

// ---------------------------------------------------------
// 그룹의 영상 조회
// ---------------------------------------------------------
// 1) 그룹의 channelId조회
export const getGroupVideos = async (req, res) => {
  const groupId = req.body.groupId;
  let channels = req.body.channels;
  console.log(groupId, channels);
  if (groupId) {
    channels = await GetChannels(groupId);
  }

  let result = null;

  // 2) 각 채널의 최근에 업로드된 영상 10개 조회
  const videos = await Promise.all(
    channels?.map(async (channel) => {
      const video = await searchVideos(channel.channelId);
      // 3) videoId로 liveStreamingDetails를 검색해서 방송 및 방송예정 시간을 조회
      const v_Id = video.map((v) => v.id.videoId);
      return await v_info(v_Id);
    })
  );
  // console.log("videos", videos.flat());
  result = videos.flat();
  console.log("video", result[4]);

  // 4) 시간축이로 정렬
  // - 방송시작 후면 actualStartTime
  // - 방송예정이면 scheduledStartTime
  // - liveStreamingDetails 없는 영상
  const sortV_li = result.sort(
    (a, b) =>
      new Date(
        a.liveStreamingDetails?.actualStartTime ??
          a.liveStreamingDetails?.scheduledStartTime ??
          a.snippet?.publishedAt
      ) -
      new Date(
        b.liveStreamingDetails?.actualStartTime ??
          b.liveStreamingDetails?.scheduledStartTime ??
          b.snippet?.publishedAt
      )
  );

  // 필요한 정보 추출 후 저장
  let pushVideo = [];

  // 5) 데이터 수정, 추출 후 저장
  sortV_li.map((vi) => {
    //  RFC 3339형식의 데이터에서 한국기준의 날짜와 시간을 추출 {day:"00-00", time: "00:00"}
    const krVideoTime = getDayTime(
      new Date(
        vi.liveStreamingDetails?.actualStartTime ??
          vi.liveStreamingDetails?.scheduledStartTime ??
          vi.snippet?.publishedAt
      )
    );
    // console.log("krVideoTime", krVideoTime);

    // 6) 데이터 정리 후 저장
    // 체널 이름, 영상 제목, 썸네일, 시간({date:"00-00", time: "00:00"})
    pushVideo.push({
      id: vi.id,
      channelTitle: vi.snippet.channelTitle,
      title: vi.snippet.localized.title,
      thumbnails: vi.snippet.thumbnails.medium.url,
      time: krVideoTime,
    });
  });

  // 7) 날짜 계산
  const now = new Date(); // 현재
  // console.log("today");
  const today = getDayTime(now); // 오늘 {day:"00-00", time: "00:00"}
  // console.log("minDay");
  const minDay = getDayTime(addDays(now, -1)); // 어제 {day:"00-00", time: "00:00"}
  // console.log("maxDay");
  const maxDay = getDayTime(addDays(now, +1)); // // 내일 {day:"00-00", time: "00:00"}

  // 8) 어제, 오늘 내일로 분할
  const resList = { yesterday: [minDay], today: [today], tomorrow: [maxDay] }; // 반환할 객체

  pushVideo.map((vi) => {
    // 날짜가 같은 데에 추가
    if (minDay.date === vi.time.date) {
      resList.yesterday.push(vi);
    } else if (today.date === vi.time.date) {
      resList.today.push(vi);
    } else if (maxDay.date === vi.time.date) {
      resList.tomorrow.push(vi);
    }
  });
  console.log("result", resList);
  res.json(resList);
};

// ---------------------------------------------------------
// 시간 계산 함수
// ---------------------------------------------------------
function getDayTime(baseDate) {
  // 받아온 baseDate를 "Asia/Seoul"로 변환
  const kst = new Date(
    baseDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  // 변환
  // 예)  2026-09-09T22:10:00Z
  // slice 5~6 -> 09-09, 11~16 -> 22:10
  const strKst = kst.toISOString();
  const date = strKst.slice(5, 10);
  const time = strKst.slice(11, 16);

  // console.log("baseDate", baseDate, "date", date, time);
  return { date, time };
}
