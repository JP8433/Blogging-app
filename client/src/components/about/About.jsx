
import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://element502.com/wp-content/uploads/2017/01/about-post.jpg);
    width: 100%;
    height: 80vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
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

const About = () => {

    return (
        <Box>
         
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Jay Patel</Typography>
                <Text variant="h5">I'm a Full Stack Development Enthusiast. 
                    I develop websites.<br />
                    </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/jay_patel__05/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:jaypatel.in9167@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;