const axios = require("axios");
export const processFile = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  if (file) {
    reader.readAsText(file);
    reader.onload = (event) => {
      const result = event.target.result;
      const jsonString = JSON.parse(result);

      axios
        .post("/api/uploadHouse", jsonString)
        .then((res) => {
          if (res.status === 200) {
            console.warn(res.data);
            // Initialize states
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    };
  }
};