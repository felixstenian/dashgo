import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().min(6, 'No minímo 6 caracteres').required('Senha orbigatória')
})

type SignInFormData = {
  email: string;
  password: string;
}

const SignIn = () => {
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors, isSubmitting } = formState // Pegar os erros do hookForm

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <Flex 
      w='100vw' 
      h='100vh' 
      align='center' 
      justify='center'
    >
      <Flex 
        as='form' 
        w='100%' 
        maxWidth={360} 
        bg='gray.800' 
        p={8} 
        borderRadius={8} 
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input 
            name='email' 
            label='E-mail' 
            type='email' 
            error={errors.email}
            {...register('email')} 
          />
          <Input 
            name='password' 
            label='Senha' 
            type='password' 
            error={errors.password}
            {...register('password')} 
          />
        </Stack>

        <Button 
          type='submit' 
          mt={6} 
          colorScheme='pink'
          size='lg'
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default SignIn