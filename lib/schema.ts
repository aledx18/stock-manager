import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.'
    })
    .trim()
})

export const SignInOtpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim()
})

export const SignInPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(1, { message: 'Password field must not be empty.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      successMessage?: string // Mensaje de éxito
      errorMessage?: string // Mensaje de error general
    }
  | undefined

export type SessionPayload = {
  userId: string | number
  expiresAt: Date
}
