import React, { useState } from "react";

import { Box, Autocomplete, TextField } from "@mui/material";

const options = ["Option 1", "Option 2"];

function AddressVietNam({ handleAddress }) {
  const [province, setProvince] = useState(null);
  const [inputProvince, setInputProvince] = useState("");

  const [district, setDistrict] = useState(null);
  const [inputDistrict, setInputDistrict] = useState("");

  const [war, setWar] = useState(null);
  const [inputWar, setInputWar] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box flex={1}>
        <Autocomplete
          value={province}
          onChange={(event, newValue) => {
            setProvince(newValue);
          }}
          inputValue={inputProvince}
          onInputChange={(event, newInputValue) => {
            setInputProvince(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Tỉnh/Thành phố" />
          )}
        />
      </Box>
      <Box flex={1}>
        <Autocomplete
          disabled={province !== null ? false : true}
          value={district}
          onChange={(event, newValue) => {
            setDistrict(newValue);
          }}
          inputValue={inputDistrict}
          onInputChange={(event, newInputValue) => {
            setInputDistrict(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Quận/huyện" />
          )}
        />
      </Box>
      <Box flex={1}>
        <Autocomplete
          disabled={province === null || district === null ? true : false}
          value={war}
          onChange={(event, newValue) => {
            setWar(newValue);
            handleAddress(province, district, newValue);
          }}
          inputValue={inputWar}
          onInputChange={(event, newInputValue) => {
            setInputWar(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Phường/Xã" />
          )}
        />
      </Box>
    </Box>
  );
}

export default AddressVietNam;
