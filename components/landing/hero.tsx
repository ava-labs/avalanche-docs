"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import Link from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Sponsors } from '@/components/landing/globe';

const tabs: { name: "configure" | "deploy"; code: string }[] = [
	{
		name: "configure",
		code: `avalanche blockchain deploy myblockchain
 
? Choose a network for the operation:
▸ Local Network
  Devnet
  Fuji Testnet
  Mainnet

Deploying [myblockchain] to Local Network...

Blockchain ready to use`,
	},
	{
		name: "deploy",
		code: `avalanche blockchain deploy myblockchain
 
? Choose a network for the operation:
▸ Local Network
  Devnet
  Fuji Testnet
  Mainnet

Deploying [myblockchain] to Local Network...

Blockchain ready to use`,
	},
];

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
			<circle cx="5" cy="5" r="4.5" />
			<circle cx="21" cy="5" r="4.5" />
			<circle cx="37" cy="5" r="4.5" />
		</svg>
	);
}

export default function Hero() {
	return (
		<section className="max-h-[40rem] w-full flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden px-8 md:min-h-[40rem]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(155, 122, 122, 0.3)" strokeWidth="0.5"/>
                    </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
			<div className="overflow-hidden max-w-fd-container bg-transparent md:px-10 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
				<div className="lg:max-w-8xl mx-auto grid max-w-full grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-2 lg:grid-cols-2 lg:px-8 lg:py-4 xl:gap-x-16 xl:px-12">
					<div className="relative z-10 md:text-center lg:text-left">
						<div className="relative">
							<div className="flex flex-col items-start gap-2">
								<div className="flex items-center gap-1 mt-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide-infinity"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/></svg>
									<span className="text-sm text-opacity-75">Scale Without Limits</span>
								</div>
							</div>

							<p className="text-zinc-800 dark:text-zinc-300 mt-3 tracking-tight text-2xl md:text-3xl">
								Build your Fast & Interoperable Layer 1 Blockchain with Avalanche.
							</p>
							<div className="relative mt-2 md:flex items-center gap-2 w-10/12 hidden border border-white/5">
								<GradientBG className="w-full flex items-center justify-between">
									<div className="w-full flex items-center gap-2">
										<p className="md:text-sm text-xs font-mono select-none">
											<span>
												<span className="text-[#4498c8]">avalanche </span>
												<span className="text-[#F07178]">blockchain </span>
											</span>
										</p>
										<p className=" relative inline tracking-tight opacity-90 md:text-sm text-xs dark:text-white font-mono text-black">
											create{" "}
											<span className="relative dark:text-fuchsia-100 text-fuchsia-950">
												myblockchain
												<span className="absolute h-2 bg-gradient-to-tr from-white via-stone-200 to-stone-300 blur-3xl w-full top-0 left-2"></span>
											</span>
										</p>
									</div>
									<div className="flex gap-2 items-center">
										<Link
											href="https://github.com/ava-labs"
											target="_blank"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="1em"
												height="1em"
												viewBox="0 0 256 256"
											>
												<g fill="none">
													<rect
														width="256"
														height="256"
														fill="#242938"
														rx="60"
													></rect>
													<path
														fill="#fff"
														d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"
													></path>
												</g>
											</svg>
										</Link>
									</div>
								</GradientBG>
							</div>
							{
								<>
									<div className="mt-8 flex w-fit flex-col gap-4 font-sans md:flex-row md:justify-center lg:justify-start items-center">
										<Link
											href="/docs/avalanche-l1s"
											className="hover:shadow-sm dark:border-stone-100 dark:hover:shadow-sm border-2 border-black bg-white px-4 py-1.5 text-sm uppercase text-black shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] transition duration-200 md:px-8 dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
										>
											Get Started
										</Link>
                                        <Link href="/academy" className="bg-stone-950 no-underline group cursor-pointer relative  p-px text-xs font-semibold leading-6  text-white md:inline-block hidden" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:Rkcivadb:" data-state="closed">
											<span className="absolute inset-0 overflow-hidden rounded-sm">
												<span className="absolute inset-0 rounded-sm bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
											</span>
											<div className="relative flex space-x-2 items-center z-10 rounded-none bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
												<span>Learn With Academy</span>
											</div>
											<span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-stone-800/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
										</Link>
									</div>
								</>
							}
						</div>
					</div>

					<div className="relative hidden md:block lg:static xl:pl-10">
						<div className="relative">
							<div className="absolute inset-0 rounded-none bg-gradient-to-tr opacity-5 blur-lg" />
							<div className="absolute inset-0 rounded-none bg-gradient-to-tr opacity-5" />
							<Sponsors />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function GradientBG({
	children,
	className,
	...props
}: React.PropsWithChildren<
	{
		className?: string;
	} & React.HTMLAttributes<HTMLElement>
>) {
	return (
		<div
			className={cn(
				"relative flex content-center items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px w-full",
			)}
			{...props}
		>
			<div className={cn("w-auto z-10 px-4 py-2 rounded-none", className)}>
				{children}
			</div>
			<div className="bg-zinc-100 dark:bg-zinc-950 absolute z-1 flex-none inset-[2px] " />
		</div>
	);
}