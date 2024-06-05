# rmemo-vs-signal-polyfill-benchmark
Benchmarking rmemo, which uses WeakRef, against the Signals Proposal. Comparing JavascriptCore vs V8 performance.

## Install

```shell
git clone git@github.com:btakita/rmemo-vs-signal-polyfill-benchmark.git
cd rmemo-vs-signal-polyfill-benchmark
pnpm i
```

## bun memory-rmemo.js

```shell
bun ./memory-rmemo.js
...
1000000 {
  rss: 1022812160,
  heapTotal: 890159104,
  heapUsed: 310031248,
  external: 209487,
  arrayBuffers: 0,
}
total: 1000000 {
  rss: 1022812160,
  heapTotal: 890159104,
  heapUsed: 310031248,
  external: 209487,
  arrayBuffers: 0,
}
bun ./memory-rmemo.js  1.07s user 0.21s system 286% cpu 0.446 total
```

## bun memory-signal.js

```shell
bun ./memory-signal.js
...
1000000 {
  rss: 769064960,
  heapTotal: 620545024,
  heapUsed: 423323583,
  external: 8651919,
  arrayBuffers: 0,
}
total: 1000000 {
  rss: 769392640,
  heapTotal: 620545024,
  heapUsed: 423323583,
  external: 16973580,
  arrayBuffers: 0,
}
bun ./memory-signal.js  0.74s user 0.11s system 222% cpu 0.382 total
```

## node memory-rmemo.js
```shell
...
1000000 {
  rss: 1152708608,
  heapTotal: 1103556608,
  heapUsed: 1060464280,
  external: 1619130,
  arrayBuffers: 10467
}
total: 1000000 {
  rss: 1152708608,
  heapTotal: 1103556608,
  heapUsed: 1060476424,
  external: 1619130,
  arrayBuffers: 10467
}
node ./memory-rmemo.js  2.59s user 0.53s system 224% cpu 1.387 total
```

## node memory-signal.js
```shell
...
1000000 {
  rss: 1333428224,
  heapTotal: 1280495616,
  heapUsed: 1239503256,
  external: 1619130,
  arrayBuffers: 10467
}
total: 1000000 {
  rss: 1333592064,
  heapTotal: 1281544192,
  heapUsed: 1239816688,
  external: 1619130,
  arrayBuffers: 10467
}
node ./memory-signal.js  3.21s user 0.59s system 238% cpu 1.598 total
```

## deno memory-rmemo.js
```shell
1000000 [Object: null prototype] {
  rss: 1183883264,
  heapTotal: 1090969600,
  heapUsed: 1054586352,
  external: 2681434
}
total: 1000000 [Object: null prototype] {
  rss: 1190764544,
  heapTotal: 1098571776,
  heapUsed: 1051931376,
  external: 2681434
}
deno run ./memory-rmemo.js  5.14s user 0.83s system 343% cpu 1.740 total
```

## deno memory-signal.js
```shell
...
1000000 [Object: null prototype] {
  rss: 1365889024,
  heapTotal: 1282334720,
  heapUsed: 1240824072,
  external: 2681434
}
total: 1000000 [Object: null prototype] {
  rss: 1375555584,
  heapTotal: 1292296192,
  heapUsed: 1240406376,
  external: 2681434
}
deno run ./memory-signal.js  5.50s user 0.93s system 331% cpu 1.937 total
```

## bun async.js (JavascriptCore Benchmark)

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

## node sync.js (V8) Benchmark

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

## deno run sync.js (V8) Benchmark

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

## bun sync.js (JavascriptCore Benchmark)

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

## node sync.js (V8) Benchmark

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

## deno run sync.js (V8) Benchmark

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
