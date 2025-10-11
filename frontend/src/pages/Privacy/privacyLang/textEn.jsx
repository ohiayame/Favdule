import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export const textEn = {
  home: "Home",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Updated: {lastUpdated}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" paragraph>
          This Privacy Policy explains how {appName} (“the Service”) collects,
          uses, stores, and shares user information. By using this Service, you
          are deemed to have agreed to the following terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 1. Agreement to YouTube Terms */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          1. Agreement to YouTube Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
          This Privacy Policy also serves as the Terms of Use for the API
          client, and by using this Service, you agree to be bound by the{" "}
          <Link
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube Terms of Service
          </Link>
          .
        </Typography>
      </Box>

      {/* 2. Use of YouTube API Services */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          2. Use of YouTube API Services
        </Typography>
        <Typography variant="body1" paragraph>
          This Service uses YouTube API Services to retrieve and display
          publicly available channel and video information. The Service fully
          complies with the{" "}
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </Link>
          , including the Limited Use requirements. For more details, please
          refer to{" "}
          <Link
            href="https://www.google.com/policies/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google’s Privacy Policy
          </Link>
          .
        </Typography>
      </Box>

      {/* 3. Information Collected */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          3. Information Collected
        </Typography>
        <Typography variant="body1" paragraph>
          This Service collects, stores, and uses the following information
          obtained via the YouTube API:
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• Channel ID and channel name" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• Video ID, title, thumbnail, description, and visibility status" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• Public metadata such as scheduled, start, and end times of live streams" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• (Optional) Minimal user identifier when using OAuth login" />
          </ListItem>
        </List>
        <Typography variant="body2" color="text.secondary">
          ※ This Service only requests the minimum data required and does not
          access or store any private or non-public video content.
        </Typography>
      </Box>

      {/* 4. Purpose of Use */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          4. Purpose of Use
        </Typography>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="• To display information about channels, videos, and live stream schedules" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• To improve service quality and analyze errors (aggregated and anonymized form)" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="• To maintain authentication and authorization when users log in through Google OAuth" />
          </ListItem>
        </List>
      </Box>

      {/* 5. Retention Period */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          5. Retention Period
        </Typography>
        <Typography variant="body1" paragraph>
          Information is stored only for the duration necessary to achieve the
          intended purpose and will be promptly deleted after that. In cases
          where the law requires retention, data may be stored for the legally
          required period. Users may request deletion at any time by contacting
          us via email.
        </Typography>
      </Box>

      {/* 6. Third-Party Sharing and Disclosure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          6. Third-Party Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          This Service does not sell, rent, or share personally identifiable
          information with third parties, except when required by law, user
          consent, or operational necessity. Data transmission through the
          YouTube API may be processed by Google/YouTube in accordance with
          their respective policies.
        </Typography>
      </Box>

      {/* 7. Cookies and Similar Technologies */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          7. Cookies and Similar Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          This Service may use localStorage, cookies, or similar browser
          technologies to enhance usability and save user preferences. Users can
          restrict storage through browser settings, though some functions may
          be limited.
        </Typography>
      </Box>

      {/* 8. Security Measures */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          8. Security Measures
        </Typography>
        <Typography variant="body1" paragraph>
          The Service applies reasonable technical and administrative security
          measures to prevent unauthorized access, leakage, and alteration of
          information. Access to user-related data is restricted to authorized
          personnel only and transmitted securely.
        </Typography>
      </Box>

      {/* 9. User Rights */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          9. User Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Within the scope permitted by law, users have the right to request
          access, correction, deletion, or suspension of their information. For
          such inquiries, please contact us via the email below. Requests will
          be handled promptly in accordance with applicable laws.
        </Typography>
      </Box>

      {/* 10. Contact */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          10. Contact
        </Typography>
        <Typography variant="body1">
          Email:{" "}
          <Link href={`mailto:${contactEmail}`} underline="hover">
            {contactEmail}
          </Link>
        </Typography>
      </Box>

      {/* 11. Policy Updates */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          11. Policy Updates
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This Privacy Policy may be updated from time to time due to legal or
          service changes. When significant updates are made, users will be
          notified on this page or through an in-app announcement.
        </Typography>
      </Box>
    </>
  ),
};
