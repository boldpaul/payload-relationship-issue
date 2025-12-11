import Link from "next/link";


export default function NotFound() {

    return (
        <>
            <main>
                <section className="container h-[calc(100vh-var(--header-height))] grid grid-cols-12 gap-4 items-center justify-items-center">
                    <div className="col-span-12 sm:col-span-6">
                        <h1 className="text-6xl font-light">404</h1>
                        <h2 className="text-4xl font-light">Something went wrong</h2>
                        <p className="font-light mb-4">Remember those old 404 pages from the 90s that said something like &quot;Something went wrong, but don&apos;t worry, our webmasters have been notified.&quot; But were the webmasters actually notified? Probably not.</p>
                        <Link href="/" >Back to home</Link>
                    </div>
                </section>
            </main>
        </>
    )
}