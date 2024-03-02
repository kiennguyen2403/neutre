"use client";
import { useState } from "react";
import {
  Card,
  Chip,
  Grid,
  Container,
  Stack,
  Typography,
  Icon,
} from "@mui/material";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Post from "./components/Post";

const TOPICS = [
  "Sport",
  "Technology",
  "Life",
  "Politics",
  "News"
]

const POSTS = [
  {
    title: "Post 1",
    imageUrl: "https://picsum.photos/600/200?random=1",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
  {
    title: "Post 2",
    imageUrl: "https://picsum.photos/600/200?random=2",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
  {
    title: "Post 3",
    imageUrl: "https://picsum.photos/600/200?random=3",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
]

const trendingPosts = [
  {
    title: "Trending Post 1",
    imageUrl: "https://picsum.photos/600/200?random=4",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
  {
    title: "Trending Post 2",
    imageUrl: "https://picsum.photos/600/200?random=5",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
  {
    title: "Trending Post 3",
    imageUrl: "https://picsum.photos/600/200?random=6",
    date: new Date(),
    comments: ["Comment 1", "Comment 2"],
  },
]

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState(TOPICS);
  const [posts, setPosts] = useState(POSTS);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "4rem", paddingBlock: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <Stack direction="row" gap={1} flexWrap="wrap" padding="1rem">
              {selectedTopics.map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  variant={"filled"}
                  onClick={() => {
                    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
                  }}
                  color="primary"
                />
              ))}

              {TOPICS.filter((topic) => !selectedTopics.includes(topic)).map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  variant={"outlined"}
                  onClick={() => {
                    setSelectedTopics((prev) => [...prev, topic].toSorted());
                  }}
                  color="primary"
                />
              ))}
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Stack gap={3}>
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Stack gap={1} padding={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Icon>
                  <TrendingUpRoundedIcon />
                </Icon>
                <Typography variant="h5" color="text.primary">
                  Trending
                </Typography>
              </Stack>
              {trendingPosts.map((post, index) => (
                <Typography key={index} variant="h6" color="text.secondary">
                  {`${index + 1}. ${post.title}`}
                </Typography>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
