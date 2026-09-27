import "./globals.css";

export const metadata = {
  title: "OmniExchange - Buy, Sell & Trade Electronics",
  description: "Universal marketplace for electronic appliances with secure Stripe payments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
