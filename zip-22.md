|  ZIP | Title | Status| Type | Author | Created (yyyy-mm-dd) | Updated (yyyy-mm-dd)
|--|--|--|--| -- | -- | -- |
| 22  | Hybrid Consensus | Draft | Standards Track  | Zoltan Fazekas <zoltan@zilliqa.com> | 2023-08-04 | 2023-08-04


## Abstract

This ZIP proposes mixed validator commitees formed from mining nodes and staked seed nodes (SSNs) to increase the decentralization of the pBFT consensus.


## Motivation

Currently, the pBFT consensus is run by mining nodes only, most of which participate in mining pools with various hashrates. If mining pools become more concentrated, it is possible that the fraction of the hashrate controlled by a single pool might grow to close to the 67% level which would pose an issue for the pBFT consensus.

Zilliqa 2.0 will be a Proof of Stake (PoS) network. For a smooth transition from the current network to Zilliqa 2.0, we need a PoS validator community. SSNs are predestined to become the first PoS validators as their accumulated delegated stake already amounts to approx. 33% of the current ZIL supply. To establish themselves as future PoS validators and to help solve the centralization issue described above, SSNs shall be enable to join the DS committee.

## Specification

The current proposal presumes desharding described in ZIP-23 [1] to be implemented simultaneously, so that the hybrid consensus considers only a single DS committee.

The proposal requires changes in the following three areas.

### Validator Selection

In order to include SSNs in the committee, the number of guard nodes operated by Zilliqa will be reduced so that the committee size remains 600. We invite all active SSNs (currently 23 according to [2]) to join the committee as long as they fulfill the minimum stake requirement.

The rules for inclusion of mining nodes based on their PoW submissions remains unchanged. With the current DS difficulty and total network hashrate, around 10 new mining nodes join the committee every epoch, replacing other mining nodes that have been part of the committee for the longest time.

### Consensus Rules

Currently, the pBFT commit rule requires more than 2/3 of the committee members to agree on a proposed block. This rule will be extended with a second condition (stake-weighted voting). In addition to the first condition, the second condition requires that more than 2/3 of the stake held by the committe must agree on the same block.

To implement this, the consensus must take a snapshot of the validators' stake from the SSN staking contract during the vacuous epoch. During the TX epochs, it must add up the stake of the validators that co-signed a block and check if the result is larger than 2/3 of the stake included in the snapshot.

### Staking Rewards

Initially, participating in the consensus will be optional. If SSNs opt out, they will continue to receive at most 50% of the staking reward based on the current reward distribution mechanism. In order to earn up to 100% of the staking reward, they must participate in the consensus. At a later stage, participation may become mandatory by reducing the staking reward of non-participating SSNs to zero.

Staking rewards of participating SSNs will not be issued based their availability tested by the verifier node, but based on their active contribution to the pBFT consensus. The amount of staking reward they receive will be determined according to the number of blocks in the DS epoch they co-sign within the window defined in the protocol. Mining rewards remain unaffected by this proposal. 


## Future Work

Punishment of validators that deviate from the protocol is a crucial part of the security model of PoS systems. In order to impose penalties, however, honest participants must identify the offenses and submit proofs, and the consensus leader must include them in the proposed block, so that ideally both the block proposer and the whistleblower receive a reward. Due to the additional complexity of these features we defer them to future work on Zilliqa 2.0.


## Conclusion

The hybrid consensus eliminates the dominance of the largest mining pools' nodes in the DS committee as neither of them controls a considerable fraction of the stake. Therefore, the current proposal significantly improves the Zilliqa network's decentralization. By contributing to the network's security, SSNs participating in the hybrid consensus will continue earning staking rewards and put themselves in the position to become the future validators of Zilliqa 2.0.


## References

1. [https://github.com/Zilliqa/ZIP/blob/master/zips/zip-23.md](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-23.md) 
1. [https://viewblock.io/zilliqa/staking](https://viewblock.io/zilliqa/staking)
1. [https://docs.zilliqa.com/whitepaper.pdf](https://docs.zilliqa.com/whitepaper.pdf)

## Copyright Waiver

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
