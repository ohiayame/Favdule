import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";

const IMAGES = {
  1: { alt: "그룹 드롭다운", src: "./assets/img1.png" },
  2: { alt: "새로운 그룹 추가 버튼", src: "./assets/img2.png" },
  3: { alt: "그룹 삭제 버튼", src: "./assets/img3.png" },
  4: { alt: "그룹 이름 수정", src: "./assets/img4.png" },
  5: { alt: "채널 삭제 아이콘", src: "./assets/img5.png" },
  6: { alt: "채널 검색 입력", src: "./assets/img6.png" },
  7: { alt: "채널 추가 아이콘", src: "./assets/img7.png" },
  8: { alt: "추가 버튼", src: "./assets/img8.png" },
  9: { alt: "메뉴 버튼", src: "./assets/img9.png" },
  10: { alt: "사이드 네비게이션", src: "./assets/img10.png" },
  11: { alt: "Main Page", src: "./assets/imgHome.png" },
  12: { alt: "Groups Page", src: "./assets/imgGroups.png" },
  13: { alt: "Search Page", src: "./assets/imgSearch.png" },
};

// 공통: 섹션 블록
function Section({ id, icon, title, subtitle, children, chip }) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 88, mb: 6 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        {icon}
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
        {chip && <Chip label={chip} size="small" sx={{ ml: 1 }} />}
      </Stack>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
      )}
      {children}
      <Divider sx={{ mt: 4 }} />
    </Box>
  );
}

