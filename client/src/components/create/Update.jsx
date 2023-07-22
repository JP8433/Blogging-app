import { styled, Box,InputBase,Button, FormControl}  from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { AddPhotoAlternate as Add } from '@mui/icons-material';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { API } from '../../service/api';
import  "./height.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'



const Container = styled(Box)(({ theme }) => ({
  padding: '50px',
  backgroundColor:"#F2F4F4",
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
}));

   
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;


const Image = styled('img')({
    width: '100%',
    height: '50vh',
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
    background: #2E4053;
    color: #fff;
    text-decoration: none;
    border-radius: 3px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color:#BDC3C7 ;
        color: #2E4053;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const Update = () => {
  
//const [content,setContent] = useState('');
const [post, setPost] = useState(initialPost);
const [file, setFile] = useState('');
const location = useLocation();
const navigate = useNavigate();
const { account } = useContext(DataContext);
const [imageUrl,setImageUrl] = useState("")

//const url =  post.picture ? post.picture : "Image Not Uploded"
const { id } = useParams();

useEffect(() => {
    const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
}, []);


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

},[file])

const updateBlogPost = async () => {
    await API.updatePost(post);
    console.log("update ssks")
    console.log(post)
    navigate(`/details/${id}`);
}


const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log("HELLO FROM CONSOLE2")
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
      
        <Image src={imageUrl||post.picture } alt="Blog Image Is Not Uploaded" />

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
            <InputTextField  name='title' placeholder="Title" onChange={(e) => handleChange(e)}  value={post.title} />
            <StyledButton onClick={() => updateBlogPost()} variant="contained" color="primary">UpdateBlog</StyledButton>
         
        </StyledFormControl>

<ReactQuill id="description"
            theme="snow"
            //value={value}
            onChange={handleDescriptionChange} 
            style={{height:"300px"}}
            modules={modules}
            formats={formats}
            value={post.description}
        />
    </Container>
)
}

export default Update;

