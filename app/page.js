'use client';

import { useState } from 'react';

export default function Home() {
  // Use the test Payment Link we generated
  // Hardcoding the user_123 logic for demonstration
  const paymentLink = `https://buy.stripe.com/test_3cI14p3t068k04z8qA?client_reference_id=user_123`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Upgrade to Premium</h1>
        <p className="text-gray-600 mb-8">Unlock all features on BuynSellForU.</p>

        <div className="mb-8">
          <p className="font-semibold mb-4">Scan to Pay securely on Mobile:</p>
          <img 
            src={`${paymentLink}/qr`} 
            alt="Stripe QR Code" 
            width={250} 
            height={250} 
            className="mx-auto border p-2 rounded-lg"
          />
        </div>

        <div>
          <a 
            href={paymentLink} 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            Pay on This Device
          </a>
        </div>
      </div>
    </div>
  );
}
