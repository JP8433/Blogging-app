import { styled, Box, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled(Box)`
  border: 1px solid #283747;
  border-radius: 10px;
  margin: 10px;
  margin-top: 30px;
  margin-left: 30px;
  background-color: #F2F4F4;
  display: flex;
  flex-direction: column;
  height: 300px;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Image = styled('img')`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const ContentWrapper = styled(Box)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
`;

const Heading = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ViewCountWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ViewCountIcon = styled(VisibilityIcon)`
  color: #1f618d;
  margin-right: 5px;
`;

const ViewCountText = styled(Typography)`
  font-size: 12px;
  color: #a2a2a2;
`;

const Post = ({ post }) => {
  const url = post.picture ? post.picture : '';

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  };

  return (
    <Container>
      {url ? (
        <Image src={url} alt="Blog Image Is Not Uploaded By Author" />
      ) : (
        <Image src="https://via.placeholder.com/500x200?text=No+Image+Available" alt="No Image Available" />
      )}
      <ContentWrapper>
        <Heading>{addEllipsis(post.title, 50)}</Heading>
        <Text style={{ color: '#212F3D', marginBottom: '10px' }}>
          By {post.username} | {post.categories}
        </Text>
        <ReactQuill value={post.description} theme={null} readOnly style={{ display: 'none' }} />
        <ViewCountWrapper>
          <ViewCountIcon />
          <ViewCountText>{post.count} views</ViewCountText>
        </ViewCountWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default Post;
