import React, { useState, useEffect } from 'react';
import { useSubmitContactMutation } from '../../redux/features/contact/contactApi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitContact, { isLoading, isSuccess, isError, error }] = useSubmitContactMutation();

    const [localSuccess, setLocalSuccess] = useState(false);
    const [localError, setLocalError] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setLocalSuccess(true);
            setLocalError(false);
        }
        if (isError) {
            setLocalError(true);
            setLocalSuccess(false);
        }
    }, [isSuccess, isError]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Reset flags when form is changed
        if (localSuccess || localError) {
            setLocalSuccess(false);
            setLocalError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContact(formData).unwrap();
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('Failed to send contact message:', err);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-red-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-10">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Contact Us</h2>

                {localSuccess && (
                    <div className="mb-6 p-4 rounded-lg text-green-800 bg-green-100 border border-green-200 text-center font-medium">
                        ✅ Message sent successfully!
                    </div>
                )}
                {localError && (
                    <div className="mb-6 p-4 rounded-lg text-red-800 bg-red-100 border border-red-200 text-center font-medium">
                        ❌ {error?.data?.error || 'Failed to send message.'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject (optional)"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            placeholder="Your message..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
