/** @format */

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
} from '@firebase/firestore';
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { db } from '../firebase';

function Post({ id, username, userImg, img, caption }) {
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [hasLiked, setHasLiked] = useState(false);

	const { data: session } = useSession();

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, 'posts', id, 'comments'),
					orderBy('timestamp', 'desc'),
				),
				(snapshot) => setComments(snapshot.docs),
			),
		[db],
	);

	useEffect(
		() =>
			onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
				setLikes(snapshot.docs),
			),
		[],
	);

	useEffect(() => {
		setHasLiked(
			likes.findIndex((like) => like.id === session?.user?.uid) !== -1,
		);
	}, [likes]);

	const sendComment = async (e) => {
		e.preventDefault();

		const commentToSend = comment;
		setComment('');

		await addDoc(collection(db, 'posts', id, 'comments'), {
			comment: commentToSend,
			username: session.user.username,
			userImage: session.user.image,
			timestamp: serverTimestamp(),
		});
	};

	const likePost = async () => {
		if (hasLiked) {
			await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
		} else {
			await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
				username: session.user.username,
			});
		}
	};

	return (
		<div className='bg-white border rounded-sm my-7'>
			{/* Header */}
			<div className='flex items-center p-5'>
				<img
					src={userImg}
					className='object-contain w-12 h-12 p-1 mr-3 border rounded-full'
					alt=''
				/>
				<p className='flex-1 font-bold'>{username}</p>
				<DotsHorizontalIcon className='h-5' />
			</div>

			<img src={img} className='object-cover w-full' alt='' />

			{session && (
				/* buttons */
				<div className='flex justify-between px-4 pt-4'>
					<div className='flex space-x-4'>
						{hasLiked ? (
							<HeartIconFilled
								className='text-red-500 btn'
								onClick={likePost}
							/>
						) : (
							<HeartIcon className='btn' onClick={likePost} />
						)}
						<ChatIcon className='btn' />
						<PaperAirplaneIcon className='btn' />
					</div>

					<BookmarkIcon className='btn' />
				</div>
			)}

			{/* caption */}
			<p className='p-5 truncate'>
				{likes.length > 0 && (
					<p className='mb-1 font-bold'>{likes.length} likes</p>
				)}
				<span className='mr-1 font-bold'>{username}</span>
				{caption}
			</p>

			{session &&
				/* comments */
				comments.length > 0 && (
					<div className='h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
						{comments.map((comment) => (
							<div
								key={comment.id}
								className='flex items-center mb-3 space-x-2'>
								<img
									className='rounded-full h-7'
									src={comment.data().userImage}
									alt=''
								/>
								<p className='flex-1 text-sm'>
									<span className='font-bold'>
										{comment.data().username}{' '}
									</span>
									{comment.data().comment}
								</p>
								<Moment fromNow className='pr-5 text-xs '>
									{comment.data().timestamp?.toDate()}
								</Moment>
							</div>
						))}
					</div>
				)}

			{session && (
				/* input box */
				<form className='flex items-center p-4'>
					<EmojiHappyIcon className='h-7' />
					<input
						type='text'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className='flex-1 border-none outline-none focus:ring-0'
						placeholder='Add a comment...'
					/>
					<button
						type='submit'
						disabled={!comment.trim()}
						onClick={sendComment}
						className='font-semibold text-blue-400'>
						Post
					</button>
				</form>
			)}
		</div>
	);
}

export default Post;
