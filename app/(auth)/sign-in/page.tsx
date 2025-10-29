'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import FooterLink from '@/components/forms/FooterLink'
import {signInWithEmail} from "@/lib/actions/auth-actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const SignIn = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data)
            if(result.success) router.push('/')
        }
        catch (error) {
            console.error(error)
            toast.error('Sign in failed', {
                description: error instanceof Error ? error.message : 'Failed to sign into account',
            })
        }
    }

  return (
    <>
      <h1 className="form-title">Log Into Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* INPUTS */}
        <InputField
          name="email"
          label="Email Address"
          placeholder="contact@jimmyb.com"
          register={register}
          error={errors.email}
          validation={{ required: 'Email address is required', pattern: /^\w+@\w+\.\w+$/ }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Logging in' : 'Log In'}
        </Button>

        <FooterLink text="Need to create an account" linkText="Sign Up" href="/sign-up" />
      </form>
    </>
  )
}

export default SignIn
