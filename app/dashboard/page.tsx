import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <form action={signOut}>
            <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Sign Out
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back</h2>
          <p className="text-gray-600 mb-2">You are successfully authenticated.</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex text-sm">
              <span className="font-medium text-gray-700 w-24">User ID:</span>
              <span className="text-gray-500 font-mono">{user.id}</span>
            </div>
            <div className="flex text-sm">
              <span className="font-medium text-gray-700 w-24">Email:</span>
              <span className="text-gray-500">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
