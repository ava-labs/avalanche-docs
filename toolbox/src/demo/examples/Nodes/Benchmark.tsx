import { Input, Button } from "../../ui";
import { useEffect, useState, useRef } from "react";
import { EVMBenchmark } from "./EVMBenchmark";
import { useExampleStore } from "../../utils/store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Benchmark() {
    const {
        evmChainRpcUrl,
        setEvmChainRpcUrl,
        evmChainWsUrl,
        setEvmChainWsUrl
    } = useExampleStore();

    const [maxConcurrency, setMaxConcurrency] = useState("100");
    const [lastError, setLastError] = useState<Error | null>(null);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const [benchmarkStats, setBenchmarkStats] = useState<{
        includedInBlock: number;
        errors: number;
        concurrency: number;
    } | null>(null);
    const [chartData, setChartData] = useState<Array<{
        time: string;
        includedInBlock: number;
        concurrency: number;
    }>>([]);
    const benchmarkRef = useRef<EVMBenchmark | null>(null);

    useEffect(() => {
        if (benchmarkRef.current) {
            benchmarkRef.current.setMaxConcurrency(parseInt(maxConcurrency));
        }
    }, [maxConcurrency]);

    useEffect(() => {
        if (evmChainRpcUrl && !evmChainWsUrl && evmChainRpcUrl.startsWith('http') && evmChainRpcUrl.endsWith('/rpc')) {
            setEvmChainWsUrl(evmChainRpcUrl.replace(/^http/, 'ws').replace(/\/rpc$/, '/ws'))
        }
    }, [evmChainRpcUrl, evmChainWsUrl]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (benchmarkRef.current) {
                benchmarkRef.current.destroy();
                benchmarkRef.current = null;
            }
        };
    }, []);

    function startBenchmark() {
        // Clean up any existing benchmark first
        if (benchmarkRef.current) {
            benchmarkRef.current.destroy();
        }

        setLastError(null);
        setBenchmarkStats(null);
        setInsufficientBalance(false);
        setChartData([]);

        const benchmark = new EVMBenchmark();
        benchmark.initialize((data) => {
            console.log(data);
            setBenchmarkStats({
                includedInBlock: data.includedInBlock,
                errors: data.errors,
                concurrency: data.concurrency
            });

            // Add data point to chart data
            setChartData(prevData => {
                const newPoint = {
                    time: new Date().toLocaleTimeString(),
                    includedInBlock: data.includedInBlock,
                    concurrency: data.concurrency
                };

                // Keep only the last 20 data points to prevent the chart from becoming too crowded
                const updatedData = [...prevData, newPoint];
                if (updatedData.length > 20) {
                    return updatedData.slice(updatedData.length - 20);
                }
                return updatedData;
            });

            if (data.lastError) {
                setLastError(data.lastError);

                // Check if error is related to insufficient balance
                if (benchmark.hasInsufficientBalance()) {
                    setInsufficientBalance(true);
                }
            }
        }, evmChainRpcUrl, evmChainWsUrl);
        benchmarkRef.current = benchmark;
    }

    function stopBenchmark() {
        if (benchmarkRef.current) {
            benchmarkRef.current.destroy();
            benchmarkRef.current = null;
        }
    }

    return <>
        <Input type="number" label="Max Concurrency" value={maxConcurrency} onChange={setMaxConcurrency} step={10} />
        <Input type="text" label="EVM RPC URL (http)" value={evmChainRpcUrl} onChange={setEvmChainRpcUrl} />
        <Input type="text" label="EVM RPC URL (ws)" value={evmChainWsUrl} onChange={setEvmChainWsUrl} />
        <Button onClick={() => startBenchmark()}>Start</Button>
        <Button onClick={() => stopBenchmark()}>Stop</Button>
        <div>ROOT ADDR: {EVMBenchmark.getRootAddress()}</div>

        {insufficientBalance && (
            <div style={{ marginTop: '10px', color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fff1f1' }}>
                <h3>⚠️ Insufficient Balance</h3>
                <div>The root account doesn't have enough funds to run the benchmark.</div>
                <div>Please transfer at least 100,000 Coins to: <code>{EVMBenchmark.getRootAddress()}</code></div>
            </div>
        )}

        {benchmarkStats && !insufficientBalance && (
            <div style={{ marginTop: '20px' }}>
                <h3>Benchmark Stats</h3>
                <div>TXs in Block: {benchmarkStats.includedInBlock}</div>
                <div>Concurrency: {benchmarkStats.concurrency}</div>
                <div>Errors: {benchmarkStats.errors}</div>

                <div style={{ height: '300px', marginTop: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="includedInBlock"
                                name="TXs in Block"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                animationDuration={100}
                            />
                            <Line
                                type="monotone"
                                dataKey="errors"
                                name="Errors"
                                stroke="#ff0000"
                                animationDuration={100}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}

        {lastError && !insufficientBalance && (
            <div style={{ marginTop: '10px', color: 'red' }}>
                <h3>Last Error</h3>
                <div>{lastError.message}</div>
            </div>
        )}
    </>
}


