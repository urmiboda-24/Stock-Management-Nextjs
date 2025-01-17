"use client";
import { teamMemberList } from "@/utils/constants/userDashboard";
import { checkCondition } from "@/utils/helper";
import {
  InsertInvitation,
  FiberManualRecordSharp,
  Message,
} from "@mui/icons-material";
import {
  Divider,
  Avatar,
  styled,
  Box,
  Button,
  Typography,
} from "@mui/material";

const TeamSection = () => {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "online":
      case "paid":
        return "green";
      case "offline":
        return "yellow";
      case "in meeting":
      case "cancelled":
        return "red";
      case "due":
        return "orange";
      default:
        return "red";
    }
  };
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Team Member</SeeAllTypo>
        <SeeAllButton>See All</SeeAllButton>
      </VisitTitleBox>
      <Divider />
      <TeamInfoWrapper>
        {teamMemberList.map((member, index) => {
          const btnIcon = checkCondition(
            member.action === "Invite",
            <InsertInvitation />,
            <Message />
          ) as string;
          return (
            <TeamInfoBox key={index}>
              <MemberInfoBox>
                <Avatar />
                <UserNameBox>
                  <MemberNameTypo>{member.name}</MemberNameTypo>
                  <StatusBox>
                    <FiberManualRecordSharp
                      style={{
                        fontSize: "small",
                        color: getStatusColor(member.status),
                      }}
                    />
                    {member.status}
                  </StatusBox>
                </UserNameBox>
              </MemberInfoBox>
              <MemberActionButton startIcon={btnIcon}>
                {member.action}
              </MemberActionButton>
            </TeamInfoBox>
          );
        })}
      </TeamInfoWrapper>
    </VisiterContainer>
  );
};

export default TeamSection;

const VisiterContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-of-type": {
    borderRadius: "10px",
    background: "#fff",
  },
  "& .dotIcon": {
    fontSize: "14px",
  },
});

const VisitTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "72px",
  justifyContent: "space-between",
  padding: "0 20px",
});

const SeeAllButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
});

const SeeAllTypo = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
});

const TeamInfoWrapper = styled(Box)({
  padding: "1.25rem 1.5rem",
});

const MemberInfoBox = styled(Box)({
  display: "flex",
  gap: 30,
  justifyContent: "center",
  alignItems: "center",
});

const UserNameBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const StatusBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.85rem",
});

const MemberNameTypo = styled(Typography)({
  fontSize: "1rem",
});

const MemberActionButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  minWidth: "100px",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
});

const TeamInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  "&:not(:last-child)": {
    marginBottom: "16px",
  },
});
