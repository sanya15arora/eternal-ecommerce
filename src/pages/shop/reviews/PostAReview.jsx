import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostReviewMutation } from "../../../redux/features/review/reviewApi";
import { useGetProductByIdQuery } from "../../../redux/features/product/productApi";

const PostAReview = ({ isOpen, handleClose }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const { refetch } = useGetProductByIdQuery(id, { skip: !id, });
    const [postReview] = usePostReviewMutation();

    const handleRating = (value) => {
        setRating(value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            alert('Please provide a rating and a review text.');
            return;
        }
        const reviewData = {
            productId: id,
            userId: user._id,
            rating,
            comment,
        };

        try {
            const response = await postReview(reviewData).unwrap();
            alert('Review posted successfully !!');
            setRating(0);
            setComment('');
            refetch();
        }
        catch (error) {
            console.error('Error posting review:', error);
            alert(error.message || 'Failed to post review');
        }
        handleClose();

    }

    if (!isOpen) return null;
    return (
        <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isOpen ? 'block' : 'hidden'}`}>
            <div className='bg-white rounded-lg shadow-lg w-96 z-50  p-6'>
                <h2 className='text-lg font-medium mb-4'> Add a Review</h2>
                <div className='flex items-center  mb-4'>
                    {[1, 2, 3, 4, 5].map((star) => (<span
                        key={star}
                        onClick={() => handleRating(star)}
                        className='cursor-pointer text-yellow-500 text-xl'>
                        {
                            rating >= star ? (<i className='ri-star-fill'> </i>) : (<i className='ri-star-line'> </i>)
                        }
                    </span>
                    ))}
                </div>
                <textarea
                    className='w-full  p-2 border border-gray-300 rounded-md mb-4 focus:outline-none'
                    rows='4'
                    value={comment}
                    placeholder='Write your review here...'
                    onChange={(e) => setComment(e.target.value)} />
                <div className='flex items-center justify-end gap-2'>
                    <button
                        className='px-4 py-2 bg-gray-300 hover:bg-gray-500 rounded-md'
                        onClick={handleClose}>Cancel</button>
                    <button
                        className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark'
                        onClick={(e) => { handleSubmit(e); }}>Submit
                    </button>
                </div>

            </div>
        </div >
    )
}

export default PostAReview