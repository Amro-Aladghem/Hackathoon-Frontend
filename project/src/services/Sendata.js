import axios from "axios";

export const Sendata = async (api, image, message, isFirstTime, sessionId) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("Message", message);
    formData.append("isFirstTime", isFirstTime);
    formData.append("SessionId", sessionId);

    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      mode: "cors",
    });

    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

