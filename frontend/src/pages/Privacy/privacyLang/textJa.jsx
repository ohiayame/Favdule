import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export const textJa = {
  home: "ホームへ",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <>
      {/* ヘッダー */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          プライバシーポリシー
        </Typography>
        <Typography variant="body2" color="text.secondary">
          最終更新日：{lastUpdated}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          本プライバシーポリシーは、{appName}
          （以下「本サービス」）が利用者の情報をどのように収集・利用・保存・共有するかについて説明します。
          本サービスをご利用いただくことで、以下の内容に同意したものとみなします。
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 1. YouTube 利用規約への同意 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          1. YouTube 利用規約への同意
        </Typography>
        <Typography variant="body1" paragraph>
          本プライバシーポリシーは、APIクライアントの利用規約も兼ねています。
          本サービスを利用することにより利用者は{" "}
          <Link
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube 利用規約
          </Link>
          に同意したものとみなします。
        </Typography>
      </Box>

      {/* 2. YouTube API Services の使用について */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          2. YouTube API Services の使用について
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは YouTube API Services
          を利用し、公開されているチャンネルおよび動画情報を取得・表示します。
          本サービスは{" "}
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </Link>
          （特に Limited Use
          要件）に完全に準拠しています。詳細については、Google の{" "}
          <Link
            href="https://www.google.com/policies/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            プライバシーポリシー
          </Link>
          をご参照ください。
        </Typography>
      </Box>

      {/* 3. 収集する情報 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          3. 収集する情報
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、以下のような公開情報を処理する場合があります（OAuthログイン機能を利用する場合を含む）。
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• チャンネルIDおよびチャンネル名" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• 動画ID、タイトル、サムネイル、説明、公開状態" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• ライブ配信の予定／開始／終了時間などの公開メタデータ" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• （任意）OAuthログイン時に最小限のユーザー識別子" />
          </ListItem>
        </List>
        <Typography variant="body2" color="text.secondary">
          ※
          本サービスは、必要最小限のデータのみを取得し、非公開動画やプライベートコンテンツを保存・取得することはありません。
        </Typography>
      </Box>

      {/* 4. 情報の利用目的 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          4. 情報の利用目的
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• チャンネル、動画、ライブ配信スケジュール情報の表示" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• サービス品質の向上および不具合分析（集計・匿名化された形式）" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• Google OAuth ログイン時の認証および認可管理" />
          </ListItem>
        </List>
      </Box>

      {/* 5. 保管期間 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          5. 保管期間
        </Typography>
        <Typography variant="body1" paragraph>
          情報は、利用目的の達成に必要な期間のみ保管し、その後速やかに削除します。
          法令により保存が義務付けられている場合を除き、不要になった情報は削除します。
          利用者は、メールにて削除を依頼することができます。
        </Typography>
      </Box>

      {/* 6. 第三者提供および共有 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          6. 第三者提供および共有
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、法令遵守、利用者の同意、またはサービス運営上必要な場合を除き、
          個人を特定できる情報を第三者に販売・貸与・共有することはありません。
          YouTube API を通じたデータ送信は、Google／YouTube
          によって処理される場合があります。
        </Typography>
      </Box>

      {/* 7. Cookieおよび類似技術 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          7. Cookieおよび類似技術の使用
        </Typography>
        <Typography variant="body1" paragraph>
          本サービスは、ユーザー体験の向上や利便性のために、ブラウザの
          localStorage や Cookie 等の類似技術を使用する場合があります。
          ブラウザ設定により保存を制限できますが、一部の機能が利用できなくなる可能性があります。
        </Typography>
      </Box>

      {/* 8. セキュリティ対策 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          8. セキュリティ対策
        </Typography>
        <Typography variant="body1" paragraph>
          当サービスは、不正アクセス、情報漏えい、改ざんを防止するために、
          合理的な技術的および管理的なセキュリティ対策を講じています。
          ユーザー関連情報へのアクセスは許可された担当者のみに制限され、安全に送信されます。
        </Typography>
      </Box>

      {/* 9. 利用者の権利 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          9. 利用者の権利
        </Typography>
        <Typography variant="body1" paragraph>
          関連法令に基づき、利用者は自身の情報について、閲覧、訂正、削除、処理の停止を求める権利を有します。
          これらの要請は下記メールアドレスまでご連絡ください。
          適用法令に従い、迅速に対応いたします。
        </Typography>
      </Box>

      {/* 10. お問い合わせ先 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          10. お問い合わせ先
        </Typography>
        <Typography variant="body1">
          メールアドレス：{" "}
          <Link href={`mailto:${contactEmail}`} underline="hover">
            {contactEmail}
          </Link>
        </Typography>
      </Box>

      {/* 11. 改定・通知 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          11. 改定および通知
        </Typography>
        <Typography variant="body2" color="text.secondary">
          本プライバシーポリシーは、法令またはサービス内容の変更に伴い改定されることがあります。
          重要な変更がある場合は、本ページまたはアプリ内のお知らせにて通知いたします。
        </Typography>
      </Box>
    </>
  ),
};
