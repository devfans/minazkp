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


export function asRecursive<PUBI, PUBO>(name: string) {
    return ZkProgram({
        publicInput: PUBI,
        methods: {
            prove: {
                privateInputs: [Proof<PUBI, PUBO>],
                async method(
                    publicInput: PUBI,
                    proof: Proof<PUBI, PUBO>,
                ) {
                    // Verify the proof
                    proof.verify();

                    // Assert that the proof's public input matches the provided public input
                    proof.publicInput.assertEquals(publicInput);
                }
            }
        }
    });
}