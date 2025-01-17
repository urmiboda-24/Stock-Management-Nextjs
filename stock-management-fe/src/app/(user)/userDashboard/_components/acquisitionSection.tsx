import { acquisitionList } from "@/utils/constants/userDashboard";
import { styled, Box, Typography } from "@mui/material";

const AcquisitionSection = () => {
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Acquisition</SeeAllTypo>
      </VisitTitleBox>
      <AcquisitionWrapper>
        <AcquisitionTypo>
          Tells you where your visitors originated from, such as search engines,
          social networks or website referrals.
        </AcquisitionTypo>
        {acquisitionList.map((item, index) => (
          <AcquisitionBox key={index}>
            <RankValueBox>
              {item?.icon && <item.icon />}
              <RankBox>
                <AcquisitionTypo>{item?.title}</AcquisitionTypo>
                <RankSubTitle>
                  <AcquisitionValue>{item?.value}</AcquisitionValue>
                </RankSubTitle>
              </RankBox>
            </RankValueBox>
          </AcquisitionBox>
        ))}
      </AcquisitionWrapper>
    </VisiterContainer>
  );
};

export default AcquisitionSection;

const VisiterContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-child": {
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

const AcquisitionTypo = styled(Box)({
  color: "rgb(74, 80, 115)",
  fontSize: "16px",
  fontWeight: 400,
});

const AcquisitionWrapper = styled(Box)({
  padding: "0 1.5rem 1.25rem 1.5rem",
});

const AcquisitionValue = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
});

const AcquisitionBox = styled(Box)({
  marginTop: "1rem",
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

const RankSubTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
  "& .MuiSvgIcon-root": {
    color: "green",
  },
});

const SeeAllTypo = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
});
