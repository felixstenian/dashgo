import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useMutation } from 'react-query' // é um hook

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/SideBar'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => { // não precisa de chave como o UseQuery, pois ele não armazena nenhum cache, passamos direto a função que queremos executar nessa muattion 
    await api.post('/users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })
  }, { // aqui vamos adicionar a função que vai cadastrar um novo usuário
    onSuccess: () => { // quando o cadastro for realizado com sucesso vamos invalidar o cahce que criamos anteriormente na listagem 
      queryClient.invalidateQueries('users')
      // utilizando os parametros para limpar o cache de listagem -> passando queryClient.invalidateQueries(['users', 1]): vai invalidar somente a primeira página da listagem de usuários
    } 
  }) 

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async values => {
    await createUser.mutateAsync(values) // mutateAsync execulta a função useMutation de form asincrona 
    router.push('/users')
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