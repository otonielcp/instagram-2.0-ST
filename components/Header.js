/** @format */

import Image from 'next/image';

function Header() {
	return (
		<div>
			{/* Left */}
			<div className='flex justify-between max-w-6xl bg-white'>
				<div className='relative hidden w-24 lg:inline-grid h24'>
					<Image
						src='https:links.papareact.com/ocw'
						layout='fill'
						objectFit='contain'
					/>
				</div>

				<div>
					<Image
						src='https:links.papareact.com/ocw'
						layout='fill'
						objectFit='contain'
					/>
				</div>
			</div>

			{/* Middle */}

			{/* Right */}
		</div>
	);
}

export default Header;
