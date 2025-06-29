'use client';
import { useState } from 'react';
import { ChevronDown, ChefHat, Award, DollarSign, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

export default function WazobiaFAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      icon: <ChefHat className="w-6 h-6" />,
      question: "What is the benefit of learning any of these courses?",
      answer: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            You will be learning from <span className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">some of the best chefs around the world</span>, 
            therefore you will be gaining a very standard culinary training in order to compete professionally as a chef in hotels, restaurants and homes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Beyond that, this is a <span className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">very respected and rewarding career</span> 
            with excellent growth opportunities in Nigeria's expanding hospitality industry.
          </p>
        </div>
      )
    },
    {
      id: 2,
      icon: <DollarSign className="w-6 h-6" />,
      question: "How much does a chef earn in Nigeria?",
      answer: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            A professional chef in Nigeria earns a <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">minimum of ₦250,000</span> and 
            can earn <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">over ₦5,000,000</span> depending on experience and position.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can also start your own restaurant, a food blogging website, or create content on social media. 
            YouTube food content creators earn <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">over $3,000 USD monthly</span> just 
            by giving cooking tips and lessons.
          </p>
        </div>
      )
    },
    {
      id: 3,
      icon: <Award className="w-6 h-6" />,
      question: "Will I be certified after learning any of these courses?",
      answer: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">Yes! You will be given a certificate.</span> With it, 
            employers will take you more seriously and recognize your professional culinary training.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our certificates are recognized in the industry and will give you a competitive edge in the job market.
          </p>
        </div>
      )
    },
    {
      id: 4,
      icon: <CheckCircle className="w-6 h-6" />,
      question: "Is it government approved?",
      answer: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded">ZenithCulinary School Limited</span> is registered 
            by the Corporate Affairs Commission and approved to organize, own and establish cooking training centres in Nigeria.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold">Company Registration No: 7418611</p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      icon: <ExternalLink className="w-6 h-6" />,
      question: "How do I apply?",
      answer: (
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Ready to start your culinary journey? Simply click the link below to begin your application:
          </p>
          <a 
            href="https://www.wazobiaculinary.com/apply" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )
    },
    {
      id: 6,
      icon: <Calendar className="w-6 h-6" />,
      question: "What is the duration of the courses?",
      answer: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our courses are designed to fit different schedules and career goals:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 font-semibold mb-2">
              Duration: <span className="text-green-700">One month to one year</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-md p-3 border border-green-100">
                <h4 className="font-semibold text-green-700">Basic Course</h4>
                <p className="text-sm text-gray-600">Foundation culinary skills</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-green-100">
                <h4 className="font-semibold text-green-700">Intermediary Course</h4>
                <p className="text-sm text-gray-600">Advanced techniques</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-green-100">
                <h4 className="font-semibold text-green-700">Advanced Course</h4>
                <p className="text-sm text-gray-600">Professional mastery</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-green-100">
                <h4 className="font-semibold text-green-700">Diploma Course</h4>
                <p className="text-sm text-gray-600">Comprehensive certification</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex justify-center mb-4">
              <ChefHat className="w-16 h-16 md:w-20 md:h-20" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              Everything you need to know about ZenithCulinary School
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-2 bg-green-100 text-green-700 rounded-lg">
                    {faq.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Transform your passion for cooking into a rewarding career. Join the next generation of professional chefs!
            </p>
            <a 
              href="/transaction" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Apply Today</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}