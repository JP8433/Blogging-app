import { AppBar, Toolbar, styled, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Categories from '../home/Categories';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


const Component = styled(AppBar)`
  background: #283747;
  color: #FBFCFC ;
  border-radius: 5px;
`;

const Container = styled(Toolbar)`
  justify-content: left;
  & > a {
    padding: 10px 20px;
    color: #FBFCFC;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background-color 0.3s ease-in-out;
    border-radius: 5px;
    margin: 0 10px;
    &:hover {
      background-color: #FBFCFC;
      color: #283747;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate('/account');

  const isMobile = useMediaQuery('(max-width:600px)');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Component>
      <Container>
        <Categories />
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={StyledLink} to="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={StyledLink} to="/about" onClick={handleClose}>
                About
              </MenuItem>
              <MenuItem component={StyledLink} to="/contact" onClick={handleClose}>
                Contact
              </MenuItem>
              <MenuItem component={StyledLink} to="/login" onClick={logout}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/login" onClick={logout}>
              LOGOUT
            </Link>
          </>
        )}
      </Container>
    </Component>
  );
};

export default Header;
