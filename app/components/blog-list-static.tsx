import { Database } from '@/database.types'
import Link from 'next/link'

type Blog = Database['public']['Tables']['blogs']['Row']

async function fetchBlogs() {
  // 2秒待つ処理
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apiKey: process.env.apikey as string,
    }),
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export default async function BlogListStatic() {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="mb-4 pb-3 text-xl font-medium underline underline-offset-4">
        Blogs
      </p>
      <ul>
        {blogs?.map((blog, index) => (
          <li key={index} className="my-1 text-base">
            <Link href={`/blogs/${blog.id}`} prefetch={false}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
