"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='p-6 flex flex-col items-center justify-center'>
      <h1 className="text-2xl font-bold">Movie Search Home Page</h1>
      <p>Welcome to the Movie Search Application!</p>
      <p>Use the navigation to search for movies.</p>

      <div className='mt-6 text-center'>
        

        <Link href="/movies">
          <Button variant="primary" className='mt-4 p-34'>
            Go to Movie Search
          </Button>
        </Link>
      </div>
    </div>
  );
}
