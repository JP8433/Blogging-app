import {Box,TextField,Button,styled,Typography} from '@mui/material';
import React, { useState,useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    width: 400px;
    heigth:500px;
    border-radius:25px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;

    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background:  #2E4053;
    color: #fff;
    height: 48px;
    border-radius:20px;
`;

const SignupButton = styled(Button)`
text-transform: none;
    background: #17202A;
    color: white;
    height: 48px;
    border-radius:20px;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;





const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const loginInitialValues = {
    username: '',
    password: ''
};

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Login=({isUserAuthenticated})=>{
    
    const imageURL = 'https://cdn-icons-png.flaticon.com/512/1828/1828506.png';


    const [account,toggleAccount]=useState('login')
    const [signup,setSignup]=useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValues);
    const [error, showError] = useState('');
    const { setAccount } = useContext(DataContext)
    const navigate = useNavigate();


     const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }


    const loginUser= async ()=>{
        let response = await API.userLogin(login);
        console.log(response) 
        if (!response.isSuccess){
            console.log("LOGIN NOT FOUND")
        }
        if (response.isSuccess) {
            showError('');
            console.log("LOGIN FOUND")
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
             setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
             navigate('/');

        } else {
           
            showError('Something went wrong! please try again later');
            alert("username does not match!");
        }
    }

    return(
        <Component>
   <Box>
        < Image src={imageURL} alt="Blog"></Image>
{
        account === 'login' ?
        <Wrapper>
        <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Enter Username"/>
        <TextField variant="standard"value={login.password}  onChange={(e) => onValueChange(e)} name="password" label="Enter Password" type="password"/>


          {error && <Error>{error}</Error>}
          
        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <SignupButton variant="contained"  onClick={() => toggleSignup()}>Create an Account</SignupButton>
        </Wrapper>:
<Wrapper>
        <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
        <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter Username"/>
        <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter Password" type="password"/>
       
        {error && <Error>{error}</Error>}
       
       
       
        <SignupButton variant="contained"  onClick={() => signupUser()} >Signup</SignupButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <LoginButton variant="contained"  onClick={() => toggleSignup()}>Already have an Account</LoginButton>
        </Wrapper>
}
    </Box>
    </Component>
    )
}

export default Login