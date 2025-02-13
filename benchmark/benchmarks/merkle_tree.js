/**
 * MerkleKV benchmark
 */

import { Provable } from 'o1js';
import {
  Bytes32,
  Ecdsa,
  Secp256k1,
  MerkleKV,
} from '../build/src/merkle_tree.js';
import { benchmark } from '../benchmark.js';


const randomLeaf = (count) => {
    map
    Array(count).fill(0).map(() => {

    })
}

const MerkleKV = benchmark(
    'merklekv',
    async (tic, toc) => {
      tic('build constraint system');
      await MerkleLeaf.compile();
      toc();

    },
    // two warmups to ensure full caching
    { numberOfWarmups: 2, numberOfRuns: 5 }
  );
  