"use client";
import { teamProgress } from "@/utils/constants/userDashboard";
import { Assignment } from "@mui/icons-material";
import {
  Box,
  Divider,
  LinearProgress,
  Typography,
  styled,
} from "@mui/material";

const ProgressTrack = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Progress Track</SeeAllTypo>
      </VisitTitleBox>
      <Divider />
      {teamProgress.map((progress, index) => {
        return (
          <ProgressWrapper key={index}>
            <Assignment />
            <ProgressBox>
              <ProgressInfoBox>
                <ProgressTypo>{progress.name}</ProgressTypo>
                <ProgressTypo className="barPercentage">
                  {progress.barPer}
                </ProgressTypo>
              </ProgressInfoBox>
              <ProgressBar
                variant="determinate"
                value={progress.value}
                progresscolor={progress.color}
              />
            </ProgressBox>
          </ProgressWrapper>
        );
      })}
    </VisiterContainer>
  );
};

export default ProgressTrack;

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

const SeeAllTypo = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
});

const ProgressWrapper = styled(Box)({
  display: "flex",
  padding: "1.25rem 1.5rem",
  alignItems: "center",
  gap: 10,
});

const ProgressBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 3,
});

const ProgressBar = styled(LinearProgress)(
  ({ progresscolor }: { progresscolor?: string }) => ({
    backgroundColor: "#f8f8f8",
    borderRadius: "50px",
    "& .MuiLinearProgress-bar": {
      backgroundColor: progresscolor,
    },
  })
);
const ProgressInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& .barPercentage": {
    textWrap: "nowrap",
  },
});

const ProgressTypo = styled(Box)({
  fontSize: "0.875rem",
  fontWeight: 400,
});
