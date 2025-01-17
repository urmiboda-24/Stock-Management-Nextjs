"use client";
import { rankList } from "@/utils/constants/userDashboard";
import { Public, ExpandLess, TrendingUp } from "@mui/icons-material";
import { Box, Divider, Typography, styled } from "@mui/material";

const RankSection = () => {
  return (
    <VisiterContainer>
      {rankList.map((rankInfo, index) => {
        return (
          <Box key={index}>
            <RankWrapper>
              <RankValueBox>
                <Public />
                <RankBox>
                  <RankTitleTypo>{rankInfo.title}</RankTitleTypo>
                  <RankSubTitle>
                    <RankSubTitleTypo>{rankInfo.subTitle}</RankSubTitleTypo>
                    {rankInfo.subTitle && <ExpandLess fontSize="small" />}
                  </RankSubTitle>
                </RankBox>
              </RankValueBox>
              <RankValueBox>
                <Typography>{rankInfo.value}</Typography>
                <TrendingUp />
              </RankValueBox>
            </RankWrapper>
            <Divider />
          </Box>
        );
      })}
    </VisiterContainer>
  );
};

export default RankSection;

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

const RankWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.25rem 1.5rem",
});

const RankBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const RankValueBox = styled(Box)({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
const RankTitleTypo = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 400,
});

const RankSubTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
  "& .MuiSvgIcon-root": {
    color: "green",
  },
});

const RankSubTitleTypo = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 400,
  color: "grey",
});
