"use client";
import CommonNavigation from "@/components/navigation";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };
  return (
    <>
      <CommonNavigation>
        <Typography variant="h4">Welcome to Admin Dashboard</Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </CommonNavigation>
    </>
  );
};

export default AdminDashboard;
