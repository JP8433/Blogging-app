import { Grid, Typography } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Posts from './post/Posts';

const Home = () => {

    return (
        <>
            <Banner />
            <Grid container style={{ backgroundColor: "#F2F4F4" }}>
                <Grid container item xs={12} sm={10} lg={12} style={{ minHeight: "500px" }}>
                    <Posts />
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" style={{ height: "50px", backgroundColor: "#2E4053", color: "#fff",borderRadius:"8px" }}>
                    <Typography variant="body1">© 2023 Your Blog. All Rights Reserved.</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
