"use client";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { usePathname } from "next/navigation";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import LocalActivityTwoToneIcon from "@mui/icons-material/LocalActivityTwoTone";
import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
import NavItem from "../Navitem";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();
  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: 1200,
        width: isOpen ? 300 : 100,
        flexShrink: 0,
        transition: "width 0.3s",
        "& .MuiDrawer-paper": {
          width: isOpen ? 300 : 100,
          transition: "width 0.3s",
          overflowX: "hidden",
          borderRight: "1px solid #EDEDED",
        },
      }}
    >
      <List sx={{ mt: 3 }}>
        <Typography
          fontSize="medium"
          sx={{ ml: 1, mb: 2 }}
          variant="h6"
          component="h6"
        >
          Overview
        </Typography>
        <NavItem
          path="/dashboard"
          primary="Messages"
          icon={<ForumTwoToneIcon />}
          isOpen={isOpen}
        />
        <NavItem
          path="/tickets"
          primary="Tickets"
          icon={<LocalActivityTwoToneIcon />}
          isOpen={isOpen}
        />
        <NavItem
          path="/analytics"
          primary="Analytics"
          icon={<AnalyticsTwoToneIcon />}
          isOpen={isOpen}
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
