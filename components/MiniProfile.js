/** @format */

import { signOut, useSession } from 'next-auth/react';

function MiniProfile() {
	const { data: session } = useSession();
	return (
		<div className='flex items-center justify-between ml-10 mt-14'>
			<img
				className='w-16 h-16 rounded-full border p-[2px]'
				src={session.user.image}
				alt=''
			/>
			<div className='flex-1 mx-4'>
				<h2 className='font-bold'>{session.user.username}</h2>
				<h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
			</div>
			<button
				className='text-sm font-semibold text-blue-400'
				onClick={signOut}>
				Sign Out
			</button>
		</div>
	);
}

export default MiniProfile;
