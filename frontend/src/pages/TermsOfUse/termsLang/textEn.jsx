import {
  Box,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const textEn = {
  home: "Back to Home",
  render: ({ appName, contactEmail, lastUpdated }) => (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Terms of Use
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Last Updated: {lastUpdated}
      </Typography>

      <Typography variant="body1" paragraph>
        These Terms of Use (“the Terms”) define the conditions for using{" "}
        {appName} (“the Service”). By using this Service, you agree to be bound
        by both these Terms and the{" "}
        <Link
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube Terms of Service
        </Link>
        .
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight={700} gutterBottom>
        1. Description of the Service
      </Typography>
      <Typography variant="body1" paragraph>
        This Service uses the YouTube Data API to display publicly available
        information such as channel names, video titles, thumbnails, and live
        stream schedules.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        2. Compliance with YouTube and Google Policies
      </Typography>
      <Typography variant="body1" paragraph>
        This Service complies with the{" "}
        <Link
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </Link>
        , including Limited Use requirements, and all relevant YouTube and
        Google platform policies.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        3. User Responsibilities
      </Typography>
      <List dense>
        <ListItem disableGutters>
          <ListItemText primary="• Users must comply with applicable laws and the YouTube Terms of Service." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="• Users must not violate YouTube or Google API policies." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="• Unauthorized data extraction or misuse of the Service is strictly prohibited." />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 3 }}>
        4. Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        For details on how user data is collected, stored, and used, please
        refer to our{" "}
        <Link href="/privacy" underline="hover">
          Privacy Policy
        </Link>
        .
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        5. Changes to the Terms
      </Typography>
      <Typography variant="body1" paragraph>
        These Terms may be updated as needed. Significant changes will be
        notified on this page or within the Service.
      </Typography>

      <Typography variant="h6" fontWeight={700} gutterBottom>
        6. Contact
      </Typography>
      <Typography variant="body1">
        Email:{" "}
        <Link href={`mailto:${contactEmail}`} underline="hover">
          {contactEmail}
        </Link>
      </Typography>
    </Box>
  ),
};
