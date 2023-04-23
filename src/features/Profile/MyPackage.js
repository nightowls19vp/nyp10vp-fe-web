import React, { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

import { Colors } from "../../config/Colors";
import DetailPackage from "../../component/package/DetailPackage";

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
      <DetailPackage title="Tên gói: " detail={name} />
      <DetailPackage title="Ngày mua: " detail={dateBuy} />
      <DetailPackage title="Hạn sử dụng: " detail={exp} />
      <DetailPackage title="Số tiền: " detail={money} />
      <DetailPackage title="Số lượng thành viên: " detail={member} />
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
