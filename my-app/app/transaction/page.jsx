'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

const TransactionPageInner = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [showPage, setShowPage] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        promoCode: '',
        agreedToTerms: false,
    });

    const courseId = searchParams.get('courseId');
    const courseTitle = searchParams.get('courseTitle');
    const courseStartDate = searchParams.get('courseStartDate') || '2025-07-10';
    const courseDuration = searchParams.get('courseDuration') || '3 Months';
    const coursePrice = parseInt(searchParams.get('coursePrice')) || 0;
    const courseDiscount = parseInt(searchParams.get('courseDiscount')) || 0;

    useEffect(() => {
        if (!courseId || !courseTitle) {
            router.replace('/courses');
        } else {
            setShowPage(true);
        }
    }, [courseId, courseTitle, router]);

    if (!showPage) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateStepData = () => {
        if (currentStep === 1) {
            const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state'];
            for (let field of requiredFields) {
                if (!formData[field]?.trim()) {
                    alert('Please fill all required fields before continuing.');
                    return false;
                }
            }
        }

        if (currentStep === 2) {
            const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
            for (let field of requiredFields) {
                if (!formData[field]?.trim()) {
                    alert('Please complete all payment fields before submitting.');
                    return false;
                }
            }

            if (!formData.agreedToTerms) {
                alert('You must agree to the Terms and Conditions.');
                return false;
            }
        }

        return true;
    };

    const handleNextStep = () => {
        if (validateStepData()) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStepData()) return;

        const transactionData = {
            ...formData,
            courseId,
            courseTitle,
            courseStartDate,
            courseDuration,
            coursePrice,
            courseDiscount,
            registeredAt: new Date().toISOString(),
        };

        try {
            const response = await fetch('https://culinary-backend.fly.dev/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData),
            });

            const result = await response.json();

            if (response.ok) {
                // SEND EMAIL AFTER SUCCESSFUL TRANSACTION
                await emailjs.send(
                    'service_90bids9',
                    'template_xjk0npe',
                    {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        courseTitle,
                        courseFee: coursePrice,
                    },
                    'jmMjHWm08bK1xNwwI'
                );

                setCurrentStep(3);
                window.scrollTo(0, 0);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('Failed to submit. Please try again.');
            console.error('Error:', error);
        }
    };


    const renderCourseInfo = () => (
        <div className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-60"></div>

            {/* Main container */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
                {/* Header section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-emerald-700 bg-clip-text text-transparent mb-3 leading-tight">
                        {courseTitle}
                    </h2>
                </div>

                {/* Course details grid */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Duration Card */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Duration</h3>
                                    <p className="text-xl font-bold text-gray-900">{courseDuration}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Investment</h3>
                                    <div className="w-16 h-0.5 bg-green-500 mx-auto"></div>
                                </div>

                                <div className="flex items-center justify-center space-x-4 mb-6">
                                    {courseDiscount > 0 && (
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-1">Original Price</p>
                                            <p className="text-2xl text-gray-400 line-through font-light">₦{coursePrice.toLocaleString()}</p>
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">
                                            {courseDiscount > 0 ? 'Special Price' : 'Course Fee'}
                                        </p>
                                        <p className="text-4xl font-bold text-green-600">
                                            ₦{(coursePrice - courseDiscount).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {courseDiscount > 0 && (
                                    <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-4 text-center">
                                        <div className="flex items-center justify-center space-x-2 mb-2">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-green-700 font-semibold">You Save</span>
                                        </div>
                                        <p className="text-2xl font-bold text-green-600">₦{courseDiscount.toLocaleString()}</p>
                                        <p className="text-sm text-green-600 mt-1">Limited time offer!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    const renderStudentInformation = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {[
                    ['First Name', 'firstName'],
                    ['Last Name', 'lastName'],
                    ['Email Address', 'email'],
                    ['Address', 'address', 2],
                    ['City', 'city'],
                    ['State', 'state'],
                ].map(([label, name, span], idx) => (
                    <div key={idx} className={span === 2 ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type={name === 'email' ? 'email' : 'text'}
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-8">
                <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    );

    const renderPaymentInformation = () => (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 focus-within:ring-green-500 focus-within:border-green-500">
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="•••• •••• •••• ••••"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="flex-1 outline-none"
                        required
                    />
                    <div className="flex space-x-2">
                        <div className="h-6 w-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                        <div className="h-6 w-8 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                        <div className="h-6 w-8 bg-green-600 rounded text-white text-xs flex items-center justify-center">AE</div>
                    </div>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {[
                    ['Cardholder Name', 'cardName'],
                    ['Expiry Date', 'expiryDate', 'MM/YY'],
                    ['CVV', 'cvv', '•••'],
                ].map(([label, name, placeholder], idx) => (
                    <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type="text"
                            name={name}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code (Optional)</label>
                <div className="flex">
                    <input
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
                    />
                    <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300">
                        Apply
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="#" className="text-green-600 hover:underline">Terms and Conditions</a> and{' '}
                        <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                    </span>
                </label>
            </div>
            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Complete Payment
                </button>
            </div>
        </form>
    );

    const renderConfirmation = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">
                Thank you for your enrollment. We've sent a confirmation email to {formData.email} with all the details.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2"><span>Student Name:</span><span>{formData.firstName} {formData.lastName}</span></div>
                <div className="flex justify-between mb-2"><span>Email:</span><span>{formData.email}</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Return to Homepage</Link>
            </div>
        </div>
    );

    const renderProgressSteps = () => {
        const steps = [
            { number: 1, title: 'Information' },
            { number: 2, title: 'Payment' },
            { number: 3, title: 'Confirmation' },
        ];

        return (
            <div className="w-full py-6">
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex items-center relative">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${currentStep >= step.number
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {currentStep > step.number ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        step.number
                                    )}
                                </div>
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center text-xs font-medium whitespace-nowrap">
                                    {step.title}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="flex-auto border-t-2 border-gray-300 mx-6">
                                    <div
                                        className={`border-t-2 ${currentStep > step.number ? 'border-green-600' : 'border-transparent'
                                            }`}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 pt-16">
                    <h1 className="text-3xl font-bold text-gray-800">Enrolment & Payment</h1>
                    <p className="text-gray-600 mt-2">Complete your enrolment to begin your journey</p>
                </div>

                {renderCourseInfo()}

                {renderProgressSteps()}
                <div className="mt-16">
                    {currentStep === 1 && renderStudentInformation()}
                    {currentStep === 2 && renderPaymentInformation()}
                    {currentStep === 3 && renderConfirmation()}
                </div>
            </div>
        </div>
    );
};

const TransactionPage = () => (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
        <TransactionPageInner />
    </Suspense>
);

export default TransactionPage;