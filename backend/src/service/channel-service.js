import {
  GetChannels,
  GetChannelsId,
  AddChannel,
  AddGroupChannels,
  DeleteGroupChannel,
} from "../models/channels.js";
import { searchVideos, v_info } from "../controllers/youtubeController.js";
import { addDays } from "date-and-time";

// ---------------------------------------------------------
// 그룹의 전체 채널 조회
// ---------------------------------------------------------
export const getGroupChannels = async (groupId) => {
  const channels = await GetChannels(groupId);
  return channels;
};

// ---------------------------------------------------------
// 채널 id값 조회 (추가 후 id 받아오기
// ---------------------------------------------------------
export const GetChannelId = async (channel) => {
  // id 조회
  let channel_id = await GetChannelsId(channel.channelId);

  // 없으면 추가 (id 받음)
  if (channel_id.length === 0) {
    console.log("channel 없음");
    channel_id = await AddChannel(channel);
  }
  return channel_id;
};

// ---------------------------------------------------------
// 그룹의 영상 조회
// ---------------------------------------------------------
// 1) 그룹의 channelId조회
export const getGroupVideos = async (channels) => {
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
  return resList;
};

// =========================  POST  =========================
// ---------------------------------------------------------
// 채널을 그룹에 추가
// ---------------------------------------------------------
export const postGroupsChannel = async (groupsIds, channel_id) => {
  // for) groupIds [channels : id, user_groups : id]
  groupsIds.forEach(async (g_id) => {
    await AddGroupChannels(g_id, channel_id);
  });
};

// =========================  DEL  =========================
// ---------------------------------------------------------
// delete channel
// ---------------------------------------------------------
export const deleteChannel = async (groupId, channel_id) => {
  const response = await DeleteGroupChannel(groupId, channel_id);
  return response;
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
