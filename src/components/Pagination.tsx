import { Button, HStack, Box } from '@chakra-ui/react';

export function Pagination() {
  const active = 0;

  return (
    <HStack mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <Button
            size="sm"
            fontSize="xs"
            w="4"
            {...(active === index ? { colorScheme: "pink" } : {})}
            {...(active !== index ? { 
              bgColor: "gray.700", _hover: { bg: 'gray.500' } 
            } : {})}
            disabled={active === index}
            _disabled={
              active === index ? { bgColor: 'pink.500', cursor: 'default' } : {}
            }
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </HStack>
  );
}