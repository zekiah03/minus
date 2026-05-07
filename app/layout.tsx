import type { Metadata } from 'next';
import { DM_Serif_Display, Space_Mono } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'minus',
  description: '嫌いが、正体だ。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${dmSerif.variable} ${spaceMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <div className="sig-line" />
        {children}
      </body>
    </html>
  );
}
