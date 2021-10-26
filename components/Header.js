/** @format */

import Image from 'next/image';
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
// import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import { modalState } from '../atoms/modalAtom';
// import { useRecoilState } from 'recoil';

function Header() {
	const { data: session, status } = useSession();
	const [open, setOpen] = useRecoilState(modalState);
	const router = useRouter();

	return (
		<header className='sticky top-0 z-50 bg-white border-b shadow-sm'>
			<div className='flex justify-between max-w-6xl p-2 mx-5 xl:mx-auto'>
				<div
					className='relative hidden w-24 cursor-pointer lg:inline-grid'
					onClick={() => router.push('/')}>
					<Image
						src='https://links.papareact.com/ocw'
						alt='Picture of the author'
						layout='fill'
						objectFit='contain'
					/>
				</div>

				<div
					className='relative flex-shrink-0 w-10 cursor-pointer lg:hidden'
					onClick={() => router.push('/')}>
					<Image
						src='https://links.papareact.com/jjm'
						alt='Picture of the author'
						layout='fill'
						objectFit='contain'
					/>
				</div>

				<div className='max-w-xs'>
					<div className='relative p-3 mt-1 rounded-md'>
						<div className='absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
							<SearchIcon
								className='w-5 h-5 text-gray-400'
								aria-hidden='true'
							/>
						</div>
						<input
							type='text'
							className='block w-full pl-10 border-gray-300 rounded-md bg-gray-50 focus:ring-black focus:border-black sm:text-sm'
							placeholder='Search'
						/>
					</div>
				</div>

				<div className='flex items-center justify-end space-x-4'>
					<HomeIcon className='navBtn' onClick={() => router.push('/')} />

					<MenuIcon className='h-6 cursor-pointer md:hidden' />

					{session ? (
						<>
							<div className='relative navBtn'>
								<PaperAirplaneIcon className='navBtn' />
								<div className='absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-1 animate-pulse'>
									3
								</div>
							</div>
							<PlusCircleIcon
								className='h-6 cursor-pointer'
								onClick={() => setOpen(true)}
							/>

							<UserGroupIcon className='navBtn' />
							<HeartIcon className='navBtn' />
							<img
								onClick={signOut}
								className='h-10 rounded-full cursor-pointer'
								src={session.user.image}
								alt=''
							/>
						</>
					) : (
						<button onClick={signIn}>Sign In</button>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
