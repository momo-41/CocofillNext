// 提出されたシフトとボタンで選択してるシフトを比較して、適切にシフトが選択されていない場合はテーブルのセルの色が変わらなかったため、コメントアウト

// import React from "react";
// import { TableCell } from "@mui/material";

// type ShiftCellColorProps = {
//   shiftValue: string;
//   selectedValue: string;
//   children: React.ReactNode;
// }

// const ShiftCellColor: React.FC<ShiftCellColorProps> = ({
//   shiftValue,
//   selectedValue,
//   children,
// }) => {
//   console.log("ShiftCellColor:", { shiftValue, selectedValue }); // デバッグ用
//   // 条件に基づいて背景色を変更
//   const backgroundColor =
//     shiftValue === "朝" && (selectedValue === "中" || selectedValue === "遅")
//       ? "rgba(255, 0, 0, 0.5)" // 薄い赤色
//       : "transparent"; // デフォルトの背景色

//   return (
//     <TableCell
//       align="center"
//       sx={{ backgroundColor, borderRight: "1px solid #ddd" }}
//     >
//       {children}
//     </TableCell>
//   );
// };

// export default ShiftCellColor;
