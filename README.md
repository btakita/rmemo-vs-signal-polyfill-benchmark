# rmemo-vs-signal-polyfill-benchmark
Benchmarking rmemo, which uses WeakRef, against the Signals Proposal. Comparing JavascriptCore vs V8 performance.

## Install

```shell
git clone git@github.com:btakita/rmemo-vs-signal-polyfill-benchmark.git
cd rmemo-vs-signal-polyfill-benchmark
pnpm i
```

## Run async.js with Bun (JavascriptCore Benchmark)

```shell
bun ./async.js
```

### Results

```
bun ./async.js
1000 Signal chain: without watcher x 3,912 ops/sec ±3.68% (71 runs sampled)
1000 Signal chain: with watcher x 3,025 ops/sec ±3.61% (75 runs sampled)
1000 rmemo chain x 2,747 ops/sec ±4.73% (69 runs sampled)
Fastest is 1000 Signal chain: without watcher
```

## Run sync.js with NodeJS (V8) Benchmark

```shell
node ./async.js
```

### Results

```
node async.js
1000 Signal chain: without watcher x 1,101 ops/sec ±8.32% (67 runs sampled)
1000 Signal chain: with watcher x 1,003 ops/sec ±3.43% (72 runs sampled)
1000 rmemo chain x 1,054 ops/sec ±4.92% (70 runs sampled)
Fastest is 1000 Signal chain: without watcher
```

## Run sync.js with Deno (V8) Benchmark

```shell
deno run ./sync.js
```

### Results

```
deno run async.js
✅ Granted all read access.
1000 Signal chain: without watcher x 1,005 ops/sec ±6.28% (38 runs sampled)
1000 Signal chain: with watcher x 825 ops/sec ±5.12% (40 runs sampled)
1000 rmemo chain x 1,043 ops/sec ±5.36% (44 runs sampled)
Fastest is 1000 rmemo chain,1000 Signal chain: without watcher
```

## Run sync.js with Bun (JavascriptCore Benchmark)

```shell
bun ./sync.js
```

### Results

```
bun ./sync.js
1000 Signal chain: without watcher x 4,968 ops/sec ±2.60% (80 runs sampled)
1000 Signal chain: with watcher x 3,941 ops/sec ±1.93% (85 runs sampled)
1000 rmemo chain x 4,829 ops/sec ±1.63% (89 runs sampled)
Fastest is 1000 Signal chain: without watcher,1000 rmemo chain
```

## Run sync.js with NodeJS (V8) Benchmark

```shell
node ./sync.js
```

### Results

```
node ./sync.js
1000 Signal chain: without watcher x 3,317 ops/sec ±1.26% (92 runs sampled)
1000 Signal chain: with watcher x 2,414 ops/sec ±1.15% (93 runs sampled)
1000 rmemo chain x 542 ops/sec ±45.31% (46 runs sampled)
Fastest is 1000 Signal chain: without watcher
```

## Run sync.js with Deno (V8) Benchmark

```shell
deno run ./sync.js
```

### Results

```
deno run ./sync.js
✅ Granted all read access.
1000 Signal chain: without watcher x 3,346 ops/sec ±2.37% (64 runs sampled)
1000 Signal chain: with watcher x 2,384 ops/sec ±1.81% (63 runs sampled)

<--- Last few GCs --->

[547229:0x5ef986310000]    21250 ms: Mark-Compact (reduce) 1399.0 (1426.6) -> 1398.7 (1425.4) MB, pooled: 0 MB, 183.17 / 0.00 ms  (+ 0.4 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 188 ms) (average mu = 0.545

<--- JS stacktrace --->



#
# Fatal JavaScript out of memory: Reached heap limit
#
==== C stack trace ===============================

    deno(+0x2b9b688) [0x5ef9551d6688]
    deno(+0x219503d) [0x5ef9547d003d]
    deno(+0x2191ffd) [0x5ef9547ccffd]
    deno(+0x21cb227) [0x5ef954806227]
    deno(+0x22e6ddc) [0x5ef954921ddc]
    deno(+0x22e4bcd) [0x5ef95491fbcd]
    deno(+0x22d86ac) [0x5ef9549136ac]
    deno(+0x22d8fc8) [0x5ef954913fc8]
    deno(+0x22bc0e2) [0x5ef9548f70e2]
    deno(+0x2d25cf1) [0x5ef955360cf1]
    deno(+0x2a5e036) [0x5ef955099036]
[1]    547229 trace trap (core dumped)  deno run index.js
```
