/**
 * MerkleKV benchmark
 */

import {
  MerkleLeaf,
} from '../../merkle_tree.js';
import { benchmark, start } from '../benchmark.js';


const randomLeaf = (count: number) => {
    Array(count).fill(0).map(() => {
    })
}

const bmMerkleKV = benchmark(
    'merklekv',
    async (tic, toc) => {
      tic('build constraint system');
      await MerkleLeaf.compile();
      toc();

    },
    // two warmups to ensure full caching
    { numberOfWarmups: 2, numberOfRuns: 5 }
  );
  
await start(bmMerkleKV);