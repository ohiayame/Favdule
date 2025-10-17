import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export const textKo = {
  home: "홈으로",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <>
      {/* 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          개인정보처리방침
        </Typography>
        <Typography variant="body2" color="text.secondary">
          최종 업데이트: {lastUpdated}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          본 개인정보처리방침은 {appName}(이하 “본 서비스”)가 이용자의 정보를
          어떻게 수집·이용·보관·공유하는지를 설명합니다. 본 서비스를
          이용함으로써 아래의 내용에 동의한 것으로 간주됩니다.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 1. YouTube 이용약관 동의 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          1. YouTube 이용약관에 대한 동의
        </Typography>
        <Typography variant="body1" paragraph>
          이 개인정보 보호정책은 API의 이용 약관으로도 사용됩니다. 본 서비스를
          이용함으로써, 이용자는{" "}
          <Link
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube 이용약관
          </Link>
          에 동의한 것으로 간주됩니다.
        </Typography>
      </Box>

      {/* 2. YouTube API Services 사용 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          2. YouTube API Services 사용 고지
        </Typography>
        <Typography variant="body1" paragraph>
          본 서비스는 YouTube API Services를 사용하여 공개된 채널 및 동영상
          정보를 조회·표시합니다. 본 서비스는{" "}
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </Link>
          (특히 Limited Use 요건)을 완전히 준수합니다. 자세한 내용은{" "}
          <Link
            href="https://www.google.com/policies/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 개인정보처리방침
          </Link>
          을 참고하시기 바랍니다.
        </Typography>
      </Box>

      {/* 3. 수집하는 정보 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          3. 수집하는 정보
        </Typography>

        <Typography variant="body1" paragraph>
          본 서비스는 YouTube API Services 및 Google OAuth를 통해 다음의 정보를
          수집・이용하며, 일부 정보는 사용자 식별 및 개인화 기능 제공을 위해
          저장됩니다.
        </Typography>

        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• 사용자가 선택한 YouTube 채널의 채널 ID 및 채널명" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• 각 채널의 공개 동영상 ID, 제목, 썸네일, 설명, 공개 상태" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• 라이브 방송의 예정·시작·종료 시각 등 공개 메타데이터" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• Google OAuth 로그인 시 제공되는 사용자 정보: google_id, 이메일(email), 이름(name), 프로필 이미지 URL(picture_url)" />
          </ListItem>
        </List>

        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          위의 OAuth 로그인 정보는 사용자의 계정 식별 및 ‘내 구독 채널 표시’,
          ‘즐겨찾기 저장’ 등 개인화 기능을 제공하기 위한 목적으로만 사용됩니다.
          해당 데이터는 서비스 데이터베이스에 안전하게 저장되며, 외부로 공유되지
          않습니다.
        </Typography>

        <Typography variant="body1" paragraph>
          사용자는 언제든지{" "}
          <Link
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 계정 권한 관리 페이지
          </Link>
          에서 본 서비스의 접근 권한을 취소할 수 있으며, 탈퇴 시 모든 관련
          로그인 정보(google_id, email, name, picture_url)는 즉시 삭제됩니다.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ※ 본 서비스는 필요한 최소한의 데이터만 요청하며, 비공개 영상이나
          비공개 콘텐츠에는 접근하지 않습니다.
        </Typography>
      </Box>

      {/* 4. 정보의 이용 목적 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          4. 정보의 이용 목적
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• 채널, 동영상 및 라이브 방송 일정 정보를 표시하기 위함" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• 서비스 품질 향상 및 오류 분석(집계·비식별 형태)" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• Google OAuth 로그인 시 인증 및 권한 관리" />
          </ListItem>
        </List>
      </Box>

      {/* 5. 보관 기간 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          5. 보관 기간
        </Typography>
        <Typography variant="body1" paragraph>
          수집된 정보는 이용 목적 달성에 필요한 기간 동안만 보관되며, 목적이
          달성된 후에는 지체 없이 삭제됩니다. 법령에 따라 보존이 필요한 경우에는
          해당 기간 동안 보관할 수 있습니다. 이용자는 이메일을 통해 데이터
          삭제를 요청할 수 있습니다.
        </Typography>
      </Box>

      {/* 6. 제3자 제공 및 공유 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          6. 제3자 제공 및 공유
        </Typography>
        <Typography variant="body1" paragraph>
          본 서비스는 법령 준수, 이용자 동의, 또는 서비스 운영상 필요한 경우를
          제외하고 개인을 식별할 수 있는 정보를 제3자에게 판매·대여·공유하지
          않습니다. YouTube API를 통한 데이터 전송은 Google/YouTube의 정책에
          따라 처리될 수 있습니다.
        </Typography>
      </Box>

      {/* 7. 쿠키 및 유사 기술 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          7. 쿠키 및 유사 기술
        </Typography>
        <Typography variant="body1" paragraph>
          본 서비스는 사용자 환경 개선과 편의 제공을 위해 브라우저의
          localStorage, 쿠키 등 유사 기술을 사용할 수 있습니다. 브라우저 설정을
          통해 저장을 제한할 수 있으나 일부 기능이 제한될 수 있습니다.
        </Typography>
      </Box>

      {/* 8. 보안 조치 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          8. 보안 조치
        </Typography>
        <Typography variant="body1" paragraph>
          본 서비스는 무단 접근, 유출, 변조를 방지하기 위해 합리적인 수준의
          기술적·관리적 보안 조치를 시행하고 있습니다. 이용자 관련 정보 접근은
          허가된 인원으로 제한되며, 안전한 방식으로 전송됩니다.
        </Typography>
      </Box>

      {/* 9. 이용자 권리 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          9. 이용자 권리
        </Typography>
        <Typography variant="body1" paragraph>
          관련 법령이 허용하는 범위 내에서, 이용자는 자신의 정보에 대한 열람,
          정정, 삭제 또는 처리 정지를 요청할 권리가 있습니다. 이러한 요청은 아래
          이메일을 통해 접수할 수 있으며, 관련 법령에 따라 신속하게 처리됩니다.
        </Typography>
      </Box>

      {/* 10. 문의처 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          10. 문의처
        </Typography>
        <Typography variant="body1">
          이메일:{" "}
          <Link href={`mailto:${contactEmail}`} underline="hover">
            {contactEmail}
          </Link>
        </Typography>
      </Box>

      {/* 11. 정책 변경 및 고지 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          11. 정책 변경 및 고지
        </Typography>
        <Typography variant="body2" color="text.secondary">
          본 개인정보처리방침은 법령이나 서비스 내용 변경에 따라 개정될 수
          있습니다. 중요한 변경 사항이 있을 경우 본 페이지 또는 서비스 내 공지를
          통해 안내드립니다.
        </Typography>
      </Box>
    </>
  ),
};
