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
            ホームへ
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
            title="サービス紹介"
            subtitle="お気に入りのYouTuberの配信スケジュールをひと目でチェック。所属 / 個人チャンネルを問わず、『自分で選んだチャンネル』だけをまとめて、昨日・今日・明日の動画を確認できます。"
            chip="Overview"
          >
            <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
              <CardContent>
                <Typography variant="body2">
                  •
                  YouTuberの所属事務所別のスケジュールを一つ一つ確認する必要がありません。
                  <br />
                  •
                  個人YouTuberの配信スケジュールもグループ化して素早くチェックできます。
                  <br />•
                  動画をクリックすると、すぐに該当のYouTubeページへ移動します。
                </Typography>
              </CardContent>
            </Card>
            Privacy Policy : <a href="/privacy">privacy policy</a>
          </Section>

          {/* 3. 메인(Home) */}
          <Section
            id="home"
            icon={<HomeIcon />}
            title="メインページ（Home）"
            subtitle="グループごとに『昨日 / 今日 / 明日』の動画をカード形式で表示します。"
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
                  → 右上のグループドロップダウンから見たいグループを選択
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
              •
              グループを変更すると、そのグループに登録されているチャンネルの動画だけが表示されます。
              <br />• 動画をクリックするとYouTubeへ移動します。
            </Typography>
          </Section>

          {/* 4. 그룹(Groups) */}
          <Section
            id="groups"
            icon={<ListAltIcon />}
            title="グループページ（Groups）"
            subtitle="ゲストユーザーは最大4グループまで利用可能。ログインユーザーは自由に作成・編集・削除できます。"
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
                <Typography variant="subtitle">• 共通</Typography>
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
                    → グループドロップダウンからグループを選択
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ marginBottom: "7px" }}>
                  <CardMedia
                    component="img"
                    image={IMAGES[4].src}
                    alt={`${IMAGES[4].alt} (이미지 ${4})`}
                    sx={{ objectFit: "contain", width: "50%" }}
                  />
                  <Typography variant="body2">→ グループ名の編集</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CardMedia
                    component="img"
                    image={IMAGES[5].src}
                    alt={`${IMAGES[5].alt} (이미지 ${5})`}
                    sx={{ objectFit: "contain", width: "25px" }}
                  />
                  <Typography variant="body2">
                    → グループに保存されているチャンネルを削除
                  </Typography>
                </Grid>
              </Card>
              {/* 회원 */}
              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="subtitle">• ログインユーザー</Typography>
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
                    → グループドロップダウンの一番下に表示
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ marginBottom: "4px" }}>
                  <CardMedia
                    component="img"
                    image={IMAGES[3].src}
                    alt={`${IMAGES[3].alt} (이미지 ${3})`}
                    sx={{ objectFit: "contain", width: "65px" }}
                  />
                  <Typography variant="body2">→ グループ削除</Typography>
                </Grid>
              </Card>
              <Typography variant="body1">
                • ゲストユーザー：最大4グループまで利用可能（ブラウザ保存）
                <br />• ログインユーザー：『＋
                新しいグループ』で無制限に作成可能。すべての変更がアカウントに保存されます。
              </Typography>
            </Grid>
          </Section>

          {/* 5. 검색(Search) */}
          <Section
            id="search"
            icon={<ManageSearchIcon />}
            title="検索ページ（Search）"
            subtitle="チャンネルを検索して好きなグループに追加できます。ログイン時は『自分の登録チャンネル15件』も素早く取得できます。"
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
                <Typography variant="body2">→ チャンネル検索</Typography>
              </Grid>

              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="subtitle">• チャンネル追加</Typography>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginTop: "10px", marginBottom: "4px" }}
                >
                  <Typography variant="body2">
                    1. チャンネルカードの『追加』アイコンをクリック
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
                    2. グループを選択
                    <br />→ 『追加』ボタンで保存
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
            title="ページ移動"
            subtitle="画面右上メニュー → サイドナビゲーションからページを選択します。"
            chip="Navigation"
          >
            <Grid container spacing={2}>
              <Card variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
                <Grid item xs={12} sm={6} sx={{ marginBottom: "20px" }}>
                  <Typography variant="body2">1. メニューボタン</Typography>
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
                    2. サイドナビゲーション（Home / Groups / Search）
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
            title="ログイン"
            subtitle="Googleアカウントでログインして、グループ / チャンネル設定を安全に保存できます."
            chip="Account"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                メニュー →
                ナビゲーション上部の『ログイン』ボタンから開始します。
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
            title="お問い合わせ"
            subtitle="問題がある場合は aym00124@g.yju.ac.kr までご連絡ください。"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
