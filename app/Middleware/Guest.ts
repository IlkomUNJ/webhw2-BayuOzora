import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Guest middleware is used to restrict authenticated users from accessing
 * routes like login, register, etc.
 */
export default class GuestMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated) {
      return response.redirect('/')
    }

    await next()
  }
}
