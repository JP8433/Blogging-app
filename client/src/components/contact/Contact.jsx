import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://rosemountpathways.com/wp-content/uploads/2022/05/2019-06_Contact-Us.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
    border-radius:10px;
  
  
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
    background-color: #F2F4F4;
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <br/>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/jay_patel__05/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:jaypatel.in9167@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                        
                    </Link>.
                    <p style={{ textDecoration: 'none !important' }}>Contact Number: 8433828915</p>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;