import axios from 'axios'

const url= "http://localhost:8082/api";


// dealing with users
export const login = async (email , pass)=>{
    let response = await axios.get(`${url}/user/login/${email}/${pass}`);
    return response.data;
}

export const createUser = async (data)=>{
    let response = await axios.post(`${url}/user` , data);
    return response.data;
}

export const getDataByMail = async (email) =>{
    let response = await axios.get(`${url}/user/email/${email}`);
    return response.data;
}

export const getDataById = async (userId) =>{
    let response = await axios.get(`${url}/user/userId/${userId}`);
    return response.data;
}

export const addUser = async (userData)=>{
    let response = await axios.post(`${url}/user` , userData);
    return response.data;
}

export const updateUser = async (userId , pass, userData)=>{
    let response = await axios.put(`${url}/user/${userId}/${pass}` , userData);
    return response.data;
}

export const updatePicture = async (userId ,userData)=>{
    let response = await axios.put(`${url}/user/${userId}` , userData);
    return response.data;
}

export const deleteUser = async (userId)=>{
    let response = await axios.delete(`${url}/user/${userId}`);
    return response.data;
}

export const getAllUsers = async ()=>{
    let response = await axios.get( `${url}/user`);
    return response.data;
}

export const getConnectionList = async (userId)=>{
    let response = await axios.get( `${url}/user/${userId}/friends`);
    return response.data;
}

// dealing with posts
export const getAllPosts = async ()=>{
    let response = await axios.get(`${url}/post`);
    return response.data;
}

export const getPost = async (postId)=>{
    let response = await axios.get(`${url}/post/${postId}`);
    return response.data;
}

export const getAllPostByUserId = async (userId)=>{
    let response = await axios.get(`${url}/post/userId/${userId}`);
    return response.data;
}

export const createPost = async (data)=>{
    let response = await axios.post(`${url}/post` , data);
    return response.data;
}

export const likePost = async (postId , userId)=>{
    let response = await axios.post(`${url}/post/${postId}/like/${userId}`);
    return response.data;
}

// dealing with category
export const getAllCategories = async ()=>{
    let response = await axios.get(`${url}/category`);
    return response.data;
}

// dealing with comments
export const getAllComments = async ()=>{
    let response = await axios.get(`${url}/comment`);
    return response.data;
}

export const getAllPostByPostId = async (postId)=>{
    let response = await axios.get(`${url}/comment/postId/${postId}`);
    return response.data;
}

export const postComment = async (postId , userId , data)=>{
    let response = await axios.post(`${url}/comment/${postId}/user/${userId}` , data);
    return response.data;
}
