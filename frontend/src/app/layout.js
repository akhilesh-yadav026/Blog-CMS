import "./globals.css";

export const metadata = {
  title: "Blog CMS",
  description: "Blog Content Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}