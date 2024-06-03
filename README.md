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
bun index.js
```

### Results

```
bun /home/brian/work/ctx-core/rmemo-vs-signals-proposal-benchmark/index.js
Signal.Computed standalone x 4,485 ops/sec ±3.11% (78 runs sampled)
Signal.Computed watch x 3,560 ops/sec ±2.42% (78 runs sampled)
memo_ x 4,430 ops/sec ±2.69% (83 runs sampled)
Fastest is Signal.Computed standalone,memo_
```

## Run NodeJS (V8) Benchmark

```shell
bun index.js
```

### Results

```
node /home/brian/work/ctx-core/rmemo-vs-signals-proposal-benchmark/index.js
Signal.Computed standalone x 3,333 ops/sec ±1.54% (91 runs sampled)
Signal.Computed watch x 2,169 ops/sec ±2.30% (91 runs sampled)
memo_ x 507 ops/sec ±47.09% (46 runs sampled)
Fastest is Signal.Computed standalone
```
