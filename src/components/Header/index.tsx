import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SerachBox } from './SerachBox'

const Header = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex
      as='header' 
      w='100%'
      maxWidth={1480}
      h='20'
      mx='auto'
      mt={4}
      align='center'
      px={6}
    >
      <Logo />
      { isWideVersion && <SerachBox /> }
      <Flex
        align='center'
        ml='auto'
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}

export default Header