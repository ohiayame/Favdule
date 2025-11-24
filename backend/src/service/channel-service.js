import {
  GetChannels,
  GetChannelsId,
  AddChannel,
  AddGroupChannels,
  DeleteGroupChannel,
} from "../models/channels.js";
import { searchVideos, v_info } from "./youtube-service.js";
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
export const getGroupVideos = async (channels) => {
  // 1) 각 채널의 최근에 업로드된 영상 10개 조회
  const video = (
    await Promise.all(
      channels?.map((channel) => searchVideos(channel.channelId))
    )
  ).flat();

  let resultV = [];
  let notNoneV = [];
  // 2) snippet.liveBroadcastContent 상태가 none이면 바로 resultV에 추가
  //    아니면 notNoneV에 id 추가
  video.forEach((v) =>
    v.snippet.liveBroadcastContent == "none"
      ? resultV.push(v)
      : notNoneV.push(v.id.videoId)
  );

  // 3) snippet.liveBroadcastContent 상태가 있었던 video의
  // 상세 정보 조회후 resultV에 추가
  if (notNoneV.length > 0) resultV.push(...(await v_info(notNoneV)));
  // console.log(resultV[19]);


  // 4) 데이터 수정, 추출 후 저장
  const pushVideo = resultV.map((vi) => {
    const time =
      vi?.liveStreamingDetails?.actualStartTime ?? // 방송시작 후
      vi?.liveStreamingDetails?.scheduledStartTime ?? // 방송 예정
      vi.snippet?.publishedAt;

    //  RFC 3339형식의 데이터에서 한국기준의 날짜와 시간을 추출 {day:"00-00", time: "00:00"}
    const krVideoTime = getDayTime(new Date(time));
    // console.log("krVideoTime", krVideoTime);

    // 5) 데이터 정리 후 저장
    return {
      id: vi.id?.videoId ?? vi.id, // videoId
      channelTitle: vi.snippet.channelTitle, // 채널 이름
      title: vi.snippet.title, // 제목
      thumbnails: vi.snippet.thumbnails.medium.url, // 썸네일
      originTime: new Date(time), // 시간
      time: krVideoTime, // {day:"00-00", time: "00:00"}
      liveBroadcastContent: vi.snippet.liveBroadcastContent, // 'none','upcoming','live'
    };
  });

  // 3) 시간축이로 정렬
  pushVideo.sort((a, b) => a.originTime - b.originTime);

  // 6) 날짜 계산
  const now = new Date(); // 현재
  const today = getDayTime(now); // 오늘 {day:"00-00", time: "00:00"}
  const minDay = getDayTime(addDays(now, -1)); // 어제 {day:"00-00", time: "00:00"}
  const maxDay = getDayTime(addDays(now, +1)); // 내일 {day:"00-00", time: "00:00"}

  // 7) 어제, 오늘 내일로 분할
  const resList = { yesterday: [minDay], today: [today], tomorrow: [maxDay] }; // 반환할 객체
  pushVideo.forEach((vi) => {
    if (minDay.date === vi.time.date) {
      resList.yesterday.push(vi);
    } else if (today.date === vi.time.date) {
      resList.today.push(vi);
    } else if (maxDay.date === vi.time.date) {
      resList.tomorrow.push(vi);
    }
  });

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
