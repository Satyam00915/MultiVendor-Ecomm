import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
