import { useState, useEffect } from "react";
import { getGroupChannels, deleteChannel } from "@/api/groupsApi";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function GroupChannels({ groupId }) {
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));
  const [channels, setChannels] = useState([]);
  const [isClick, setClick] = useState(false);

  // 해당 그룹의 채널 조회
  const fetchChannels = async () => {
    let resChannels = null;
    if (!user) {
      resChannels = groupData[groupId];             // 비회원 : LS
      // console.log(groupData[groupId]);
    } else {
      resChannels = await getGroupChannels(groupId);// 회원 : get
      // console.log("resChannels", resChannels);
    }
    setChannels(resChannels);
  };

  useEffect(() => {
    fetchChannels();
  }, [groupId]);

  // 채널 삭제
  const handleDeleteChannel = async (channel_id) => {
    if (!user) {
      // console.log(groupId, channel_id);
      groupData[groupId] = groupData[groupId].filter(
        (_, idx) => idx != channel_id
      );
      // console.log(groupData);
      // 해당 채널 이외를 다시 저장
      localStorage.setItem("groupData", JSON.stringify(groupData));
    } else {
      // 회원 : del
      const isDelete = await deleteChannel(groupId, channel_id);
      console.log(isDelete);
    }
    fetchChannels();
  };

  const handleSearch = () => {
    setClick(true);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      {/* 채널 출력 */}
      {channels && channels.length > 0 && (
        <List>
          {channels.map((channel, idx) => (
            <ListItem
              key={idx}
              secondaryAction={
                // 맨 오른 쪽에 출력 : 쓰래기통
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteChannel(user ? channel.id : idx)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              {/* 사진 */}
              <ListItemAvatar sx={{ minWidth: 72 }}>
                <Avatar
                  src={channel.img}
                  alt={channel.channelTitle}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              {/* 채널 이름 */}
              <ListItemText
                primary={channel.channelTitle}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "3.5vw",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* 추가 (검색 페이지 이동) */}
      <ListItem
        onClick={handleSearch}
        secondaryAction={
          <IconButton edge="end">
            <AddIcon />  
          </IconButton>
        }
      >
        <ListItemAvatar sx={{ minWidth: 72 }}>
          <Avatar sx={{ width: 56, height: 56 }} />
        </ListItemAvatar>
        <ListItemText
          primary="새로운 채널 추가"
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "3.5vw",
            },
          }}
        />
      </ListItem>

      {/* 검색 페이지 이동 */}
      {isClick && <Navigate to="/search" replace />}
    </Box>
  );
}

export default GroupChannels;
