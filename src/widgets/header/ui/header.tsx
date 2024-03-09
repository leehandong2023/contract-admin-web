'use client'
import { ROUTES } from '@/constants/route'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PersonStandingIcon, WalletCardsIcon, WalletIcon } from 'lucide-react'
import useWallet from '@/shared/hooks/useWallet'
import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'

export function Header() {
  const { connectWallet, disconnect, Web3Wallet } = useWallet()
  const [IsWalletConnected, setIsWalletConnected] = useState(false)

  // 새로고침시 유지.
  useEffect(() => {
    const wallet_con = localStorage.getItem('wallet_con')
    if (wallet_con === 'true') {
      connectWallet()
      setIsWalletConnected(true)
    } else {
      setIsWalletConnected(false)
    }
  }, [IsWalletConnected])

  return (
    <header className=" w-full sticky top-0 flex justify-between border-b-4">
      {/* Left Header */}
      <div className="flex items-center">
        <Link href={ROUTES.HOME}>
          <Image
            src="/carrieverse_logo.png"
            width={100}
            height={100}
            alt="Logo"
            objectFit="contain"
            className="flex-shrink-0"
          />
        </Link>

        <div className="flex space-x-4 text-center">
          <Link
            href={ROUTES.CARRIEVERSE.CLINGSWAP}
            className="hover:text-gray-800"
          >
            ClingSwap
          </Link>
          <Link href={ROUTES.CARRIEVERSE.W3C} className="hover:text-gray-800">
            W3C
          </Link>
          <Link
            href={ROUTES.CARRIEVERSE.FANDOMSHOP}
            className="hover:text-gray-800"
          >
            Fandomshop
          </Link>
          <Link
            href={ROUTES.CARRIEVERSE.FAUCET}
            className="hover:text-gray-800"
          >
            Faucet
          </Link>
        </div>
      </div>

      {/* Right Header */}
      <div className="flex items-center justify-between">
        {/* Metmask 연결 버튼 */}
        <div className="flex gap-4">
          <Link href="#">
            <Avatar className="">
              <AvatarImage src="/default_person.png" />
              <AvatarFallback>No Image</AvatarFallback>
            </Avatar>
          </Link>
          {IsWalletConnected === true ? (
            <div className="text-xs flex flex-col justify-center">
              <div>EOA: {Web3Wallet.address}</div>
              <div>Chain: {Web3Wallet.chain}</div>
            </div>
          ) : (
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="/metamask.png" onClick={connectWallet} />
              <AvatarFallback>No Image</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
