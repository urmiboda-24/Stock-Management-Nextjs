"use client";
import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  Settings,
  ShowChart,
  Logout,
  Message,
  Notifications,
  PersonAdd,
  Search,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppRoutings } from "@/utils/enums/appRoutings";
import { useRouter, usePathname } from "next/navigation";
import CommonTextField from "./customTextField";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/store/slices/authSlice";

interface CommonNavigationProps {
  showSidebar?: boolean;
  children: any;
}

const userNavItems = [
  {
    text: "Overview",
    icon: <Home />,
    path: AppRoutings.UserDashboard,
    id: 1,
  },
  {
    text: "Transactions",
    icon: <ShowChart />,
    path: AppRoutings.UserTransactions,
    id: 2,
  },
];

const adminNavItems = [
  {
    text: "Admin Dashboard",
    icon: <Settings />,
    path: AppRoutings.AdminDashboard,
    id: 3,
  },
];

const CommonNavigation: React.FC<CommonNavigationProps> = ({
  showSidebar = true,
  children,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { userName } = useSelector((state: RootState) => state.auth.userInfo);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const role = Cookies.get("role");
  const navItems = role === "admin" ? adminNavItems : userNavItems;

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/"); // Redirect to home page
  };

  return (
    <Box sx={{ display: "flex" }}>
      {showSidebar && !isLargeScreen && (
        <StyledAppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <StyledToolbar>
            {showSidebar && !isLargeScreen && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </StyledToolbar>
        </StyledAppBar>
      )}

      {showSidebar && (
        <Drawer
          variant={isLargeScreen ? "permanent" : "temporary"}
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: isLargeScreen ? 260 : "auto",
            flexShrink: 0,
            ["& .MuiDrawer-paper"]: {
              width: 260,
              boxSizing: "border-box",
              background: "#262b40",
              color: "#fff",
            },
          }}
        >
          <DrawerContainer>
            <List>
              {navItems.map((item) => (
                <StyledListItem
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={pathName === item.path ? "selected-option" : ""}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </StyledListItem>
              ))}
            </List>
          </DrawerContainer>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: showSidebar && !isLargeScreen ? "60px" : "0px",
        }}
      >
        <MainBox>
          <SearchBox display="flex" justifyContent="flex-start">
            <CommonTextField
              value=""
              placeholder="Search"
              customStyle={{
                maxWidth: "320px",
                width: "100%",
                marginBottom: 0,
              }}
              startIcon={<Search />}
            />
          </SearchBox>
          <Box style={{ marginRight: "8px" }}>
            <UserInfoContainer>
              <Box display="flex" alignItems="center">
                <Notifications />
              </Box>
              <UserInfoBox onClick={handleProfileClick}>
                <Avatar />
                <UserNameTypo>{userName}</UserNameTypo>
              </UserInfoBox>
              <ProfileMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleProfileClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleProfileClose}>
                  <ListItemIcon>
                    <Message fontSize="small" />
                  </ListItemIcon>
                  Message
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </ProfileMenu>
            </UserInfoContainer>
          </Box>
        </MainBox>
        {children}
      </Box>
    </Box>
  );
};

export default CommonNavigation;

const StyledAppBar = styled(AppBar)({
  background: "#262b40",
  color: "white",
  boxShadow: "none",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 16px",
});

const DrawerContainer = styled(Box)({
  width: 259,
  "& .selected-option": {
    background: "#fff",
    color: "#262b40",
    "& .MuiSvgIcon-root": {
      color: "#262b40",
    },
  },
});

const StyledListItem = styled(ListItem)({
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
});

const MainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media (max-width:600px)": {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    gap: 10,
  },
});
const SearchBox = styled(Box)({
  "@media (max-width:600px)": {
    width: "100%",
  },
});
const UserInfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  justifyContent: "flex-end",
  "@media (max-width:900px)": {
    justifyContent: "space-between",
  },
});

const UserInfoBox = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "@media (max-width:600px)": {
    flexDirection: "column",
    gap: "5px",
  },
});

const UserNameTypo = styled(Box)({
  maxWidth: "200px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textWrap: "nowrap",
  fontSize: ".875rem",
  "@media (max-width:900px)": {
    display: "none",
  },
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
    width: "200px",
    marginTop: 5,
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#66799e",
    "&:last-child": {
      marginTop: 20,
      "& .MuiListItemIcon-root": {
        color: "#fa5252",
      },
    },
    "& .MuiListItemIcon-root": {
      color: "#66799e",
    },
  },
});
