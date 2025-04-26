import Image from "next/image";
// import { AuthProviderOptions } from "@/app/api/auth/[...nextauth]/route";

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
        <div className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
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
          EAL integrates with QuickBooks&copy;.
        </div>

        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/configure"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Configure
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/learn"
          >
            Read our docs
          </a>
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
