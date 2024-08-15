// Header Component
'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
	const router = useRouter()

	const goToProfile = () => {
		router.push('/profile')
	}

	const Menu = () => {
		const { items } = useCartService()
		const [mounted, setMounted] = useState(false)
		useEffect(() => {
			setMounted(true)
		}, [])
	}

	// Remove session-related code
	// const { data: session, status } = useSession()

	const signOutHandler = () => {
		// Implement your sign out logic here, if needed
		console.log('Sign out clicked')
	}

	return (
		<header>
			<div id="brand">theory</div>
			<nav>
				<ul>
					<li>
						{/* Remove session check and sign-in/sign-out logic */}
						{/* <div>
							{session && session.user ? (
								<>
									<label tabIndex={0}>
										{session.user.name}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</label>
									<ul tabIndex={0} className="dropdown">
										<li>
											<button type="button" onClick={signOutHandler}>
												Sign Out
											</button>
										</li>
									</ul>
								</>
							) : (
								<button
									className="profile-btn"
									type="button"
									onClick={() => signIn()}
								>
									Sign In
								</button>
							)}
						</div> */}
						<button
							className="profile-btn"
							type="button"
							onClick={goToProfile}
						>
							Profile
						</button>
					</li>
					<li>
						<a href="/#products">Products</a>
					</li>
					<li>
						<a href="/#about">About</a>
					</li>
					<li>
						<Link href="/cart">
							Cart
							{/* Uncomment and use if you have cart items */}
							{/* mounted && items.length !== 0 && (
								<div>
									{items.reduce((a, b) => a + b.qty, 0)}
								</div>
							) */}
						</Link>
					</li>
				</ul>
			</nav>
			<div id="hamburger-icon">
				<div className="bar1" />
				<div className="bar2" />
				<div className="bar3" />
				<ul className="mobile-menu">
					<li>
						<a href="/signin">Profile</a>
					</li>
					<li>
						<a href="#products">Products</a>
					</li>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="/cart">Cart</a>
					</li>
				</ul>
			</div>
		</header>
	)
}
