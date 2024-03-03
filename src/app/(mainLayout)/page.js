"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Chip,
  Grid,
  Container,
  Stack,
  Typography,
  Icon,
  Skeleton,
  CircularProgress,
  Fade
} from "@mui/material";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Post from "../components/Post";
import PreferenceChooser from "../components/PreferenceChooser";
import { useUser, auth, clerkClient } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";


const TOPICS = [
  {
    title: "Sport",
    imageUrl: "https://picsum.photos/200?random=1",
  },
  {
    title: "Technology",
    imageUrl: "https://picsum.photos/200?random=2",
  },
  {
    title: "Life",
    imageUrl: "https://picsum.photos/200?random=3",
  },
  {
    title: "Politics",
    imageUrl: "https://picsum.photos/200?random=4",
  },
  {
    title: "News",
    imageUrl: "https://picsum.photos/200?random=5",
  },
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
  const [topics, setTopics] = useState(TOPICS);
  const [selectedTopics, setSelectedTopics] = useState([]);
  // const [posts, setPosts] = useState(POSTS);
  const [preferences, setPreferences] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const posts = useQuery(api.news.get, { preference: selectedTopics?.[0]?.toLowerCase() ?? '' });
  const trendingPosts = useQuery(api.topics.get);

  useEffect(() => {
    if (user?.publicMetadata?.preferences) {
      setPreferences(user.publicMetadata.preferences);
      setSelectedTopics(user.publicMetadata.preferences);
    }
  }, [user])

  const postSelectedTopics = async (topics) => {
    try {
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics }),
      });
    } catch (error) {
      console.error('Failed to update preferences', error);
    }
  }

  const savePreferences = async (topics) => {
    try {
      await postSelectedTopics(topics);
      setPreferences(topics);
      setSelectedTopics(topics);
    } catch (error) {
      console.error('Failed to update preferences', error);
    }
  }

  if (!isLoaded || !isSignedIn || !user?.publicMetadata) return null;

  return (
    <Container maxWidth="lg" sx={{ marginTop: "4rem", paddingBlock: "2rem", minHeight: "100vh" }}>
      {!preferences && !user?.publicMetadata?.preferences ? <PreferenceChooser topics={topics} onSave={savePreferences} /> :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="text.primary" pb="0.5rem">
              Topic Feed
            </Typography>
          </Grid>
          <Grid item xs={3} position="sticky" top="2rem">
            <Card>
              <Typography variant="h5" color="text.primary" padding="1rem" pb="0">
                Categories
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap" padding="1rem">
                {selectedTopics.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    variant={"filled"}
                    onClick={() => {
                      setSelectedTopics((prev) => prev.filter((t) => t !== topic));
                      postSelectedTopics(selectedTopics.filter((t) => t !== topic));
                    }}
                    color="primary"
                  />
                ))}

                {TOPICS.map((topic) => topic.title).filter((topic) => !selectedTopics.includes(topic)).map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    variant={"outlined"}
                    onClick={() => {
                      setSelectedTopics((prev) => [...prev, topic].toSorted());
                      postSelectedTopics([...selectedTopics, topic].toSorted());
                    }}
                    color="primary"
                  />
                ))}
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={3}>
              {posts ? posts.map((post, index) => (
                <Link key={`post-${index}`} href={`/news/${post._id}`}>
                  <Post {...post} />
                </Link>
              )) :
                Array.from({ length: 3 }).map((index) => (
                  <Skeleton key={index} variant="rounded" height={400} />
                ))
              }
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <Stack gap={1} padding={2} sx={{
                      textOverflow: 'ellipsis',
                    }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Icon>
                    <TrendingUpRoundedIcon />
                  </Icon>
                  <Typography variant="h5" color="text.primary">
                    Trending
                  </Typography>
                </Stack>
                {trendingPosts ? trendingPosts?.map((post, index) => (
                  <Link href={`/news/${post._id}`} key={`trending-post-${index}`}>
                    <Typography key={index} variant="h6" color="text.secondary" sx={{
                      "&:hover": {
                        textDecoration: 'underline',
                      },
                    }}>
                      {`${index + 1}. ${post.title}`}
                    </Typography>
                  </Link>
                )) :
                <Stack justifyContent="center" alignItems="center" paddingBlock="2rem">
                  <CircularProgress />
                </Stack>
                }
              </Stack>
            </Card>
          </Grid>
        </Grid>
      }
    </Container>
  );
}
