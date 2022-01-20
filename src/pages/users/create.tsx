import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/SideBar'

type CreateUserFormData = {
  name: string,
  email: string;
  password: string;
  password_confirmation: string;
}


const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome orbigatorio') ,
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().min(6, 'No minímo 6 caracteres').required('Senha orbigatória'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas devem ser iguais')
})

const CreateUser = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async data => {
    await new Promise(resolver => setTimeout(resolver, 2000))
    console.log(data)
  }

  return ( 
    <Box>
      <Header />

      <Flex w='100%' my={6} maxWidth={1480} mx='auto' px={6}>
        <Sidebar />

        <Box 
          as='form' 
          flex={1} 
          borderRadius={8} 
          bg='gray.800' 
          p={[6, 8]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>

          <Divider  my={6} borderColor='gray.700' />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth={'240px'} spacing={[6, 8]} w='100%'>
              <Input 
                name='name' 
                label='Nome completo' 
                error={errors.name}
                {...register('name')}
              />
              <Input 
                name='email' 
                type='email' 
                label='E-mail' 
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
          
            <SimpleGrid minChildWidth={240} spacing={8} w='100%'>
              <Input 
                name='password' 
                type='password' 
                label='Senha' 
                error={errors.password}
                {...register('password')}
              />
              <Input 
                name='password_confirmation'
                type='password' 
                label='Confirmação da senha' 
                error={errors.password_confirmation }
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={8} justify='flex-end'>
            <HStack spacing={4}>
              <Link href='/users' passHref>
                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button
                type='submit'
                colorScheme='pink'
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
         
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser