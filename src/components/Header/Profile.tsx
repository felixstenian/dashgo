import { Avatar, Flex, Text, Box } from "@chakra-ui/react"

export const Profile = () => {
  return (
    <Flex align='center'>
      <Box mr={4} textAlign='right'>
        <Text>Felix Stenian</Text>
        <Text color='gray.300' fontSize='small'>
          felixstenian@gmail.com
        </Text>
      </Box>

      <Avatar size='md' name='Stenian Felix' src='https://github.com/felixstenian.png' />
    </Flex>
  )
}
