import Link from "next/link";
import { Layout } from "fumadocs-ui/layout";
import { baseOptions } from "@/app/layout.config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function HomePage(): React.ReactElement {
  return (
    <Layout {...baseOptions}>
      <div className="relative z-10 container p-10 mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="column w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <img
              className="object-scale-down mx-auto"
              src="/images/intern-404.png"
              alt="404"
            />
          </div>
          <div className="column w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <div className="flex flex-wrap">
              <div className="md:max-w-xl text-center md:text-left">
                <span className="inline-block py-px px-2 mb-4 text- s leading font-medium rounded-full shadow-sm bg-red-600">
                  Error 404
                </span>
                <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
                  Seriously?
                </h2>
                <p className="mb-6 text-lg md:text-xl">
                  We told the intern to find this page for you, but he couldn't.
                  We've warned him about this countless times, and honestly,
                  we're not sure how much longer we can keep him around.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-auto py-1 lg:py-0 lg:mr-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Fire Him</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Gotcha. We let Emin know.
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        He should understand the circustances that led to this
                        decision.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Link href="/">
                        <AlertDialogAction>Docs Home</AlertDialogAction>
                      </Link>
                      <Link href="https://x.com/AvalancheIntern">
                        <AlertDialogCancel>
                          Scold Intern on Twitter
                        </AlertDialogCancel>
                      </Link>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="w-full lg:w-auto py-1 lg:py-0 lg:mr-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Let Him Stay</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Hm, interesting choice ...
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        That's awfully nice of you, but we need to think about
                        this a bit more.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Link href="/">
                        <AlertDialogAction>Docs Home</AlertDialogAction>
                      </Link>
                      <Link href="https://x.com/AvalancheIntern">
                        <AlertDialogCancel>Give Him Advice</AlertDialogCancel>
                      </Link>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
