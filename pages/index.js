/** @format */

import Head from 'next/head';
import Header from '../components/Header';
import Feed from '../components/Feed';

export default function Home() {
	return (
		<div className='h-screen overflow-y-scroll bg-gray-50 scrollbar-hide'>
			<Head>
				<title>Instagram 2.0 Otoniel Cortez</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* Header */}
			<Header />
			{/* Feed */}
			{/* Modal */}
		</div>
	);
}
