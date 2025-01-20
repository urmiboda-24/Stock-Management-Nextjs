import { trendingUpSvg } from "@assets/images";
import { Language, ExpandLess } from "@mui/icons-material";
import { Typography, styled, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const RevenueCard = () => {
  return (
    <CardContainer container spacing={3}>
      <Grid size={5}>
        <RevenueImgBox>
          <img src={trendingUpSvg} className="revenueImg" alt="trending up" />
        </RevenueImgBox>
      </Grid>
      <Grid size={7}>
        <IconContainer>
          <Title variant="subtitle1">Customers</Title>
          <Metric variant="h3">345k</Metric>
          <DateRange variant="body2">
            Feb 1 - Apr 1, &nbsp;
            <span style={{ display: "flex", alignItems: "center" }}>
              <Language fontSize="small" /> WorldWide
            </span>
          </DateRange>
          <GrowthPercentage>
            <ExpandLess fontSize="small" />
            <Typography>18.2% </Typography>
            <DescriptionText>Since last month</DescriptionText>
          </GrowthPercentage>
        </IconContainer>
      </Grid>
    </CardContainer>
  );
};

export default RevenueCard;

const CardContainer = styled(Grid)({
  alignItems: "center",
  border: "1px solid #eaedf2",
  padding: "1.25rem 1.5rem",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-of-type": {
    borderRadius: "10px",
    background: "#fff",
  },
});

const RevenueImgBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& .revenueImg": {
    width: "30px",
    height: "30px",
  },
});

const IconContainer = styled(Grid)({
  padding: 0,
});

const Title = styled(Typography)({
  color: "#4A5568",
  fontWeight: 500,
});

const Metric = styled(Typography)({
  fontWeight: 600,
  margin: "0.5rem 0",
});

const DateRange = styled(Typography)({
  color: "#718096",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
});

const GrowthPercentage = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#38A169",
  flexWrap: "wrap",
  fontWeight: 500,
});

const DescriptionText = styled(Typography)({
  color: "#4A5568",
  fontWeight: 400,
  marginLeft: 5,
});
