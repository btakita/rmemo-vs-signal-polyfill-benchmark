# rmemo-vs-signal-polyfill-benchmark
Benchmarking rmemo, which uses WeakRef, against the Signals Proposal. Comparing JavascriptCore vs V8 performance.

## Install

```shell
git clone git@github.com:btakita/rmemo-vs-signal-polyfill-benchmark.git
cd rmemo-vs-signal-polyfill-benchmark
pnpm i
```

## Run Bun (JavascriptCore Benchmark)

```shell
bun ./index.js
```

### Results

```
bun ./index.js
1000 Signal chain: without watcher x 4,968 ops/sec ±2.60% (80 runs sampled)
1000 Signal chain: with watcher x 3,941 ops/sec ±1.93% (85 runs sampled)
1000 rmemo chain x 4,829 ops/sec ±1.63% (89 runs sampled)
Fastest is 1000 Signal chain: without watcher,1000 rmemo chain
```

## Run NodeJS (V8) Benchmark

```shell
node ./index.js
```

### Results

```
node ./index.js
1000 Signal chain: without watcher x 3,317 ops/sec ±1.26% (92 runs sampled)
1000 Signal chain: with watcher x 2,414 ops/sec ±1.15% (93 runs sampled)
1000 rmemo chain x 542 ops/sec ±45.31% (46 runs sampled)
Fastest is 1000 Signal chain: without watcher
```
