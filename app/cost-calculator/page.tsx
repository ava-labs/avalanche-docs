"use client"

import { Globe, Info, TestTubes } from 'lucide-react'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const [avaxPrice, setAvaxPrice] = useState<number | null>(null)

  const fetchAvaxPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setAvaxPrice(data['avalanche-2'].usd)
    } catch (error) {
      console.error('Failed to fetch AVAX price:', error)
      setAvaxPrice(null)
    }
  }

  useEffect(() => {
    fetchAvaxPrice()
    const interval = setInterval(fetchAvaxPrice, 60000)
    return () => clearInterval(interval)
  }, [])
  const [environment, setEnvironment] = useState("testnet")
  const [validators, setValidators] = useState(1)
  const [storage, setStorage] = useState(10)
  const [throughput, setThroughput] = useState('low')
  const [includeGlacier, setIncludeGlacier] = useState(false)
  const [includeExplorer, setIncludeExplorer] = useState(false)
  const [costs, setCosts] = useState({
    validatorCost: 100,
    storageCost: 0,
    serviceCost: 0,
    platformFee: 0,
    totalCost: 0
  })

  useEffect(() => {
    const calculateCosts = () => {
      const validatorBaseCost = 100 // $100 per validator
      const storageBaseCost = 0.5 // $0.50 per GB
      const glacierCost = 50 // $50 for Glacier
      const explorerCost = 75 // $75 for Explorer
      const mainnetFee = 50 // $50 platform fee for mainnet

      const validatorCost = validators * validatorBaseCost
      const storageCost = storage * storageBaseCost
      const serviceCost = (includeGlacier ? glacierCost : 0) + (includeExplorer ? explorerCost : 0)
      const platformFee = environment === "mainnet" ? mainnetFee : 0
      const totalCost = validatorCost + storageCost + serviceCost + platformFee

      setCosts({
        validatorCost,
        storageCost,
        serviceCost,
        platformFee,
        totalCost
      })
    }

    calculateCosts()
  }, [validators, storage, includeGlacier, includeExplorer, environment])

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-[#F9FAFB]">
      <h1 className="text-4xl font-bold mb-3 text-[#1A1523]">Avalanche L1 Cost Calculator</h1>
      <p className="text-lg text-[#6B7280] mb-8 flex items-center gap-2">
        AVAX Price: 
        <Badge variant="secondary" className="text-sm">
          {avaxPrice ? (
            <>
              <span className="font-medium">${avaxPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-[#E84142]">Unable to fetch price</span>
          )}
        </Badge>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </p> 
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-8">
          <Card className="border-[#E5E7EB] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Choose your environment</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setEnvironment("testnet")}
                  className={`p-5 rounded-lg border text-left transition-all ${
                    environment === "testnet"
                      ? "border-[#E84142] ring-2 ring-[#E84142] bg-[#FEF2F2]"
                      : "border-[#E5E7EB] hover:border-[#E84142] hover:bg-[#FEF2F2]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <TestTubes className="w-6 h-6 mt-1 text-[#E84142]" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Testnet</h3>
                      <p className="text-sm text-[#6B7280] mb-3">
                        Deploy your L1 on the Fuji test network. Ideal for testing before production deployment.
                      </p>
                      <p className="text-[#E84142] font-medium">$0 Platform Fee</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setEnvironment("mainnet")}
                  className={`p-5 rounded-lg border text-left transition-all ${
                    environment === "mainnet"
                      ? "border-[#E84142] ring-2 ring-[#E84142] bg-[#FEF2F2]"
                      : "border-[#E5E7EB] hover:border-[#E84142] hover:bg-[#FEF2F2]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 mt-1 text-[#E84142]" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Mainnet</h3>
                      <p className="text-sm text-[#6B7280] mb-3">
                        Deploy your Permissionless Layer 1 blockchain on the Avalanche Mainnet.
                      </p>
                      <p className="text-[#E84142] font-medium">$50 / month Platform Fee</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Requirements */}
          <Card className="border-[#E5E7EB] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Basic Requirements</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2 text-[#1A1523]" htmlFor="validators">
                    Number of Validators
                    <Info className="w-4 h-4 text-[#6B7280]" />
                  </Label>
                  <Input
                    id="validators"
                    type="number"
                    min="1"
                    value={validators}
                    onChange={(e) => setValidators(Math.max(1, parseInt(e.target.value) || 1))}
                    className="bg-white border-[#E5E7EB] hover:border-[#E84142] focus:ring-[#E84142] focus:border-[#E84142]"
                  />
                  <p className="text-sm text-[#6B7280]">
                    Minimum recommended: 2 for Testnet, 5 for Mainnet
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2 text-[#1A1523]" htmlFor="state-size">
                    Storage (GB)
                    <Info className="w-4 h-4 text-[#6B7280]" />
                  </Label>
                  <Input
                    id="state-size"
                    type="number"
                    min="10"
                    value={storage}
                    onChange={(e) => setStorage(Math.max(10, parseInt(e.target.value) || 10))}
                    className="bg-white border-[#E5E7EB] hover:border-[#E84142] focus:ring-[#E84142] focus:border-[#E84142]"
                  />
                  <p className="text-sm text-[#6B7280]">
                    Minimum recommended: 10GB
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2 text-[#1A1523]" htmlFor="throughput">
                    Throughput (Block Gas Limit)
                    <Info className="w-4 h-4 text-[#6B7280]" />
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setThroughput('low')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        throughput === 'low'
                          ? "border-[#E84142] ring-2 ring-[#E84142] bg-[#FEF2F2]"
                          : "border-[#E5E7EB] hover:border-[#E84142] hover:bg-[#FEF2F2]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold">Low</div>
                        <div className="text-sm text-[#6B7280]">12 million gas / block</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setThroughput('medium')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        throughput === 'medium'
                          ? "border-[#E84142] ring-2 ring-[#E84142] bg-[#FEF2F2]"
                          : "border-[#E5E7EB] hover:border-[#E84142] hover:bg-[#FEF2F2]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold">Medium</div>
                        <div className="text-sm text-[#6B7280]">15 million gas / block</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setThroughput('high')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        throughput === 'high'
                          ? "border-[#E84142] ring-2 ring-[#E84142] bg-[#FEF2F2]"
                          : "border-[#E5E7EB] hover:border-[#E84142] hover:bg-[#FEF2F2]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold">High</div>
                        <div className="text-sm text-[#6B7280]">20 million gas / block</div>
                      </div>
                    </button>
                  </div>
                  <div className={`mt-3 text-sm ${throughput === 'high' ? 'text-[#E84142]' : 'text-[#6B7280]'}`}>
                    {throughput === 'high' 
                      ? "Note: High throughput will result in faster state growth. Consider increasing storage allocation."
                      : "Select throughput based on your expected transaction volume"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Services */}
          <Card className="border-[#E5E7EB] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Extra Services</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold text-[#1A1523]">Include Glacier (Indexer)</Label>
                    <p className="text-sm text-[#6B7280]">
                      Enable blockchain indexing capabilities
                    </p>
                  </div>
                  <Switch 
                    checked={includeGlacier}
                    onCheckedChange={setIncludeGlacier}
                    className="data-[state=checked]:bg-[#E84142]" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold text-[#1A1523]">Include Explorer</Label>
                    <p className="text-sm text-[#6B7280]">
                      Add block explorer functionality
                    </p>
                  </div>
                  <Switch 
                    checked={includeExplorer}
                    onCheckedChange={setIncludeExplorer}
                    className="data-[state=checked]:bg-[#E84142]" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[#E5E7EB] shadow-lg sticky top-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="font-bold text-2xl text-[#1A1523]">SUMMARY</h2>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#1A1523] mt-6">What you get</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#E84142] flex-shrink-0"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#1A1523]">Validator node setup and configuration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#E84142] flex-shrink-0"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#1A1523]">Indexer and Blockchain Explorer</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#E84142] flex-shrink-0"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#1A1523]">State management and storage</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#E84142] flex-shrink-0"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#1A1523]">Network monitoring and alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#E84142] flex-shrink-0"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[#1A1523]">Easily process 1,000 tx per second</span>
                    </li>
                  </ul>
                  <h3 className="font-semibold text-lg text-[#1A1523]">Cost Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A1523]">Validators ({validators})</span>
                      <span className="text-[#6B7280]">{formatCurrency(costs.validatorCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A1523]">Storage ({storage} GB)</span>
                      <span className="text-[#6B7280]">{formatCurrency(costs.storageCost)}</span>
                    </div>
                    {throughput === 'high' && (
                      <div className="flex items-center gap-2 text-[#E84142] text-sm mt-2">
                        <Info className="w-4 h-4" />
                        <span>High throughput selected - monitor state growth</span>
                      </div>
                    )}
                    {costs.serviceCost > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#1A1523]">Additional Services</span>
                        <span className="text-[#6B7280]">{formatCurrency(costs.serviceCost)}</span>
                      </div>
                    )}
                    {costs.platformFee > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#1A1523]">Platform Fee</span>
                        <span className="text-[#6B7280]">{formatCurrency(costs.platformFee)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#1A1523]">Total Monthly Cost</span>
                        <span className="text-[#E84142] font-semibold">{formatCurrency(costs.totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Link href="https://app.avacloud.io/">
            <Button className="mt-6 rounded-full text-lg px-8 py-6 bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-white dark:text-white" size="lg">
              Deploy Your L1 <ArrowRight color="white" className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}