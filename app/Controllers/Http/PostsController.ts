export default class PostsController {
  // Display all posts
  public async index({ view }) {
    const posts = [
      {
        id: 1,
        title: 'Welcome to My Blog',
        author: 'John Doe',
        content: 'This is my first blog post! I am excited to share my thoughts and experiences with you. Stay tuned for more updates.',
        date: 'October 7, 2025'
      },
      {
        id: 2,
        title: 'Getting Started with AdonisJS',
        author: 'Jane Smith',
        content: 'AdonisJS is an amazing Node.js framework. In this post, I will share my experience learning AdonisJS and building web applications.',
        date: 'October 6, 2025'
      },
      {
        id: 3,
        title: 'Why TypeScript is Great',
        author: 'Bob Wilson',
        content: 'TypeScript has changed the way I write JavaScript. The type safety and better tooling make development so much easier and more enjoyable.',
        date: 'October 5, 2025'
      }
    ]
    return view.render('posts/index', { posts })
  }

  // Show single post
  public async show({ params, view }) {
    const posts = [
      {
        id: 1,
        title: 'Welcome to My Blog',
        author: 'John Doe',
        content: 'This is my first blog post! I am excited to share my thoughts and experiences with you.\n\nStay tuned for more updates as I explore web development, programming, and technology.\n\nI hope you enjoy reading my posts!',
        date: 'October 7, 2025'
      },
      {
        id: 2,
        title: 'Getting Started with AdonisJS',
        author: 'Jane Smith',
        content: 'AdonisJS is an amazing Node.js framework. In this post, I will share my experience learning AdonisJS and building web applications.\n\nThe framework is well-structured and follows MVC pattern which makes it easy to maintain large applications.\n\nI highly recommend giving it a try!',
        date: 'October 6, 2025'
      },
      {
        id: 3,
        title: 'Why TypeScript is Great',
        author: 'Bob Wilson',
        content: 'TypeScript has changed the way I write JavaScript. The type safety and better tooling make development so much easier and more enjoyable.\n\nWith features like interfaces, type inference, and great IDE support, TypeScript helps catch errors early.\n\nOnce you try TypeScript, you will never want to go back to plain JavaScript!',
        date: 'October 5, 2025'
      }
    ]
    
    const post = posts.find(p => p.id === parseInt(params.id))
    return view.render('posts/show', { post })
  }

  // About page
  public async about({ view }) {
    return view.render('posts/about')
  }
}
