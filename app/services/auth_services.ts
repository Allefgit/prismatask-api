import NotFoundException from '#exceptions/not_found_exception'
import UnAuthorizedException from '#exceptions/un_authorized_exception'
import ValidationException from '#exceptions/validation_exception'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { LoginTicket, OAuth2Client } from 'google-auth-library'

interface LoginData {
  email: string
  password: string
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function returnUserByTicket(ticket: LoginTicket) {
  const payload = ticket.getPayload()
  if (!payload) throw new UnAuthorizedException('Token do Google inválido!')

  const { sub: googleId, email, name } = payload
  if (!email) throw new NotFoundException('E-mail não fornecido pelo Google!')

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
    const user = await User.findBy('email', email)
    if (!user) {
      throw new NotFoundException('Usuário não encontrada')
    }

    const isCorrectPassword = await hash.verify(user.passwordHash!, password)
    const isCorrectEmail = email === user.email

    if (!(isCorrectPassword || isCorrectEmail)) {
      throw new ValidationException('Credenciais inválidas!')
    }

    return user
  }
}
