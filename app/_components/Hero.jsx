import Link from 'next/link'
import React from 'react'
const Hero = () => {
  return (     <section className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
        AI Advice Giver
          <strong className="font-extrabold text-black sm:block"> Custom Learning Paths,Powered by AI </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
        Revolutionize your Paths by advices with our AI-powered app, delivering engaging and high-quality advices in seconds.
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-secondary sm:w-auto"
            href="/dashboard/home"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </section>
      
  )
}

export default Hero