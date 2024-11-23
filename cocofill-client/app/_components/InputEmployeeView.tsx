import * as React from "react";
import { Box, TextField, Stack } from "@mui/material";

const InputEmployeeView = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Stack
          component="form"
          sx={{ width: "25ch" }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="名前" variant="outlined" />
          <TextField id="outlined-basic" label="役職" variant="outlined" />
          <TextField id="outlined-basic" label="スキル" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="希望の週休"
            variant="outlined"
          />
          {/* <TextField
            id="outlined-basic"
            label="希望の出勤時間"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="希望の退勤時間"
            variant="outlined"
          /> */}
        </Stack>
      </Box>
    </>
  );
};
export default InputEmployeeView;
