"use client";
import CommonNavigation from "@/components/navigation";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SaleChat from "./_components/saleChart";
import RevenueCard from "./_components/revenueCard";
import PageVisiter from "./_components/pageVisiter";
import TeamSection from "./_components/teamSection";
import ProgressTrack from "./_components/progressTrack";
import OrderSection from "./_components/orderSection";
import RankSection from "./_components/rankSection";
import AcquisitionSection from "./_components/acquisitionSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getRandomStock } from "@/store/thunk/userDashboard";

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((state: RootState) => state.userDashboard);

  useEffect(() => {
    dispatch(getRandomStock());
  }, []);
  return (
    <>
      <CommonNavigation>
        <Box style={{ width: "100%" }}>
          {SaleChat()}
          <Grid container spacing={3} style={{ marginBottom: "24px" }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <RevenueCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <RevenueCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <RevenueCard />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <PageVisiter />
                </Grid>
                <Grid size={{ xs: 12, xl: 6 }}>
                  <TeamSection />
                </Grid>
                <Grid size={{ xs: 12, xl: 6 }}>
                  <ProgressTrack />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <OrderSection />
                </Grid>
                <Grid size={12}>
                  <RankSection />
                </Grid>
                <Grid size={12}>
                  <AcquisitionSection />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CommonNavigation>
    </>
  );
};

export default UserDashboard;