export default function HelpPage() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {/* 헤더 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3, gap: 1 }}
      >
        <Link to="/">
          <img
            src="/favdule_logo.png"
            alt="logo"
            style={{ width: "auto", height: "35px" }}
          />
        </Link>
        <Typography variant="h4" fontWeight={800}>
          Help & Guide
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" startIcon={<LaunchIcon />} href="/">
            홈으로
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* 본문 */}
        <Grid item xs={12} md={8.5}>
          {/* 1. 소개 */}
          <Section
            id="intro"
            icon={<HelpOutlineIcon />}
            title="서비스 소개"
            subtitle="좋아하는 YouTuber의 방송 일정을 한눈에. 소속사/개인 채널과 상관없이 ‘내가 고른 채널’만 모아 어제·오늘·내일 영상을 확인합니다."
            chip="Overview"
          >
            <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
              <CardContent>
                <Typography variant="body2">
                  • 소속사 별로 흩어진 공식 스케줄을 일일이 보지 않아도 됩니다.{" "}
                  <br />
                  • 개인 활동 유튜버의 방송 일정도 그룹으로 묶어 빠르게
                  확인합니다. <br />• 영상 카드를 클릭하면 바로 해당 유튜브
                  페이지로 이동합니다.
                </Typography>
              </CardContent>
            </Card>
            Privacy Policy : <a href="/privacy">privacy policy</a>
          </Section>

          {/* 3. 메인(Home) */}
          <Section
            id="home"
            icon={<HomeIcon />}
            title="메인 페이지 (Home)"
            subtitle="Group별로 ‘어제 / 오늘 / 내일’의 영상을 카드 형태로 제공합니다."
            chip="Main"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  component="img"
                  image={IMAGES[1].src}
                  alt={`${IMAGES[1].alt} (이미지 ${IMAGES[1]})`}
                  sx={{ objectFit: "contain", width: "110px" }}
                />
                <Typography variant="body2">
                  → 그룹 드롭다운에서 보고 싶은 그룹을 선택
                </Typography>
                <CardMedia
                  component="img"
                  image={IMAGES[11].src}
                  alt={`${IMAGES[11].alt} (이미지 ${IMAGES[11]})`}
                  sx={{ objectFit: "contain", maxWidth: "500px" }}
                />
              </Grid>
            </Grid>
            <br />
            <Typography variant="body1">
              • 그룹을 바꾸면 해당 그룹에 등록된 채널의 영상만 표시됩니다.
              <br />• 영상 카드를 클릭하면 유튜브로 이동합니다.
            </Typography>
          </Section>

          {/* 4. 그룹(Groups) */}
          <Section
            id="groups"
            icon={<ListAltIcon />}
            title="그룹 페이지 (Groups)"
            subtitle="비회원은 4개 그룹까지 사용, 회원은 자유롭게 생성/수정/삭제할 수 있습니다."
            chip="Management"
          >
            <CardMedia
              component="img"
              image={IMAGES[12].src}
              alt={`${IMAGES[12].alt} (이미지 ${IMAGES[12]})`}
              sx={{ objectFit: "contain", maxWidth: "550px" }}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Card
                variant="outlined"
                sx={{ padding: 2, paddingRight: 0, borderRadius: 2 }}
              >
                <Typography variant="subtitle">• 공통</Typography>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginTop: "15px", marginBottom: "7px" }}
                >
                  <CardMedia
                    component="img"
                    image={IMAGES[1].src}
                    alt={`${IMAGES[1].alt} (이미지 ${IMAGES[1]})`}
                    sx={{ objectFit: "contain", width: "110px" }}
                  />
                  <Typography variant="body2">
                    → 그룹 드롭다운에서 그룹을 선택
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ marginBottom: "7px" }}>
                  <CardMedia
                    component="img"
                    image={IMAGES[4].src}
                    alt={`${IMAGES[4].alt} (이미지 ${4})`}
                    sx={{ objectFit: "contain", width: "50%" }}
                  />
                  <Typography variant="body2">→ 그룹명 수정</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CardMedia
                    component="img"
                    image={IMAGES[5].src}
                    alt={`${IMAGES[5].alt} (이미지 ${5})`}
                    sx={{ objectFit: "contain", width: "25px" }}
                  />
                  <Typography variant="body2">
                    → 그룹에 저장된 채널을 삭제
                  </Typography>
                </Grid>
              </Card>
              {/* 회원 */}
              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="subtitle">• 회원</Typography>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginTop: "8px", marginBottom: "7px" }}
                >
                  <CardMedia
                    component="img"
                    image={IMAGES[2].src}
                    alt={`${IMAGES[2].alt} (이미지 ${2})`}
                    sx={{ objectFit: "contain", width: "140px" }}
                  />
                  <Typography variant="body2">
                    → 그룹 드롭다운에서 제일 하단에 위치
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ marginBottom: "4px" }}>
                  <CardMedia
                    component="img"
                    image={IMAGES[3].src}
                    alt={`${IMAGES[3].alt} (이미지 ${3})`}
                    sx={{ objectFit: "contain", width: "65px" }}
                  />
                  <Typography variant="body2">→ 그룹을 삭제</Typography>
                </Grid>
              </Card>
              <Typography variant="body1">
                • 비회원: 4개의 그룹 사용 가능 (브라우저 저장).
                <br />• 회원: ‘+ 새로운 그룹 추가’로 무제한 생성, 모든
                변경사항이 계정에 저장됩니다.
              </Typography>
            </Grid>
          </Section>

          {/* 5. 검색(Search) */}
          <Section
            id="search"
            icon={<ManageSearchIcon />}
            title="검색 페이지 (Search)"
            subtitle="채널을 검색해 원하는 그룹에 추가합니다. 로그인 시 ‘내 구독 채널 15개’도 빠르게 불러옵니다."
            chip="Add Channels"
          >
            <CardMedia
              component="img"
              image={IMAGES[13].src}
              alt={`${IMAGES[13].alt} (이미지 ${IMAGES[13]})`}
              sx={{ objectFit: "contain", maxWidth: "550px" }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  component="img"
                  image={IMAGES[6].src}
                  alt={`${IMAGES[6].alt} (이미지 ${6})`}
                  sx={{ objectFit: "contain", width: "150px" }}
                />
                <Typography variant="body2">→ 채널 검색</Typography>
              </Grid>

              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="subtitle">• 채널 추가</Typography>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginTop: "10px", marginBottom: "4px" }}
                >
                  <Typography variant="body2">
                    1. 채널 카드의 ‘추가’ 아이콘 클릭
                  </Typography>
                  <CardMedia
                    component="img"
                    image={IMAGES[7].src}
                    alt={`${IMAGES[7].alt} (이미지 ${7})`}
                    sx={{ objectFit: "contain", width: "45px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    2. 그룹 선택 <br />→ ‘추가’ 버튼으로 저장
                  </Typography>
                  <CardMedia
                    component="img"
                    image={IMAGES[8].src}
                    alt={`${IMAGES[8].alt} (이미지 ${8})`}
                    sx={{ objectFit: "contain", width: "50px" }}
                  />
                </Grid>
              </Card>
            </Grid>
          </Section>

          {/* 6. 페이지 이동 */}
          <Section
            id="navigation"
            icon={<MenuIcon />}
            title="페이지 이동"
            subtitle="메뉴 → 사이드 네비게이션에서 페이지를 선택합니다."
            chip="Navigation"
          >
            <Grid container spacing={2}>
              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Grid item xs={12} sm={6} sx={{ marginBottom: "20px" }}>
                  <Typography variant="body2">1. 메뉴 버튼</Typography>
                  <CardMedia
                    component="img"
                    image={IMAGES[9].src}
                    alt={`${IMAGES[9].alt} (이미지 ${9})`}
                    sx={{
                      objectFit: "contain",
                      width: "40px",
                      margin: "8px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    2. 사이드 네비게이션(Home / Groups / Search)
                  </Typography>
                  <CardMedia
                    component="img"
                    image={IMAGES[10].src}
                    alt={`${IMAGES[10].alt} (이미지 ${10})`}
                    sx={{ objectFit: "contain", width: "230px" }}
                  />
                </Grid>
              </Card>
            </Grid>
          </Section>

          {/* 7. 로그인 */}
          <Section
            id="login"
            icon={<LoginIcon />}
            title="로그인"
            subtitle="Google 계정으로 로그인하여 그룹/채널 설정을 안전하게 저장합니다."
            chip="Account"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                메뉴 → 네비게이션 상단의 ‘로그인하기’ 버튼을 누르면 시작됩니다.
              </Typography>
              <CardMedia
                component="img"
                image={IMAGES[10].src}
                alt={`${IMAGES[10].alt} (이미지 ${10})`}
                sx={{ objectFit: "contain", width: "230px" }}
              />
            </Grid>
          </Section>

          {/* 8. FAQ */}
          <Section
            id="faq"
            icon={<HelpOutlineIcon />}
            title="문의"
            subtitle="문제가 있으면 001aym0819@gmail.com 으로 연락주세요."
          ></Section>
        </Grid>
      </Grid>
    </Box>
  );
}
