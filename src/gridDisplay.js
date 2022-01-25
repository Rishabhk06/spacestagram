import { Component } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  Container,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  AppBar,
  Toolbar,
  CircularProgress,
  Button,
} from "@mui/material";
import backgroundImage from "./stars.jpeg";
import { Link } from "react-router-dom";
import Animation from "./animation";

class GridDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("loading", this.props.loading);
    if (this.props.loading) {
      return <Animation />;
    } else {
      return (
        <div className="div">
          <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography variant="h3" fontFamily="cursive">
                  Spacetagram
                </Typography>
              </Link>
              <Link to="/likes" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<FavoriteIcon />}
                  sx={{ fontWeight: "bold" }}
                >
                  My Likes
                </Button>
              </Link>
              <Typography variant="subtitle1">Powered by NASA API</Typography>
            </Toolbar>
          </AppBar>
          <Grid
            className="grid"
            container
            spacing={3}
            padding={3}
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              marginTop: "0",
            }}
          >
            {this.props.images.map((item, index) => {
              return (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <Card raised>
                    <CardMedia
                      image={item.details.url}
                      sx={{ height: "250px" }}
                    ></CardMedia>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" align="center">
                        {item.details.title}
                      </Typography>
                      <Typography variant="subtitle1" align="center">
                        {item.details.date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => this.props.handleLike(item, index)}
                      >
                        {item.liked ? (
                          <FavoriteIcon sx={{ color: "red" }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
  }
}

export default GridDisplay;
