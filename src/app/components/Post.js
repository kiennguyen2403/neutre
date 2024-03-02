import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardHeader } from '@mui/material';

const Post = ({ imageUrl, title, date, comments }) => {
  return (
    <Card>
      <CardHeader title={title} subheader={new Date(date).toDateString()} />
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt="Post Image"
      />
      <CardContent>
        {comments.map((comment, index) => (
          <Typography key={index} variant="h6" color="text.secondary">
            {comment}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default Post;