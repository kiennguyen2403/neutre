import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Stack, useTheme } from '@mui/material';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PreferenceChooser = ({ topics, onSave }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h3" textAlign="center">
        Choose your preferences
      </Typography>
      <Typography variant="h6" textAlign="center" marginBlock="0.5rem 3rem">
        You can change these anytime later
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
        {topics.map(({ imageUrl, title }, index) => (
          <Card
            key={index}
            sx={{
              position: "relative",
              outline: selectedTopics.includes(title) ? "2px solid" : "none",
              outlineColor: theme.palette.primary.main,
              cursor: "pointer",
            }}
            onClick={() => {
              if (selectedTopics.includes(title)) {
                setSelectedTopics((prev) => prev.filter((t) => t !== title));
                return;
              }
              setSelectedTopics((prev) => [...prev, title].toSorted());
            }}
          >
            {selectedTopics.includes(title) && (
              <CheckCircleIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: theme.palette.primary.main,
                  zIndex: 1,
                }}
              />
            )}
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={title}
              style={{ filter: 'brightness(50%)' }}
            />
            <CardContent style={{ padding:'0.3rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Typography variant="h4" fontSize="1.5rem" component="div">
                {title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button
        onClick={() => onSave(selectedTopics)}
        sx={{
          alignSelf: "center",
          marginTop: "4rem",
          padding: "0.75rem 2rem",
          fontSize: "1.2rem",
        }}
        variant="contained"
        disabled={selectedTopics.length === 0}
      >
        Continue
      </Button>
    </Box>
  );
};

export default PreferenceChooser;
