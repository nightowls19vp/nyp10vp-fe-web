import React, { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

import { Colors } from "../../config/Colors";
import DetailMyPackage from "../../component/package/DetailMyPackage.js";

function MyPackage() {
  const [name, setName] = useState(null);
  const [dateBuy, setDateBuy] = useState(null);
  const [exp, setExp] = useState(null);
  const [money, setMoney] = useState(null);
  const [member, setMember] = useState(null);
  return (
    <Stack paddingX={"15px"}>
      <Typography
        variant="button"
        display="block"
        fontSize={18}
        color={Colors.textPrimary}
        gutterBottom
      >
        Gói đang sử dụng
      </Typography>
      <DetailMyPackage title="Tên gói: " detail={name} />
      <DetailMyPackage title="Ngày mua: " detail={dateBuy} />
      <DetailMyPackage title="Hạn sử dụng: " detail={exp} />
      <DetailMyPackage title="Số tiền: " detail={money} />
      <DetailMyPackage title="Số lượng thành viên: " detail={member} />
      <Typography
        variant="button"
        display="block"
        fontSize={18}
        color={Colors.textPrimary}
        gutterBottom
      >
        Lịch sử mua gói
      </Typography>
    </Stack>
  );
}

export default MyPackage;
