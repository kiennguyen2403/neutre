import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardHeader } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Post = ({ imageUrl, title, _creationTime: date, contents }) => {
  return (
    <Card sx={{
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0px 0px 10px 0px #000000",
      },
    }}>
      <CardHeader title={title} subheader={new Date(date).toDateString()} />
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || "https://picsum.photos/600/200"}
        alt="Post Image"
      />
      <CardContent>
        {contents?.map((comment, index) => (
          <Typography key={index} variant="h6" color="text.secondary">
            <FiberManualRecordIcon sx={{
              width: "0.5em",
              height: "0.5em",
              marginRight: "0.5em",
            }}/>
            {comment}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default Post;