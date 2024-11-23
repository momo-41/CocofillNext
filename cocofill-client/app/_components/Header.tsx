import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    // headerの影が不要だったためにAppbarコンポーネントを削除
    <Toolbar sx={{ borderBottom: 1, borderColor: "#C7C7C7" }}>
      <Typography
        //flexGrowはheaderの右側に要素を追加した時のために入れておく
        flexGrow={1}
        ml={2}
        my={1}
        fontSize={24}
        fontFamily={"sans-serif"}
        fontWeight={600}
        letterSpacing={0.5}
        color="#3BB3C6"
      >
        Cocofill
      </Typography>
    </Toolbar>
  );
};
export default Header;
