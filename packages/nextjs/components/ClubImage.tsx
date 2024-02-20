import React from "react";
import { Box, Image } from "grommet";
import clubDescriptions from "~~/utils/clubDescriptions";

const ClubImage: React.FC<{ club: string }> = ({ club }) => {
  return (
    <Box>
      <Image
        key={club}
        style={{ borderRadius: 30 }}
        src={`42Hack/${club}.png`}
        onClick={() => {
          window.location.href = `/clubs/${club}`;
        }}
        title={clubDescriptions[club]}
      />    
    </Box>
  );
};

export default ClubImage;
