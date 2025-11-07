'use client';

import { useState } from 'react';
import Image from 'next/image'; // ✅ import for optimized image

type Props = {
  onNext: () => void;
  onBack: () => void;
  answers: string[];
  quizSlug: string;
};

export default function QuizLeadForm({ onNext, onBack, answers, quizSlug }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    setLoading(true);

    const [firstName, ...rest] = fullName.trim().split(' ');
    const lastName = rest.join(' ');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName || '',
          lastName: lastName || '',
          email,
          phone,
          answers,
          quizSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Submission failed:', data.error);
        setError('Something went wrong. Please try again.');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onNext();
      }, 1200);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-white text-black text-center">
      {/* ✅ Check icon image */}
      <Image
        src="/images/icons/check.png"
        alt="Check icon"
        width={160}
        height={70}
        className="mb-6"
      />

      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Almost done!</h2>
      <p className="text-gray-600 mb-6">
        Where should we send your learning plan and intro lesson access?
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md text-left">
        <div>
          <label className="block mb-1 text-sm font-medium">Full name*</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone / WhatsApp*</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-1">Submitted successfully!</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full font-semibold py-3 px-4 rounded-full transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {loading ? 'Submitting...' : 'Next'}
        </button>

        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-purple-600 mt-3 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}