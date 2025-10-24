import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    // Create sample users
    const buyer = await User.create({
      name: 'John Buyer',
      email: 'buyer@example.com',
      password: 'password123',
      role: 'user',
    })

    const seller1 = await User.create({
      name: 'Ray-Ban Official',
      email: 'seller@rayban.com',
      password: 'password123',
      role: 'seller',
    })

    const seller2 = await User.create({
      name: 'Oakley Store',
      email: 'seller@oakley.com',
      password: 'password123',
      role: 'seller',
    })

    // Create sample products
    await Product.createMany([
      {
        sellerId: seller1.id,
        title: 'Ray-Ban Aviator Classic',
        description: 'The Ray-Ban Aviator Classic is the original pilot sunglasses design that started it all. Developed in 1937 for US military aviators, these iconic sunglasses combine timeless style with exceptional performance.',
        price: 154.00,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
      },
      {
        sellerId: seller1.id,
        title: 'Ray-Ban Wayfarer',
        description: 'The most recognizable style in the history of sunglasses. The Ray-Ban Wayfarer is an iconic design that has been worn by celebrities and style icons for decades.',
        price: 168.00,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
      },
      {
        sellerId: seller2.id,
        title: 'Oakley Frogskins',
        description: 'Oakley Frogskins sunglasses are a timeless classic that has been updated with modern lens technology. Perfect for everyday wear with a retro-inspired design.',
        price: 128.00,
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
      },
      {
        sellerId: seller2.id,
        title: 'Oakley Holbrook',
        description: 'A timeless classic that fuses the essence of the American spirit with the latest in performance technology. The Holbrook is a flattering frame for most face shapes.',
        price: 142.00,
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80',
      },
      {
        sellerId: seller1.id,
        title: 'Ray-Ban Clubmaster',
        description: 'The Ray-Ban Clubmaster combines vintage browline style with modern materials. A sophisticated choice that works with any wardrobe.',
        price: 165.00,
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
      },
      {
        sellerId: seller2.id,
        title: 'Oakley Radar EV',
        description: 'Designed for speed and performance, the Radar EV Path sunglasses feature an extended field of view. Perfect for athletes and active lifestyles.',
        price: 195.00,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
      },
    ])

    console.log('✅ Database seeded successfully!')
    console.log('👤 Buyer account: buyer@example.com / password123')
    console.log('🏪 Seller accounts:')
    console.log('   - seller@rayban.com / password123')
    console.log('   - seller@oakley.com / password123')
  }
}
