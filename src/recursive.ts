import {
    Field,
    SelfProof,
    Struct,
    MerkleMap,
    MerkleWitness,
    MerkleMapWitness,
    verify,
    FlexibleProvablePure,
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


export function asRecursive<
    PublicInputType extends FlexibleProvablePure<any>,
    PublicOutputType extends FlexibleProvablePure<any>
    >(name: string,
        program: {
            name: string;
            publicInputType: PublicInputType;
            publicOutputType: PublicOutputType;
          }
    ) {
    return ZkProgram({
        name: name,
        publicInput: program.publicInputType,

        methods: {
            prove: {
                privateInputs: [Proof<PublicInputType, PublicOutputType>],
                async method(
                    publicInput: PublicInputType,
                    proof: Proof<PublicInputType, PublicOutputType>,
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