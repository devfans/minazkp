/**
 * MerkleKV benchmark
 */
import { Field, Provable, Poseidon, MerkleMap } from 'o1js';


import {
  MerkleLeaf, MerkleKV,
} from '../../merkle_tree.js';
import { benchmark, run } from '../benchmark.js';


const randomLeaf = (count: number) => {
  if (count < 1) throw "count < 1";
  const map = new MerkleMap();
  if (count > 1) {
    Array(count - 1).fill(0).map(() => {
      const key = Field.random();
      const value = Field.random();
      map.set(key, value);
    })
  }
  const key = Field.random();
  const value = Field.random();
  map.set(key, value);
  return {
    map: map,
    key: key,
    value: value,
  }
}


const bmMerkleKV = benchmark(
    'merklekv',
    async (tic, toc) => {
      tic('build constraint system');
      const {verificationKey} = await MerkleLeaf.compile();
      toc();
      const entry = randomLeaf(10);
      const leaf = new MerkleKV({root: entry.map.getRoot(), key: entry.key, value: entry.value });
      const witness = entry.map.getWitness(entry.key);
      tic('prove merkle leaf');
      const { proof } = await MerkleLeaf.prove(leaf, witness);
      toc();
      tic('verify proof');
      console.log(await MerkleLeaf.verify(proof));
      toc();
    },
    // two warmups to ensure full caching
    { numberOfWarmups: 2, numberOfRuns: 5 }
  );
  
await run(bmMerkleKV);