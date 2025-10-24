import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductController {
  // Show all products (shop page)
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search', '')
    
    let query = Product.query().preload('seller')
    
    if (search) {
      query = query.where('title', 'like', `%${search}%`)
        .orWhere('description', 'like', `%${search}%`)
    }
    
    const products = await query.paginate(page, 12)
    
    return view.render('products/index', { products, search })
  }

  // Search products
  public async search({ view, request }: HttpContextContract) {
    const keyword = request.input('keyword', '')
    const category = request.input('category', '')
    
    let query = Product.query().preload('seller')
    
    if (keyword) {
      query = query.where((builder) => {
        builder.where('title', 'like', `%${keyword}%`)
          .orWhere('description', 'like', `%${keyword}%`)
      })
    }
    
    if (category) {
      query = query.where('title', 'like', `%${category}%`)
    }
    
    const products = await query.orderBy('created_at', 'desc')
    
    return view.render('products/search', { products, keyword, category })
  }

  // Show single product
  public async show({ params, view }: HttpContextContract) {
    const product = await Product.query()
      .where('id', params.id)
      .preload('seller')
      .firstOrFail()
    
    return view.render('products/show', { product })
  }
}
