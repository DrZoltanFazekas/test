|  ZIP | Title | Status| Type | Author | Created (yyyy-mm-dd) | Updated (yyyy-mm-dd)
|--|--|--|--| -- | -- | -- |
| 22  | Hybrid Consensus | Draft | Standards Track  | Zoltan Fazekas <zoltan@zilliqa.com> | 2023-08-04 | 2023-08-04


## Abstract

This ZIP proposes mixed validator commitees formed from mining nodes and staked seed nodes (SSNs) to increase the decentralization of the pBFT consensus.


## Motivation

Currently, the pBFT consensus is run by mining nodes only. Due to the heterogenous hashrates of the participating mining pools, at times up to 65% of the total network hashrate is controlled by a single pool. This undermines the security of the pBFT consensus. To ensure safe operation, Zilliqa must run a large number of guard nodes to prevent the largest mining pool from taking over the DS committee.

Zilliqa 2.0 will be a Proof of Stake (PoS) network. For a smooth transition from the current network to Zilliqa 2.0, we need a PoS validator community. SSNs are predestined to become the first PoS validators as their accumulated delegated stake already amounts to approx. 33% of the current ZIL supply. To establish themselves as future PoS validators and to help solve the centralization issue described above, SSNs shall be enable to join the DS committee.

## Specification

The current proposal presumes desharding described in ZIP-23 [1] to be implemented simultenously, so that the hybrid consensus considers only a single DS committee.

The proposal requires changes in the following three areas.

### Validator Selection

The committee is currently composed of 180 mining nodes and 420 guard nodes operated by Zilliqa. In order to include SSNs in the committee, the number of guard nodes will be reduced so that the committee size remains 600. We invite all active SSNs (currently 23 according to [2]) to join the committee as long as they fulfill the minimum stake requirement.

The rules for inclusion of mining nodes based on their PoW submissions remains unchanged. With the current DS difficulty and total network hashrate, around 10 new mining nodes join the committee every epoch, replacing other non-guard nodes that have been part of the committee for the longest time.

### Consensus Rules

Currently, the pBFT commit rule requires more than 2/3 of the committee members to agree on a proposed block. This rule will be extended with a second condition (stake-weighted voting). In addition to the first condition, the second condition requires that more than 2/3 of the stake held by the committe must agree on the same block.

To implement this, the consensus must take a snapshot of the validators' stake from the SSN staking contract during the vacuous epoch. During the TX epochs, it must add up the stake of the validators that co-signed a block and check if the result is larger than 2/3 of the stake included in the snapshot.

### Staking Rewards

Initially, participating in the consensus will be optional. If SSNs opt out, they will continue to receive at most 50% of the staking reward based on the current reward distribution mechanism. In order to earn up to 100% of the staking reward, they must participate in the consensus. At a later stage, participation may become mandatory by reducing the staking reward of non-participating SSNs to zero.

Staking rewards of participating SSNs will not be issued based their availability tested by the verifier node, but based on their active contribution to the pBFT consensus. The amount of staking reward they receive will be determined according to the number of blocks in the DS epoch they co-sign within the window defined in the protocol. Mining rewards remain unaffected by this proposal. 


## Security

The current PoW-based validator selection relies on the adversarial assumption formulated in the Zilliqa whitepaper [3]: "*We assume that the mining network at any point of time has a fraction of byzantine nodes/identities with a total computational power that is at most* $f<\frac{n}{4}$ *of the complete network, where* $0 ≤ f < 1$ *and* $n$ *is the total size of the network.*" Furthermore, "*one can show that if the DS committee size is sufficiently large (say above 800), then among the* $n_0$ *members of the committee at most* $\frac{1}{3}$ *are byzantine with high probability.*"

We can apply a similar argument in the PoS setting by assuming that byzantine nodes control at most $\tilde{f}<\frac{\tilde{n}}{4}$ fraction of the total stake $\tilde{n}$, where $0 ≤ \tilde{f} < 1$. Analogously to the requirement regarding the DS committee size in the whitepaper, it is easy to see that if the committee's stake size is sufficiently large (above the $\frac{3\tilde{n}}{4}$ threshold), then the fraction of the committee's stake controlled by byzantine members of the committee is less than $\frac{1}{3}$. In order to be safe as per the formulated adversarial assumption, we should aim for more than 75% of the total stake delegated to SSNs to participate in the consensus and incentivize the SSNs accordingly.

While byzantine miners in the mixed committee can not cause the amount of stake controlled by byzantine members to exceed the $\frac{1}{3}$ threshold assuming the committee represents more than 75% of the total stake, byzantine SSNs joining the committee do increase the probability of more than $\frac{n_0}{3}$ committee members being byzantine. This would mandate a further increase in the committee size beyond 800.

The presence of guard nodes in the committee allows us to relax this requirement, as the following example illustrates. The probability of say 130 of the 180 external mining nodes in the committee being byzantine is lower than $2^-134$. Let's extend the committee with 21 SSNs of which up to 20 could be byzantine as a single honest SSN could control more than $\frac{3n}{4}$ stake to fulfill our adversarial assumption. The total number of byzantine nodes will not reach the $\frac{1}{3}$ threshold as $\frac{130 + 20}{600}<\frac{1}{3}$ with high probability. It's easy to see that the security margin would allow up to 70 SSNs to participate in the committee.


## Future Work

Punishment of validators that deviate from the protocol is a crucial part of the security model of PoS systems. In order to impose penalties, however, honest participants must identify the offenses and submit proofs, and the consensus leader must include them in the proposed block, so that ideally both the block proposer and the whistleblower receive a reward. Due to the additional complexity of these features we defer them to future work on Zilliqa 2.0.


## Conclusion

The hybrid consensus eliminates the dominance of both the largest mining pool's nodes and Zilliqa's guard nodes in the DS committee as neither of them controls a considerable fraction of the stake. Therefore, the current proposal significantly improves the Zilliqa network's decentralization. By contributing to the network's security, SSNs participating in the hybrid consensus will continue earning staking rewards and put themselves in the position to become the future validators of Zilliqa 2.0.


## References

1. [https://github.com/Zilliqa/ZIP/blob/master/zips/zip-23.md](https://github.com/Zilliqa/ZIP/blob/master/zips/zip-23.md) 
1. [https://viewblock.io/zilliqa/staking](https://viewblock.io/zilliqa/staking)
1. [https://docs.zilliqa.com/whitepaper.pdf](https://docs.zilliqa.com/whitepaper.pdf)

## Copyright Waiver

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
