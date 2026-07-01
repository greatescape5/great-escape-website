import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.greatescapewebservices.com'),
  title: {
    default: 'Great Escape Web & Business Services — North Idaho',
    template: '%s | Great Escape',
  },
  description:
    'Websites, local SEO, and in-store advertising for North Idaho small businesses. Get found, stay booked, and save time. Based in Athol, ID.',
  openGraph: {
    title: 'Great Escape Web & Business Services',
    description: 'Rugged digital solutions that get your small business found and save time.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
