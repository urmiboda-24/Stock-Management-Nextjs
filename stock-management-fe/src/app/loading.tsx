"use client";
import { RootState } from "@/store/store";
import { Box, CircularProgress, styled } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  console.log(isLoading);

  return (
    <>
      <LoaderContainer>
        <CircularProgress />
      </LoaderContainer>
    </>
  );
};

export default Loader;

const LoaderContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
