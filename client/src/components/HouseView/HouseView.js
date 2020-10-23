import React from "react";
import Title from "../Title";
import Button from "@material-ui/core/Button";
import axios from "axios";
import HouseStore from "@/src/stores/HouseStore";
import HouseLayout from "./HouseLayout";
import Input from "@material-ui/core/Input";

export default function HouseView() {
  const { setHouse, setWindows } = HouseStore();

  const processFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsText(file);
      reader.onload = (onLoadEvent) => {
        const result = onLoadEvent.target.result;
        const jsonString = JSON.parse(result.toString());

        axios
          .post("/api/upload-house", jsonString)
          .then((res) => {
            if (res.status === 200) {
              setHouse(res.data);
              const windowsArr = res.data.houseCoor.windows;
              const windowsMap = new Map();
              windowsArr.forEach((window) => {
                windowsMap.set(
                  window.name.substr(0, window.name.indexOf("-w")),
                  false
                );
              });
              setWindows(windowsMap);
            }
          })
          .catch((err) => {
            console.warn(err);
          });
      };
    }
  };

  return (
    <React.Fragment>
      <Title>House View</Title>
      <HouseLayout />
      <Input
        id="file-button"
        type="file"
        accept=".txt"
        style={{ display: "none" }}
        onChange={(e) => {
          processFile(e);
        }}
      />
      <label htmlFor="file-button">
        <Button variant="contained" color="primary" component="span">
          Upload house-layout file
        </Button>
      </label>
    </React.Fragment>
  );
}
