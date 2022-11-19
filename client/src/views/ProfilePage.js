import * as React from "react";
import Box from "@mui/material/Box";
import UserProfile from "../components/UserProfile/UserProfile";
import MainPublic from "../layouts/MainPublic";

export default function ProfilePage() {
  return (
    <MainPublic>
      <UserProfile />
    </MainPublic>
  );
}
