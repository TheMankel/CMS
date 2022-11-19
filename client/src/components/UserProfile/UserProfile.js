import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/system";

const UserProfile = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8} border={1}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h4" component="div">
                Lizard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Lizard
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">BUTTON</Button>
              <Button size="medium">BUTTON2</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
