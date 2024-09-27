import ContributorCounter from '../components/contributor-count';
export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card py-12 text-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mt-4">
        <div>
          <p className="mb-3 text-sm font-semibold">Avalanche Docs</p>
          <p className="mb-3 text-xs">
            Crafted with ❤️ by Ava Labs DevRel team.
          </p>
        </div>
        <ContributorCounter repoOwner="ava-labs" repoName="avalanche-docs" displayCount={15} />
          <div className="grid grid-cols-2 gap-8 mt-12 text-sm font-medium text-gray-500 lg:grid-cols-3 lg:mt-0 xl:col-span-2">
            <div>
              <h3 className="text-lg text-neutral-800 dark:text-neutral-100">
                Avalanche
              </h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://www.avax.network/get-started"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Get Started
                  </a>
                </li>
                <li>
                  <a
                    href="https://subnets.avax.network/"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://stats.avax.network/dashboard/overview/"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Statistics
                  </a>
                </li>
                
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-neutral-800 dark:text-neutral-100">
                Community
              </h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://github.com/ava-labs"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@avaxdevelopers"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Medium Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/AvaxDevelopers"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-lg text-neutral-800 dark:text-neutral-100">
                More Links
              </h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://status.avax.network/"
                    target="_blank"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Network Status
                  </a>
                </li>
                <li>
                  <a
                    href="https://core.app/"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Core Wallet
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.avax.network/legal"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-500 after:transition-transform after:duration-200 after:ease-&lsqb;cubic-bezier(0.65_0.05_0.36_1)&rsqb; hover:after:origin-bottom-left hover:after:scale-x-100 p-0.5 rounded-md transition duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 dark:focus:ring-neutral-600 focus:ring-neutral-100"
                  >
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </footer>
  )
}