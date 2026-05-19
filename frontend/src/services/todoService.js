import axios
from "axios";

const API =
"http://localhost:5000/api/v1/todos";

export const
getTodos =
async ()=>{

const token =
localStorage
.getItem(
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

export const
toggleTodo =
async(id)=>{

const token =
localStorage
.getItem(
"token"
);

const response =
await axios.put(
`${API}/${id}`,
{},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

return response.data;
};

export const createTodo = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteTodo = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};