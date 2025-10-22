import { useState } from "react";
import { Container, Divider, Button, Stack } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { textJa } from "./termsLang/textJa.jsx";
import { textKo } from "./termsLang/textKo.jsx";
import { textEn } from "./termsLang/textEn.jsx";

export default function TermsOfUse({
  appName = "Favdule",
  contactEmail = "aym00124@g.yju.ac.kr",
  lastUpdated = "2025-10-22",
}) {
  const [lang, setLang] = useState("ja");
  const t = lang === "ko" ? textKo : lang === "en" ? textEn : textJa;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* 상단: 홈 버튼 + 언어 전환 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Button
          href="/"
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          sx={{ borderRadius: 3 }}
        >
          {t.home}
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            variant={lang === "ja" ? "contained" : "outlined"}
            onClick={() => setLang("ja")}
          >
            🇯🇵 日本語
          </Button>
          <Button
            variant={lang === "ko" ? "contained" : "outlined"}
            onClick={() => setLang("ko")}
          >
            🇰🇷 한국어
          </Button>
          <Button
            variant={lang === "en" ? "contained" : "outlined"}
            onClick={() => setLang("en")}
          >
            🇺🇸 English
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/*  본문 (언어별 출력) */}
      {t.render({ appName, contactEmail, lastUpdated })}
    </Container>
  );
}
