import Header from "@/components/header/Header"
import StoreProvider from "@/store/StoreProvider"

import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import "./globals.scss"
import styles from "@/styles/statistic/ItemDescription.module.scss"
import Footer from "@/components/footer/Footer"

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DotaChecker",
  icons: {
    icon: ["/favicon/favicon.ico?v=4"],
    apple: ["/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={roboto.className}>
          <Header />
          <div className="wrapper">
            {children}
            <div
              id="tooltip_portal"
              className={styles.itemDescriptionBackground}
            ></div>
          </div>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  )
}
