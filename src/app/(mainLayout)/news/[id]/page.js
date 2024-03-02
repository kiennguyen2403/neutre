"use client";
import React from 'react';
import { Stack, Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Skeleton, useTheme } from '@mui/material';
import Link from 'next/link';
import AppRouter from 'next/dist/client/components/app-router';
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
// Mock data
const newsContents = [
  {
    title: "Post 1 Title",
    body: "This is the body of post 1. It contains some summary of the content.",
    url: "https://twitter.com/x"
  },
  {
    title: "Post 2 Title",
    body: "This is the body of post 2. It contains some summary of the content.",
    url: "https://twitter.com/x"
  },
  {
    title: "Post 3 Title",
    body: "This is the body of post 3. It contains some summary of the content.",
    url: "https://twitter.com/x"
  },
  // Add more posts as needed
];

const comments = [
  { user: 'User1', text: 'Great article!' },
  { user: 'User2', text: 'Interesting point of view.' },
  { user: 'User3', text: 'I disagree with this opinion.' },
  // Add more comments as needed
];

const trendingTopics = [
  { name: "Paris Fashion Week 2024", retweets: 120, likes: 250, replies: 30 },
  { name: "DunkleyVote", retweets: 90, likes: 200, replies: 25 },
  { name: "YeonJun", retweets: 75, likes: 150, replies: 20 },
  // Add more topics as needed
];

const News = ({ params }) => {
  const news = useQuery(api.news.getById, { id: params.id ?? '' });
  const [selectedPost, setSelectedPost] = React.useState(null);
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 , margin: '90px'}}>
      <Grid container spacing={3}>
        {/* Comments section (left column) */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ overflow: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Top Comment Trends
            </Typography>
            <List>
              {news?.sources?.[selectedPost]?.comment?.slice(0, 3).map((comment, index, comments) => (
                <React.Fragment key={`comment-${index}`}>
                  <ListItem>
                    <ListItemText primary={comment} />
                  </ListItem>
                  {index < 2 && index !== comments.length - 1 && <Divider component="li" />}  
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

       {/* News content section (middle column) */}
       <Grid item xs={12} md={6}>
          {news ? news.sources?.map((newsContent, index) => (
            <Paper
              key={`post-${index}`}
              elevation={3}
              sx={{
                padding: 2,
                marginBottom: 2,
                outline: selectedPost === index ? '2px solid' : 'none',
                outlineColor: theme.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => {
                if (selectedPost === index) {
                  setSelectedPost(null);
                  return;
                }
                setSelectedPost(index)
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {newsContent.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {newsContent.description}
              </Typography>
              <div style={{ marginTop: '16px' }}>
                  <Button href={newsContent.url} component="a" variant="contained" color="primary" target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </Button>
              </div>
            </Paper>
          )) :
            <Stack gap={2}>
            {
              Array.from({ length: 3 }).map((index) => (
                <Skeleton key={index} variant="rounded" height={400} />
              ))
            }
            </Stack>
          }
        </Grid>


        {/* Trending section (right column) */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ overflow: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ p: 2, pb: 0 }}>
              Related Trending Topics on Twitter
            </Typography>
            <List>
              {trendingTopics.map((topic, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText 
                      primary={topic.name} 
                      secondary={`Retweets: ${topic.retweets}, Likes: ${topic.likes}, Replies: ${topic.replies}`} 
                    />
                  </ListItem>
                  {index < trendingTopics.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>



      </Grid>
    </Container>
  );
};

export default News;
