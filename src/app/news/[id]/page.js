import React from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import Link from 'next/link';
import AppRouter from 'next/dist/client/components/app-router';
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
  { name: "Topic 1", retweets: 120, likes: 250, replies: 30 },
  { name: "Topic 2", retweets: 90, likes: 200, replies: 25 },
  { name: "Topic 3", retweets: 75, likes: 150, replies: 20 },
  // Add more topics as needed
];



const News = ({ params }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 , margin: '90px'}}>
      <Grid container spacing={3}>
        {/* Comments section (left column) */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Top Comment Trends
            </Typography>
            <List>
              {comments.slice(0, 3).map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={comment.text} />
                  </ListItem>
                  {index < 2 && <Divider component="li" />}  
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

       {/* News content section (middle column) */}
       <Grid item xs={12} md={6}>
          {newsContents.map((newsContent, index) => (
            <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {newsContent.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {newsContent.body}
              </Typography>
              <div style={{ marginTop: '16px' }}>
                <Link href={newsContent.url} passHref>
                  <Button component="a" variant="contained" color="primary" target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </Button>
                </Link>
              </div>
            </Paper>
          ))}
        </Grid>


        {/* Trending section (right column) */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
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
