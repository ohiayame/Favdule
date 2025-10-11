import {
  Box,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const textKo = {
  home: "홈으로",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        이용약관 (Terms of Use)
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        최종 업데이트: {lastUpdated}
      </Typography>

      <Typography variant="body1" paragraph>
        본 약관은 {appName}(이하 "서비스")의 이용 조건을 규정합니다. 사용자는 본
        서비스를 이용함으로써{" "}
        <Link
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube 이용약관
        </Link>
        과 본 약관에 동의한 것으로 간주됩니다.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight={700} gutterBottom>
        제1조 (서비스 개요)
      </Typography>
      <Typography variant="body1" paragraph>
        본 서비스는 YouTube Data API를 이용하여 채널명, 동영상 제목, 썸네일,
        라이브 일정 등의 공개 정보를 표시합니다.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        제2조 (YouTube 및 Google 정책 준수)
      </Typography>
      <Typography variant="body1" paragraph>
        본 서비스는{" "}
        <Link
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </Link>
        및 관련 정책을 준수합니다.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        제3조 (사용자의 책임)
      </Typography>
      <List dense>
        <ListItem disableGutters>
          <ListItemText primary="• 사용자는 관련 법령과 YouTube 이용약관을 준수해야 합니다." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="• YouTube 또는 Google API 정책을 위반하는 행위를 해서는 안 됩니다." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="• 서비스의 부정 이용이나 데이터 무단 수집은 금지됩니다." />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 3 }}>
        제4조 (개인정보 처리방침)
      </Typography>
      <Typography variant="body1" paragraph>
        개인정보 수집 및 이용에 관한 내용은{" "}
        <Link href="/privacy" underline="hover">
          개인정보처리방침
        </Link>
        을 참고하시기 바랍니다.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        제5조 (약관 변경)
      </Typography>
      <Typography variant="body1" paragraph>
        서비스는 필요에 따라 본 약관을 변경할 수 있으며, 중요한 변경이 있을 경우
        본 페이지 또는 서비스 내 공지를 통해 안내합니다.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        제6조 (문의처)
      </Typography>
      <Typography variant="body1">
        이메일:{" "}
        <Link href={`mailto:${contactEmail}`} underline="hover">
          {contactEmail}
        </Link>
      </Typography>
    </Box>
  ),
};
