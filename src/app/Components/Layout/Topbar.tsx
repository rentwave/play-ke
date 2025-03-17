"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Badge,
} from "@mui/material";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useState } from "react";

const Topbar = ({ sidebarWidth }: { sidebarWidth: number }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const handleOpenNotifications = () => {
    setNotificationsOpen(true);
    setUnreadNotifications(0);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${sidebarWidth}px)`,
          ml: `${sidebarWidth}px`,
          bgcolor: "white",
          color: "black",
          zIndex: 1100,
          transition: "margin-left 0.3s, width 0.3s",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ ml: 3 }} variant="h6" noWrap>
            Sirocco
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 3 }}>
            <IconButton
              onClick={handleOpenNotifications}
              sx={{ color: "gray" }}
            >
              <Badge
                badgeContent={unreadNotifications}
                color="error"
                overlap="circular"
                invisible={unreadNotifications === 0}
              >
                <NotificationsTwoToneIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => setSettingsOpen(true)}
              sx={{ color: "gray" }}
            >
              <SettingsTwoToneIcon />
            </IconButton>

            <IconButton onClick={() => setProfileOpen(true)}>
              <Avatar
                sx={{ width: 36, height: 36 }}
                src="https://i.pravatar.cc/150?img=3"
                alt="User Avatar"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isNotificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="New message received" />
            </ListItem>
            <ListItem>
              <ListItemText primary="System update available" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="Account Settings" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Privacy Preferences" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={isProfileOpen}
        onClose={() => setProfileOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Profile
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="View Profile" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Topbar;
