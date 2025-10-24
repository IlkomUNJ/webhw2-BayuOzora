import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'

export default class ContactController {
  // Show contact form
  public async show({ view }: HttpContextContract) {
    return view.render('contact/index')
  }

  // Handle contact form submission
  public async store({ request, response, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'message'])

    try {
      await Contact.create(data)
      session.flash('success', 'Message sent successfully! We will get back to you soon.')
      return response.redirect('/contact')
    } catch (error) {
      session.flash('error', 'Failed to send message. Please try again.')
      return response.redirect().back()
    }
  }
}
