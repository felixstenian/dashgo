import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import Link from "next/link"
import { ElementType } from "react"
import ActiveLink from "../ActiveLink/ActiveLink"

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType,
  children: string,
  href: string,
}

export const NavLink = ({ icon, href, children, ...rest }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display='flex' align='center' {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml={4} fontWeight='medium'>
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
