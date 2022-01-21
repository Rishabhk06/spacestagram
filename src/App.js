import "./App.css";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CardHeader,
  CardActions,
  IconButton,
  AppBar,
  Toolbar,
  listItemIconClasses,
} from "@mui/material";
import { Component } from "react";
import backgroundImage from "./stars.jpeg";

class App extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      loading: true,
      likedImages: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=QiD1g5VohUdH3ov1DQiswSYcS6BZx8Vi64t6JrGW&count=20"
      )
      .then((result) => {
        const items = result.data;
        const images = items.map((item, index) => {
          return {
            details: item,
            liked: false,
          };
        });
        this.setState({ images, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevState);
    // localStorage.setItem("likeRecord", JSON.stringify(this.state.images));
  }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  //   localStorage.removeItem("likeRecord");
  // }

  handleLike = (item, index) => {
    let currentState = [...this.state.images];
    currentState[index] = {
      ...item,
      liked: !item.liked,
    };
    //show only liked images
    console.log("isliked?", item.liked);
    let currentLikedImages = this.state.likedImages;
    if (!item.liked) {
      currentLikedImages.push(item.details);
    } else {
      //Remove image from likedImages in state
      let indexUnlikedImage = currentLikedImages.indexOf(item.details.title);
      currentLikedImages.splice(indexUnlikedImage, 1);
    }

    this.setState({
      images: currentState,
      likedImages: currentLikedImages,
    });
  };

  render() {
    return (
      <div className="div">
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h3" fontFamily="cursive">
              Spacetagram
            </Typography>
            {/* <Typography variant="subtitle1">Explore the Unexplored</Typography> */}
            <Typography variant="subtitle1">Powered by NASA API</Typography>
          </Toolbar>
        </AppBar>
        {/* // <Container sx={{ margin: "50px 50px" }}> */}
        <Grid
          className="grid"
          container
          spacing={3}
          padding={3}
          sx={{ backgroundImage: `url(${backgroundImage})`, marginTop: "0" }}
        >
          {this.state.images.map((item, index) => {
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
                    <IconButton onClick={() => this.handleLike(item, index)}>
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
        {/* // </Container> */}
      </div>
    );
  }
}

export default App;
