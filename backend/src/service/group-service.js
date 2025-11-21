import {
  GetUserGroups,
  GetSelectGroups,
  RenameGroup,
  AddGroup,
  DeleteGroup,
} from "../models/groups.js";

// ---------------------------------------------------------
// 사용자의 전체 그룹 조회
// ---------------------------------------------------------
export const getUserGroups = async (userId) => {
  const groups = await GetUserGroups(userId);
  //   console.log("groups:", groups);
  return groups;
};

// ---------------------------------------------------------
// 채널이 없는 그룹 조회
// ---------------------------------------------------------
export const GetSelectGroups = async (user_id, channel_id) => {
  // 채널이 없는 사용자 그룹 조회
  const groups = await GetSelectGroups(user_id, channel_id);

  // 저장 가능한 그룹과 id반환
  return groups;
};

// ======================  POST.PATCH  ======================
// ---------------------------------------------------------
// Rename Group / Add Group
// ---------------------------------------------------------
export const patchGroupName = async (groupId, group_name, user_id) => {
  // 수정 / 추가
  if (groupId != "null") await RenameGroup(groupId, group_name);
  else await AddGroup(user_id, group_name);
  return group_name;
};

// =========================  DEL  =========================
// ---------------------------------------------------------
// delete Group
// ---------------------------------------------------------
export const deleteGroup = async (groupId) => {
  await DeleteGroup(groupId);
};
