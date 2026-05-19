import axios from "axios";

const API =
"http://localhost:5000/api/v1/history";

export const getHistory =
async () => {

const token =
localStorage.getItem(
"token"
);

const response =
await axios.get(
API,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

return response.data;
};

export const getHistoryDetail = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};