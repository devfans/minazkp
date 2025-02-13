import {
    Field,
    SelfProof,
    Struct,
    MerkleMap,
    MerkleWitness,
    MerkleMapWitness,
    verify,
    SmartContract,
    state,
    State,
    method,
    DeployArgs,
    Proof,
    Permissions,
    ZkProgram,
    Crypto,
    createEcdsa,
    createForeignCurve,
    Bool,
    Bytes,
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
        }
    }
  });


