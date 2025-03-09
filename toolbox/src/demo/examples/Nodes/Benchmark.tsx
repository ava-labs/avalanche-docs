import { Input, Button } from "../../ui";
import { useEffect, useState, useRef } from "react";
import { EVMBenchmark } from "./EVMBenchmark";
import { useExampleStore } from "../../utils/store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { blockInfoPayload } from "./EVMBenchmark";
export default function Benchmark() {
    const {
        evmChainRpcUrl,
        setEvmChainRpcUrl,
        evmChainWsUrl,
        setEvmChainWsUrl
    } = useExampleStore();

    const [tpsString, setTpsString] = useState("100");
    const [maxConcurrencyString, setMaxConcurrencyString] = useState("1000");
    const [lastError, setLastError] = useState<Error | null>(null);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const [benchmarkStats, setBenchmarkStats] = useState<{
        includedInBlock: number;
        errors: number;
        concurrency: number;
        gasUsed: number;
        gasLimit: number;
        blockTimestampDiff: number;
    } | null>(null);
    const [chartData, setChartData] = useState<Array<{
        time: string;
        includedInBlock: number;
        errors: number;
        concurrency: number;
        gasUsed: number;
        gasLimit: number;
        blockTimestampDiff: number;
        effectiveTps: number;
    }>>([]);
    const benchmarkRef = useRef<EVMBenchmark | null>(null);

    useEffect(() => {
        if (benchmarkRef.current) {
            benchmarkRef.current.setMaxConcurrency(parseInt(maxConcurrencyString));
        }
    }, [maxConcurrencyString]);

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

    useEffect(() => {
        if (benchmarkRef.current) {
            benchmarkRef.current.setTps(parseInt(tpsString));
        }
    }, [tpsString]);

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
        benchmark.setTps(parseInt(tpsString));
        benchmark.setMaxConcurrency(parseInt(maxConcurrencyString));

        let firstDatapoint = true;

        benchmark.initialize((data: blockInfoPayload) => {
            if (firstDatapoint) {
                firstDatapoint = false;
                return;
            }

            setBenchmarkStats({
                includedInBlock: data.includedInBlock,
                errors: data.errors,
                concurrency: data.concurrency,
                gasUsed: Number(data.gasUsed),
                gasLimit: Number(data.gasLimit),
                blockTimestampDiff: data.blockTimestampDiff
            });


            // Add data point to chart data
            setChartData(prevData => {
                const newPoint = {
                    time: new Date().toLocaleTimeString(),
                    includedInBlock: data.includedInBlock,
                    errors: data.errors,
                    concurrency: data.concurrency,
                    gasUsed: Number(data.gasUsed),
                    gasLimit: Number(data.gasLimit),
                    blockTimestampDiff: data.blockTimestampDiff,
                    effectiveTps: data.includedInBlock / data.blockTimestampDiff
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
        }, evmChainRpcUrl, evmChainWsUrl)
            .catch(error => {
                setLastError(error);
                // Clean up benchmark reference since initialization failed
                benchmarkRef.current = null;
            });

        benchmarkRef.current = benchmark;
    }

    function stopBenchmark() {
        if (benchmarkRef.current) {
            benchmarkRef.current.destroy();
            benchmarkRef.current = null;
        }
    }

    useEffect(() => {
        const tps = parseInt(tpsString);
        setMaxConcurrencyString((tps * 3).toString());
    }, [tpsString]);

    return <>
        <div className="mb-6 ">
            <h3 className="text-lg font-semibold mb-2">EVM Benchmark Tool</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Funding Required:</strong> Send at least 200,000 coins (2x the minimum requirement) to the root address shown below before starting.</li>
                <li><strong>Gradual Ramp-up:</strong> The benchmark will slowly ramp up transaction volume to reach the target TPS.</li>
                <li><strong>Adjustable TPS:</strong> You can change the target TPS during the benchmark run - the system will adjust accordingly.</li>
                <li><strong>Max Concurrency:</strong> This limits the number of pending transactions to prevent overwhelming the network. It's automatically set to 3x the target TPS.</li>
                <li><strong>Browser limits:</strong> This benchmark is not too demanding for the browser, but still limited by your CPU/RAM/Network. </li>
            </ul>
        </div>

        <Input type="number" label="TPS" value={tpsString} onChange={setTpsString} step={50} />
        <Input type="number" label="Max Concurrency" value={maxConcurrencyString} onChange={setMaxConcurrencyString} step={10} disabled={true} notes={`3xTPS`} />
        <Input type="text" label="EVM RPC URL (http)" value={evmChainRpcUrl} onChange={setEvmChainRpcUrl} />
        <Input type="text" label="EVM RPC URL (ws)" value={evmChainWsUrl} onChange={setEvmChainWsUrl} notes={`Auto filled by replacing http with ws in the beginning and /rpc with /ws in the end`} />

        <div className="flex gap-2.5">
            <Button onClick={() => startBenchmark()} type="primary" disabled={!evmChainRpcUrl || !evmChainWsUrl || !!benchmarkRef.current}>Start</Button>
            <Button onClick={() => stopBenchmark()} disabled={!benchmarkRef.current}>Stop</Button>
        </div>

        <div>Root account address is {EVMBenchmark.getRootAddress()}</div>

        {insufficientBalance && (
            <div style={{ marginTop: '10px', color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fff1f1' }}>
                <h3>⚠️ Insufficient Balance</h3>
                <div>The root account doesn't have enough funds to run the benchmark.</div>
                <div>Please transfer at least 100,000 Coins to: <code>{EVMBenchmark.getRootAddress()}</code></div>
            </div>
        )}

        {benchmarkStats && !insufficientBalance && (
            <div style={{ marginTop: '20px' }}>

                <div style={{ marginTop: '20px' }}>
                    {/* Transactions Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={chartData}
                            syncId="benchmarkCharts"
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
                            <ReferenceLine y={parseInt(tpsString)} stroke="#aaaaaa" name="Target TPS" />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Concurrency Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={chartData}
                            syncId="benchmarkCharts"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="concurrency"
                                name="Concurrency"
                                stroke="#82ca9d"
                                activeDot={{ r: 8 }}
                                animationDuration={100}
                            />
                            <ReferenceLine y={parseInt(maxConcurrencyString)} stroke="#ff0000" name="Max Concurrency" />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Gas Usage Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={chartData}
                            syncId="benchmarkCharts"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis
                                tickFormatter={(value) => `${(value / 1_000_000).toFixed(2)}M`}
                                domain={[0, 'dataMax']}
                            />
                            <Tooltip
                                formatter={(value) => [`${(Number(value) / 1_000_000).toFixed(2)}M`, 'Gas']}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="gasUsed"
                                name="Gas Used"
                                stroke="#ff7300"
                                activeDot={{ r: 8 }}
                                animationDuration={100}
                            />
                            <ReferenceLine
                                y={chartData.length > 0 ? chartData[chartData.length - 1].gasLimit : 0}
                                stroke="#0088aa"
                                label={{
                                    value: chartData.length > 0 ?
                                        `Gas Limit: ${(chartData[chartData.length - 1].gasLimit / 1_000_000).toFixed(1)}M` :
                                        "Gas Limit",
                                    fill: "#0088aa",
                                    position: "insideBottomRight"
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* Block Timestamp Diff Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={chartData}
                            syncId="benchmarkCharts"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis
                                tickFormatter={(value) => `${value}s`}
                                domain={[0, 'dataMax']}
                            />
                            <Tooltip
                                formatter={(value) => [`${value}s`, 'Difference between block timestamps']}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="blockTimestampDiff"
                                name="Difference between block timestamps"
                                stroke="#0088aa"
                                activeDot={{ r: 8 }}
                                animationDuration={100}
                            />
                            <ReferenceLine
                                y={1}
                                stroke="#cccccc"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* Effective TPS Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData} syncId="benchmarkCharts" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis
                                tickFormatter={(value) => `${value}TPS`}
                                domain={[0, 'dataMax']}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="effectiveTps"
                                name="Effective TPS"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                animationDuration={100}
                            />
                            <ReferenceLine
                                y={chartData.length > 0
                                    ? chartData.reduce((sum, point) => sum + point.effectiveTps, 0) / chartData.length
                                    : 0}
                                stroke="#2ca02c"
                                strokeDasharray="3 3"
                                label={{
                                    value: chartData.length > 0
                                        ? `Avg: ${(chartData.reduce((sum, point) => sum + point.effectiveTps, 0) / chartData.length).toFixed(1)} TPS`
                                        : "Avg TPS",
                                    fill: "#2ca02c",
                                    position: "insideBottomRight"
                                }}
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


