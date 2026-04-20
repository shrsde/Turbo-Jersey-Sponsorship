export const metadata = {
  title: "Derek — Jersey Pricing Framework | Turbo Sports & Performance",
  description: "A working framework for the jersey sponsorship conversation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F5F1EA' }}>{children}</body>
    </html>
  );
}
