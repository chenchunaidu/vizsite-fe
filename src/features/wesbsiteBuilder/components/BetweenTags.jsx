import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function BetweenTags({ betweenTags, handleBetweenTagsChange }) {
  return (
    <FormControl>
      <FormLabel>Value</FormLabel>
      <Input
        onChange={(e) => {
          handleBetweenTagsChange(e);
        }}
        value={betweenTags}
      />
    </FormControl>
  );
}
