import { Box, Stack } from "@chakra-ui/react"
import { RiContactsFill, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

const Sidebar = () => {
  return (
    <Box as='aside' w={64} m={8}>
      <Stack spacing={12} align='flex-start'>
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine}>
            Dashboard
          </NavLink>

          <NavLink icon={RiContactsFill}>
          Usuários
          </NavLink>
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
          <NavLink icon={RiInputMethodLine}>
            Formulários
          </NavLink>

          <NavLink icon={RiGitMergeLine}>
          Automação
          </NavLink>

        </NavSection>
      </Stack>

    </Box>
  )
}

export default Sidebar
