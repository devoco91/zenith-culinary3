'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const TransactionPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        promoCode: '',
        agreedToTerms: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    };

    // Submit the transaction
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(3);
        window.scrollTo(0, 0);
    };

    // Step 1: Student Information
    const renderStudentInformation = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                </div>
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

    // Step 2: Payment Information
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="•••"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>
                </div>
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
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                    >
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
                        I agree to the <a href="#" className="text-green-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
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

    // Step 3: Confirmation
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
                <div className="flex justify-between mb-2">
                    <span>Student Name:</span>
                    <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Email:</span>
                    <span>{formData.email}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Phone:</span>
                    <span>{formData.phone}</span>
                </div>
            </div>
            <p className="text-gray-600 mb-6">
                Your enrollment has been confirmed. We're looking forward to seeing you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/my-courses" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    View Dashboard
                </Link>
                <Link href="/" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );

    const renderProgressSteps = () => {
        const steps = [
            { number: 1, title: "Information" },
            { number: 2, title: "Payment" },
            { number: 3, title: "Confirmation" },
        ];

        return (
            <div className="w-full py-6">
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            {/* Step indicator */}
                            <div className="flex items-center relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${currentStep >= step.number
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}>
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

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="flex-auto border-t-2 border-gray-300 mx-6">
                                    <div className={`border-t-2 ${currentStep > step.number ? "border-green-600" : "border-transparent"
                                        }`}></div>
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

export default TransactionPage;