import Image from "next/image";

export default async function Home() {
  return (
    <div className="grid items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[20px] row-start-1 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/EAM_lite.png"
          alt="EAM Lite logo"
          width={180}
          height={38}
          priority
        />
        {/* <div className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]"> */}
        <div className="list-inside list-decimal text-md/8 text-center sm:text-left">
          EAM Lite is a lightweight version of an Enterprise Asset Management
          (EAM) system that functions on top of QuickBooks&copy;.
          <br />
          It is designed to be easy to use and deploy, making it ideal for small
          to medium-sized businesses.
          <br />
          EAM Lite provides essential features for managing assets, including
          tracking expenditures per asset and asset classes, maintenance
          schedules/costs and inventory levels of supplies.
          <br />
          Log in to configure your Settings. Read the documentation to learn how
          EAM Lite integrates with QuickBooks&copy;.
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* {session && <span>Active User: {session?.user?.name}</span>} */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/learn"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/examples"
          // rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.intuit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Intuit.com →
        </a>
      </footer>
    </div>
  );
}
