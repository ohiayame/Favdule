import {
  Box,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const textJa = {
  home: "ホームに戻る",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        利用規約（Terms of Use）
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        最終更新日：{lastUpdated}
      </Typography>

      <Typography variant="body1" paragraph>
        本利用規約（以下「本規約」といいます）は、{appName}
        （以下「本サービス」といいます）の利用条件を定めるものです。
        ユーザーは、本サービスを利用することにより、YouTubeの
        <Link
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          利用規約
        </Link>
        および本規約に同意したものとみなされます。
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight={700} gutterBottom>
        第1条（サービスの概要）
      </Typography>
      <Typography variant="body1" paragraph>
        本サービスは、YouTube Data
        APIを使用して、チャンネル名、動画タイトル、サムネイル、配信スケジュールなどの
        公開情報を表示するウェブアプリケーションです。
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        第2条（YouTubeおよびGoogleポリシーの遵守）
      </Typography>
      <Typography variant="body1" paragraph>
        本サービスは、「
        <Link
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </Link>
        」を含む、YouTubeおよびGoogleの全ての関連ポリシーに準拠します。
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        第3条（ユーザーの責任）
      </Typography>
      <List dense>
        <ListItem disableGutters>
          <ListItemText primary="・ユーザーは、適用される法令およびYouTube利用規約を遵守しなければなりません。" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="・YouTubeやGoogle APIのポリシーに違反する行為は禁止されています。" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="・不正利用やデータの無断取得を行ってはなりません。" />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 3 }}>
        第4条（プライバシーポリシー）
      </Typography>
      <Typography variant="body1" paragraph>
        ユーザー情報の収集・保存・利用方法については、別途定める
        <Link href="/privacy" underline="hover">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        第5条（規約の変更）
      </Typography>
      <Typography variant="body1" paragraph>
        本サービスは、必要に応じて本規約を変更する場合があります。重大な変更がある場合は、本ページまたはアプリ内で告知します。
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        第6条（お問い合わせ先）
      </Typography>
      <Typography variant="body1">
        メールアドレス：
        <Link href={`mailto:${contactEmail}`} underline="hover">
          {contactEmail}
        </Link>
      </Typography>
    </Box>
  ),
};
