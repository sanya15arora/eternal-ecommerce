import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import commentorIcon from '../../../assets/avatar.png';
import PostAReview from './PostAReview';
import {useHasPurchasedQuery} from "../../../redux/features/order/orderApi.jsx";

const ReviewCard = ({ productReviews = [] , productId}) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading } = useHasPurchasedQuery(
        { userId: user?._id, productId },
        { skip: !user }
    );

    const handleOpenReviewModal = () => {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
        } else if (data?.hasPurchased) {
        setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
            alert("Please purchase this product first to share your review.");
        }
    }
    const handleCloseReviewModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="my-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

            {productReviews.length > 0 ? (
                productReviews.map((review, index) => (
                    <div
                        key={index}
                        className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <img
                                src={commentorIcon}
                                alt={review.userId.username || 'User'}
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    {review.userId.username || 'Anonymous'}
                                </h4>
                                <p className="text-gray-500 text-xs">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex items-center text-sm">
                                    <RatingStars rating={review?.rating} />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">{review.comment || 'No comment provided.'}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No reviews available for this product.</p>
            )}
            {!isLoading && <div className='mt-12'>
                <button className='px-6 py-3 bg-primary text-white rounded-md'
                    onClick={handleOpenReviewModal}>
                    Add A Review
                </button>
            </div>
            }
            {
                isModalOpen && (
                    <PostAReview isOpen={isModalOpen} handleClose={handleCloseReviewModal} />
                )
            }
        </div>
    );
};

export default ReviewCard;
