import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import AuthServices from '#services/auth_services'
import { loginWithEmailValidator, loginWithGoogleValidator } from '#validators/auth'

export default class AuthenticatesController {
  private readonly authServices = new AuthServices()

  async authenticateWithGoogle({ request, response }: HttpContext) {
    const { idToken } = await request.validateUsing(loginWithGoogleValidator)
    const user = await this.authServices.loginWithGoogle(idToken)

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7d',
    })

    return response.ok({
      token: {
        type: 'bearer',
        value: token.value!.release(),
        expiresAt: token.expiresAt,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  }

  async authenticateWithEmailAndPassword({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginWithEmailValidator)
    const user = await this.authServices.loginWithEmail({ email, password })

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7d',
    })

    return response.ok({
      token: {
        type: 'bearer',
        value: token.value!.release(),
        expiresAt: token.expiresAt,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('api').invalidateToken()
      return response.ok({ message: 'Logout realizado com sucesso' })
    } catch (error) {
      return response.internalServerError({
        message: 'Erro ao realizar logout',
        error: error.message,
      })
    }
  }
}
