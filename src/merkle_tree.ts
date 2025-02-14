import {
    Field,
    SelfProof,
    Struct,
    MerkleMapWitness,
    ZkProgram,
  } from 'o1js';

  export class MerkleKV extends Struct({
    root: Field,
    key: Field,
    value: Field,
  }) {

    static validate(
        leaf: MerkleKV,
        witness: MerkleMapWitness,
    ) {
        const [witnessRoot, witnessKey] = witness.computeRootAndKey(leaf.value);
        witnessRoot.assertEquals(leaf.root);
        witnessKey.assertEquals(leaf.key);
    }

    static assertEquals(kv1: MerkleKV, kv2: MerkleKV) {
      kv1.root.assertEquals(kv2.root);
      kv1.key.assertEquals(kv2.key);
      kv1.value.assertEquals(kv2.value);
    }
  }

  export const MerkleLeaf = ZkProgram({
    name: 'merkle-leaf',
    publicInput: MerkleKV,

    methods: {
        prove: {
            privateInputs: [MerkleMapWitness],

            async method(
                leaf: MerkleKV,
                witness: MerkleMapWitness,
            ) {
                MerkleKV.validate(leaf, witness);
            }
        },

        recursive: {
            privateInputs: [SelfProof],

            async method(
                leaf: MerkleKV,
                proof: SelfProof<MerkleKV, void>,
            ) {
                // Verify the proof
                proof.verify();

                // Assert that the proof's public input matches the provided public input
                MerkleKV.assertEquals(proof.publicInput, leaf);
            }
        }
    }

  });


