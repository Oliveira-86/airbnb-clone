'use client'

import React, { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/app/hook/useLoginModal'
import { useRouter } from 'next/navigation'
import RegisterModal from './RegisterModal'
import useRegisterModal from '@/app/hook/useRegisterModal'

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FieldValues>({ 
    defaultValues: 
      { 
        email: '', 
        password: ''
      } 
    })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      const response = await signIn('credentials', { ...data, redirect: false })
      setIsLoading(false)

      if (response?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (response?.error) {
        toast.error(response.error)
      }

    } catch (err) {
      toast.error('Something went wrong')
    }

    setIsLoading(false)

  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login your account' center />
      <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>First time using airbnb?
          <span 
            onClick={toggle} 
            className="text-neutral-900 font-semibold cursor-pointer  hover:underline ml-2"
          > 
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal