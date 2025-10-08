import Layout from "@/layouts/Layout";
import { useState, useEffect } from "react";
import { getChannels } from "@/api/channelsApi";
import Modal from "react-modal";
import ModalGroup from "@/pages/Search/ModalGroup";
import { useSubscStore } from "@/store/auth";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

function SearchPage() {
  const [q, setQ] = useState(""); // 검색어
  const [channels, setChannels] = useState([]); // 조회한 채널
  const [isOpen, setIsOpen] = useState(false); // 모달 상태
  const [selectedChannel, setSelectedChannel] = useState();

  const subsc = useSubscStore((state) => state.subsc);
  // console.log(subsc);

  // 채널 조회
  const fetchChannels = async () => {
    if (q == "") setChannels(subsc);
    else {
      const resChannels = await getChannels(q);

      // console.log(resChannels);
      setChannels(resChannels);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [subsc]);

  // modal 닫기
  const handleClose = () => setIsOpen(false);

  return (
    <Layout title="Search">
      <Typography
        gutterBottom
        variant="body2"
        sx={{
          padding: 0,
          color: "text.secondary",
        }}
      >
        Youtuber를 검색해서 Group에 등록!
      </Typography>

      {/* 채널 검색 */}
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchChannels();
        }}
        sx={{
          p: "2px 4px",
          marginLeft: "8px",
          display: "flex",
          alignItems: "center",
          width: 170,
          height: 27,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Channel name"
          defaultValue={q}
          // inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setQ(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={fetchChannels}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* 검색 결과 출력 */}
      {!channels && <p> 로그인 시 구독 중인 채널이 표시됩니다.</p>}
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        {channels && channels.length > 0 && (
          <List>
            {channels.map((channel, idx) => (
              <ListItem
                key={idx}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => {
                      setSelectedChannel(channel);
                      setIsOpen(true);
                    }}
                  >
                    <PlaylistAddIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar sx={{ minWidth: 72 }}>
                  <Avatar
                    src={channel.snippet.thumbnails.medium.url}
                    alt={channel.snippet.title}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={channel.snippet.title}
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
      </Box>

      {/* 그룹에 추가 */}
      <Modal
        isOpen={isOpen}
        style={{
          content: {
            width: "300px",
            maxHeight: "270px",
            margin: "auto",
          },
        }}
      >
        {/* X icon */}
        <Grid container justifyContent="flex-end" alignItems="center" size={6}>
          <Tooltip placement="right-start">
            <CloseIcon onClick={handleClose} />
          </Tooltip>
        </Grid>

        {selectedChannel && (
          <ModalGroup channel={selectedChannel} onClose={handleClose} />
        )}
      </Modal>
    </Layout>
  );
}

export default SearchPage;
