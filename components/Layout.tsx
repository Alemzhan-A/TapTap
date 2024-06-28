import Head from 'next/head'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>TapTap</title>
        <meta name="description" content="Efficient shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[#EDF7FF]">
        {children}
      </div>
    </>
  )
}