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


/*
class RecursiveProver<PUB, PROOF> {
    static proveWithZKP(
    ) {
        return ZkProgram({            
            methods: {
                prove: {
                    privateInputs: [PROOF],

                    async method(
                        publicInput: PUB,
                        proof: PROOF,
                    ) {
                        proof.verify();
                        proof.publicInput.assertEquals(publicInput);
                    }
                }
            }
        });
    }
}
    */