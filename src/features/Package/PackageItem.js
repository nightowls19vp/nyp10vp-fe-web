import React from "react";
import { Box, Stack, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import "../../assets/css/Package.scss";
import DetailItem from "../../component/package/DetailItem";

function PackageItem({ data }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="containerPackage"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="GÓI NGƯỜI DÙNG" value="1" sx={{ marginX: "50px" }} />
            <Tab label="CÁC TIỆN ÍCH" value="2" sx={{ marginX: "50px" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box className="containerPackage" >
            {data.child?.map((route) =>
              route ? 
                <DetailItem item={route} key={route._id} />
              : null
            )}
          </Box>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}

export default PackageItem;
