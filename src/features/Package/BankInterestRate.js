import React, { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import TextFieldCustom from "../../component/text-field/TextFieldCustom";

function BankInterestRate() {
  const [price, setPrice] = useState();
  const ChangeValue = (value) => {
    setPrice(value);
  };
  return (
    <Stack spacing={2} className="interest-rate">
      <Typography className="title">Lãi suất ngân hàng</Typography>
      <Typography className="summary">
        Công cụ tính lãi suất tiết kiệm ngân hàng giúp bạn dễ dàng biết được số
        tiền lãi trong tương lai. Từ đó có thể so sánh các mức lãi suất ngân
        hàng, kỳ hạn gửi và đưa ra quyết định có lợi nhất cho mình.
      </Typography>
      <Box>
        <TextFieldCustom sizeText={"medium"} ChangeValue={ChangeValue} />
      </Box>
    </Stack>
  );
}

export default BankInterestRate;
