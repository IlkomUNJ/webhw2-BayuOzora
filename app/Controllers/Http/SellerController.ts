import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Wishlist from 'App/Models/Wishlist'
import Drive from '@ioc:Adonis/Core/Drive'

export default class SellerController {
  // Show all seller's products
  public async products({ auth, view }: HttpContextContract) {
    const user = auth.user!
    const products = await Product.query()
      .where('seller_id', user.id)
      .orderBy('created_at', 'desc')
    
    return view.render('seller/products', { products })
  }

  // Show form to add new product
  public async create({ view }: HttpContextContract) {
    return view.render('seller/create')
  }

  // Store new product
  public async store({ auth, request, response, session }: HttpContextContract) {
    const user = auth.user!
    const data = request.only(['title', 'description', 'price', 'image'])

    try {
      // Handle file upload if image is a file
      const image = request.file('image')
      let imagePath = data.image

      if (image) {
        await image.move('public/uploads', {
          name: `${new Date().getTime()}.${image.extname}`,
        })
        imagePath = `/uploads/${image.fileName}`
      }

      await Product.create({
        sellerId: user.id,
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        image: imagePath,
      })

      session.flash('success', 'Product added successfully!')
      return response.redirect('/seller/products')
    } catch (error) {
      session.flash('error', 'Failed to add product')
      return response.redirect().back()
    }
  }

  // Show edit form
  public async edit({ auth, params, view, response }: HttpContextContract) {
    const user = auth.user!
    const product = await Product.query()
      .where('id', params.id)
      .where('seller_id', user.id)
      .firstOrFail()

    return view.render('seller/edit', { product })
  }

  // Update product
  public async update({ auth, params, request, response, session }: HttpContextContract) {
    const user = auth.user!
    const data = request.only(['title', 'description', 'price', 'image'])

    try {
      const product = await Product.query()
        .where('id', params.id)
        .where('seller_id', user.id)
        .firstOrFail()

      // Handle file upload if image is a file
      const image = request.file('image')
      let imagePath = data.image

      if (image) {
        await image.move('public/uploads', {
          name: `${new Date().getTime()}.${image.extname}`,
        })
        imagePath = `/uploads/${image.fileName}`
      }

      product.title = data.title
      product.description = data.description
      product.price = parseFloat(data.price)
      if (imagePath) {
        product.image = imagePath
      }

      await product.save()

      session.flash('success', 'Product updated successfully!')
      return response.redirect('/seller/products')
    } catch (error) {
      session.flash('error', 'Failed to update product')
      return response.redirect().back()
    }
  }

  // Delete product
  public async destroy({ auth, params, response, session }: HttpContextContract) {
    const user = auth.user!
    
    try {
      const product = await Product.query()
        .where('id', params.id)
        .where('seller_id', user.id)
        .firstOrFail()

      await product.delete()
      session.flash('success', 'Product deleted successfully!')
      return response.redirect('/seller/products')
    } catch (error) {
      session.flash('error', 'Failed to delete product')
      return response.redirect().back()
    }
  }

  // View all wishlists for seller's products
  public async wishlists({ auth, view }: HttpContextContract) {
    const user = auth.user!
    
    const wishlists = await Wishlist.query()
      .whereHas('product', (query) => {
        query.where('seller_id', user.id)
      })
      .preload('user')
      .preload('product')
      .orderBy('created_at', 'desc')
    
    return view.render('seller/wishlists', { wishlists })
  }
}
