"use client";
import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardHeader, Fade } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VizSensor from 'react-visibility-sensor';

const Post = ({ imageUrl, title, _creationTime: date, contents }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VizSensor onChange={(isVisible) => {
      if (isVisible)
        setIsVisible(isVisible);
    }}>
      <Fade in={isVisible} timeout={1000}>
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
                }} />
                {comment}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Fade>
    </VizSensor>
  );
};

export default Post;