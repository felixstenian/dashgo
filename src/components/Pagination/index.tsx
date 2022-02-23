import { Box,  HStack, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegister: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const simblingsCount = 1 // Páginas irmãs

// generatePageArray(2, 5)
  // (5 - 2) = [0, 0, 0]
  // [2 + 0 + 1, 2 + 1 + 1, 2 + 2 + 1] =  [3, 4, 5]
 
const generatePageArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0) // Para as páginas quem forem menores que 1 não apareçam 
}

const Pagination = ({ 
  totalCountOfRegister,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
 }: PaginationProps) => {

  // Formato do component de páginação:
    //  Existem 20 páginas e o usuário está na página 5
    //  1 ... 4 5 6 ... 20


  const lastPage = Math.floor(totalCountOfRegister / registersPerPage)

  const previousPages = currentPage > 1 // Se a página atual não for a primeira, vamos ter proximas páginas
    ? generatePageArray(currentPage - 1 - simblingsCount, currentPage - 1)
    : []

  const nextsPages = currentPage < lastPage
    ? generatePageArray(currentPage, Math.min(currentPage + simblingsCount, lastPage))
    : []


  return (
    <Stack
      direction={['column', 'row']}
      spacing={6}
      mt={8}
      justify='space-between'
      align='center'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing={2}>

        { currentPage > (1 + simblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            { currentPage > (2 + simblingsCount) && (
              <Text color='gray.300' width={8} textAlign='center' >...</Text>
            ) }
          </>
        )}
        
        { previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        
        { nextsPages.length > 0 && nextsPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        { (currentPage + simblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + simblingsCount) < lastPage && (
              <Text color='gray.300' >...</Text>
            ) }
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
        
      </HStack>
    </Stack>
  )
}

export default Pagination