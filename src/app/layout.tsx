import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";

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
          <StoreProvider>
            <InitUser />
            {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
