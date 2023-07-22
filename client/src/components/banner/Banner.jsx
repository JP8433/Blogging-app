import { styled, Box, Typography, Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

const Image = styled(Box)(({ theme }) => ({
  width: '100%',
  background: `url(https://cdn.crispedge.com/051a2e.png) center/55% repeat-x #000`,
  height: '50vh',
  borderRadius: '2px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '35vh',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '70px',
  color: '#FFFFFF',
  lineHeight: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '8px',
  background: '#2E4053',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '3px',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#BDC3C7',
    color: '#2E4053',
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const Banner = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <Image>
      <Heading>Welcome Blogger!</Heading>
      <StyledLink to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
        <StyledButton variant='contained'>Create Blog</StyledButton>
      </StyledLink>
    </Image>
  );
};

export default Banner;
