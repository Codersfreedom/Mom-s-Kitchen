import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchFromEdamam = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios.get(url, options);

  if (response.status != 200) {
    throw new Error(
      "Could not connect to the EDAMAM datatbase ",
      response.statusText
    );
  }
  return response.data;
};
