import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import hash from '@adonisjs/core/services/hash'
import { LoginTicket, OAuth2Client } from 'google-auth-library'

interface LoginData {
  email: string
  password: string
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function returnUserByTicket(ticket: LoginTicket) {
  const payload = ticket.getPayload()
  if (!payload) throw new Exception('Token do Google inválido!')

  const { sub: googleId, email, name } = payload
  if (!email) throw new Exception('E-mail não fornecido pelo Google!')

  let user = await User.findBy('email', email)
  if (!user) {
    user = await User.create({
      email,
      googleId,
      name: name || email,
      darkMode: false,
      passwordHash: '',
    })
  } else if (!user.googleId) {
    user.googleId = googleId
    await user.save()
  }

  return user
}

export default class AuthServices {
  async loginWithGoogle(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    let user = await returnUserByTicket(ticket)
    return user
  }

  async loginWithEmail({ email, password }: LoginData) {
    const user = await User.findByOrFail('email', email)

    const isCorrectPassword = await hash.verify(user.passwordHash!, password)
    if (!isCorrectPassword) throw new Exception('Credenciais inválidas!')

    return user
  }
}
