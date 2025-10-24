import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wishlist from 'App/Models/Wishlist'
import Product from 'App/Models/Product'

export default class UserController {
  // Show user profile
  public async profile({ auth, view }: HttpContextContract) {
    const user = auth.user!
    return view.render('user/profile', { user })
  }

  // Show user wishlist
  public async wishlist({ auth, view }: HttpContextContract) {
    const user = auth.user!
    const wishlists = await Wishlist.query()
      .where('user_id', user.id)
      .preload('product', (query) => {
        query.preload('seller')
      })
      .orderBy('created_at', 'desc')
    
    return view.render('user/wishlist', { wishlists })
  }

  // Add product to wishlist
  public async addToWishlist({ auth, request, response, session }: HttpContextContract) {
    const user = auth.user!
    const productId = request.input('product_id')

    try {
      // Check if already in wishlist
      const existing = await Wishlist.query()
        .where('user_id', user.id)
        .where('product_id', productId)
        .first()

      if (existing) {
        session.flash('error', 'Product already in wishlist')
        return response.redirect().back()
      }

      await Wishlist.create({
        userId: user.id,
        productId: productId,
      })

      session.flash('success', 'Added to wishlist!')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to add to wishlist')
      return response.redirect().back()
    }
  }

  // Remove from wishlist
  public async removeFromWishlist({ auth, params, response, session }: HttpContextContract) {
    const user = auth.user!
    
    try {
      const wishlist = await Wishlist.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

      await wishlist.delete()
      session.flash('success', 'Removed from wishlist')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to remove from wishlist')
      return response.redirect().back()
    }
  }
}
