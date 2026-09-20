import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If already authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-white">
        <div className="text-xl font-semibold tracking-tight text-gray-900">Habit Tracker</div>
        <Link 
          href="/login" 
          className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Sign In
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6 max-w-3xl">
          Build better habits, <br/>one day at a time.
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl">
          A personal, cloud-first habit and progress tracker that prioritizes realistic consistency over quantity.
        </p>
        <Link 
          href="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </main>
    </div>
  )
}
