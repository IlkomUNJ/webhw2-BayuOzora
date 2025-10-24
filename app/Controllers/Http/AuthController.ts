import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async showRegister({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'role'])
    
    // Validate role
    if (!['user', 'seller'].includes(data.role)) {
      data.role = 'user'
    }

    try {
      const user = await User.create(data)
      await auth.login(user)
      session.flash('success', 'Registration successful!')
      
      if (user.role === 'seller') {
        return response.redirect('/seller/products')
      }
      return response.redirect('/')
    } catch (error) {
      session.flash('error', 'Registration failed. Email may already be in use.')
      return response.redirect().back()
    }
  }

  public async showLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.attempt(email, password)
      session.flash('success', 'Login successful!')
      
      const user = auth.user!
      if (user.role === 'seller') {
        return response.redirect('/seller/products')
      }
      return response.redirect('/')
    } catch (error) {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    await auth.logout()
    session.flash('success', 'Logged out successfully!')
    return response.redirect('/')
  }
}
