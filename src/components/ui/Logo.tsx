
import Link from 'next/link'
import Image from 'next/image'
import logoImg from "@/assets/logo-pokedex.png" 

function Logo() {
  return (
    <Link href="/" className="inline-block transition-opacity hover:opacity-80">
      <div className="relative h-15 md:h-18 w-auto aspect-[3/1]">
        <Image 
          src={logoImg} 
          alt="MyPokedex Logo" 
          priority 
          fill
          className="object-contain object-left"
          sizes="(max-width: 768px) 150px, 200px"
        />
      </div>
    </Link>
  )
}

export default Logo