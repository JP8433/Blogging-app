import { styled, Box,InputBase,Button, FormControl}  from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { AddPhotoAlternate as Add } from '@mui/icons-material';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import  "./height.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const Container=styled(Box)`
margin:50px 100px
background-color: #F2F4F4;`
   
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;


const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius:"5px",
    maxheight: "400px",
    overflow: "hidden"
});



const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

    

const StyledButton = styled(Button)`
    margin: 8px;
    background: #2E4053 ;
    color: #fff;
    text-decoration: none;
    border-radius:3px;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
    count:0
}


const CreatePost = () => {
  
//const [content,setContent] = useState('');
const [post, setPost] = useState(initialPost);
const [file, setFile] = useState('');
const location = useLocation();
const navigate = useNavigate();
const { account } = useContext(DataContext);
const [imageUrl,setImageUrl] = useState("")
//const url =  post.picture ? post.picture : "Image Not Uploded"

useEffect(() => {

    const getImage = async () => { 
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            
            const response = await API.uploadFile(data);
             post.picture = response.data
             setImageUrl(post.picture)
             console.log("HELLO FROM CONSOLE1")
        }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
},[file])


const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log("HELLO FROM CONSOLE2")
}
const savePost = async () => {
    if(post.title.trim() !== ""){
        let response= await API.createPost(post);
        if(response.isSuccess){
        navigate('/');}
    }else{
alert("Title cannot be empty!")
    }
    // let response= await API.createPost(post);
    // if(response.isSuccess){
    // navigate('/');}
}

const handleFileChange=(e)=>{
    setFile(e)
    console.log("HELLO FROM CLG3")
}
const handleDescriptionChange = (e) => {
    setPost({ ...post, "description": e });
}
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
]
 
return (
    <Container>
        <br/>
        <br/>
        <Image src={imageUrl } alt="Blog Image Is Not Uploaded" />

        <StyledFormControl>
            <label htmlFor="fileInput">
                <Add fontSize="large" color="action" />
            </label>
            <input
             
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files[0])}
            />
            <InputTextField  name='title' placeholder="Title" onChange={(e) => handleChange(e)}   />
            <StyledButton onClick={() => savePost()} variant="contained" color="primary">Publish</StyledButton>
        </StyledFormControl>

<ReactQuill id="description"
            theme="snow"
            //value={value}
            onChange={handleDescriptionChange} 
            style={{ height: '300px' }}
            modules={modules}
            formats={formats}
        />
    </Container>
)
}

export default CreatePost;

