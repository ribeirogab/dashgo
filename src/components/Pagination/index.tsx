import { Stack, Box } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

export function Pagination() {
  const current = 0;

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <PaginationItem
            key={item}
            pageNumber={index + 1}
            isCurrent={index === current}
          />
        ))}
      </Stack>
    </Stack>
  );
}