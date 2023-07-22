import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
  padding: '50px',
  backgroundColor: '#F2F4F4',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'contain',
  borderRadius: '5px',
  maxHeight: '400px',
  overflow: 'hidden',
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Author = styled(Box)`
  color: '#CB4335';
  margin: 20px 0;
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

const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const url = post.picture ? post.picture : '';

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);

        if (post.count === 0) {
          let tempData = response.data;
          tempData['count'] = tempData['count'] + 1;

          const savePost = async () => {
            await API.updatePost(tempData);
          };
          savePost();
        }
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate('/');
  };

  return (
    <Container>
      <br />
      <Image src={url} alt="blog" />
      <Box style={{ float: 'right' }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`} style={{textDecoration:"none"}}>
              <StyledButton variant="contained">
                Edit
              </StyledButton>
            </Link>
            <Button variant="contained" color="error" onClick={() => deleteBlog()}>
              Delete
            </Button>
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
        </Typography>
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <ReactQuill value={post.description} theme={null} readOnly />
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
