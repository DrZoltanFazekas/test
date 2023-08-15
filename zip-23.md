|  ZIP | Title | Status| Type | Author | Created (yyyy-mm-dd) | Updated (yyyy-mm-dd)
|--|--|--|--| -- | -- | -- |
| 23  | Desharding | Draft | Standards Track  | Zoltan Fazekas <zoltan@zilliqa.com> | 2023-08-04 | 2023-08-04


## Abstract

This ZIP proposes a change to Zilliqa's sharding structure to reduce the block interval and the operational costs of the network. The proposal also includes a fairer distribution of rewards among miners.


## Motivation

The Zilliqa network uses 4 shards to process transactions in parallel. While 3 of them only deal with simple ZIL transfers, the DS shard alone is responsible for transactions that involve smart contract calls. In each TX epoch, the DS committee waits for the 3 shards to each deliver a microblock before agreeing on the final TX block. This makes the overall block time to take around 30 seconds. The current proposal aims at reducing the block time to 15-20 seconds which is a substantial performance improvement.  

The operation of the 3 shards requires up to 1680 mining nodes to join the network in every DS epoch. The current proposal eliminates the need for this high number of nodes and the mining costs related to their selection, thereby significantly reducing the overall operational costs and carbon footprint of the network.

The mining rewards consist of base rewards and co-signer rewards. While the distribution of the base rewards is the same in the DS committee and in the 3 shards, the co-signer rewards are handled differently. In the non-DS shards, the first ⅔ of the nodes, based on how fast they provide their signature on the proposed block to the leader, receive an equal share of the co-signer reward. We will refer to these ⅔ as the fast ones. In the DS committee, however, all nodes that manage to send their signature in the defined window receive an equal share of the co-signer reward. This creates disparity between fast and slow mining pools, which the current proposal alleviates to an extent that we believe is acceptable for both.


## Specification

We propose to suspend the operation of the 3 non-DS shards until the launch of new shards based on the Zilliqa 2.0 architecture. The implementation of this proposal requires the following changes to the current Zilliqa protocol.

### Omitting Shard PoW Submissions

The Zilliqa miners solve two PoW puzzles per DS epoch. While the DS PoW is required to determine new members of the DS committee, the shard PoW is used to form the 3 shards. The first up to 1680 nodes that manage to solve the shard PoW puzzle are assigned randomly to one of the 3 shards so that all shards end up with approx. the same number of nodes. The PoW solutions must be submitted within a 60 second window right after the DS submissions. As desharding eliminates the 3 shards, there will be no need for shard PoW in the future.

The DS PoW remains unchanged. To participate in the DS committee, mining pools must solve a puzzle with a difficulty two orders of magnitude higher than the shard difficulty. Because of this, there are only a few new mining nodes in every DS epoch that join the DS committee and replace other mining nodes that have been part of the committee for the longest time. It's obvious that the frequency of solving the more difficult DS PoW puzzle is lower, but at the same time, the reward of the DS PoW winners will be much higher in the future as explained in the section after next. Since the total amount distributed over a period remains unchanged, rewards the mining pools will earn in proportion to their hashrate remain in the long run the same as before.

An analogy to explain this effect can be taken from the Ethereum Mainnet's incentive layer [1], where all validators participate in the consensus in every epoch, but the few block proposers among them are selected randomly. While each validator receives a small reward in every epoch, it only gets the chance to earn the larger proposer reward once in approx. 60 days on average. So being a validator brings small but constant rewards while proposing blocks gives seldom but large rewards, just as smaller Zilliqa mining pools have their share of nodes in the 3 shards constantly and become DS committee members irregularly.

### Omitting Shard Microblocks

Currently, transactions are assigned to the 3 shards and the DS committee by a lookup node, which knows the composition of the shards. Each shard runs its own instance of the pBFT consensus to agree on a microblock of transactions that were assigned to it. The 3 microblocks are then sent to the DS committee which merges them into a final TX block that also contains transactions that were sent to the DS committee. Finally, the DS committee runs another instance of the pBFT consensus to agree on the TX block.

A variable called `m_sendAllToDS` in the code of the lookup node determines whether it sends all transactions to the DS committee or distributes them across the shards. There are also several constants defined in `constants.xml` that determine the length of the window for various steps such as the dissemination of transaction packets, the block creation and the pBFT consensus itself. These values must be adjusted and tested carefully to avoid destabilization of the DS consensus. Nevertheless, without the 3 shards there will be no need for microblocks and additional consensus runs to agree on them. The DS leader can create the final TX block right away and after all DS committee members received all transactions within a sufficient window, they can run a single instance of the consensus to agree on it.

### Reshuffling Mining Rewards

In order to maintain approximately the same total amount of mining rewards as before desharding, we must multiply the rewards distributed among the DS committee members by a factor depending on the actual number of nodes in the shards. In the ideal case of 600 nodes per shard, the factor would be set to 7.833 whereas in case of the average shard size of 588.5 measures across 1000 DS epochs (29291 to 30290), the factor shall be 7.696.

We could distribute the total amount of mining rewards among the DS committee members based on the current mechanism, which does not distinguish between fast and slow nodes, unlike the distribution mechanism in the 3 shards. However, this would cause fast mining pools to earn up to 24% less and slow pools to earn up to +135% more than before. This is because their nodes would get equal rewards while currently they earn very different amounts. A fast node in one of the 3 shards can earn up to 68 ZIL per DS epoch while a slow node makes only 17 ZIL at worst. At the same time, all nodes of the DS committee get 68 ZIL. As mining pools usually maintain nodes both in the 3 shards as well as in the DS committee (in proportion to their hashrate), a perfectly fast pool, the nodes of which are always among the first ⅔, can earn 3.1 times more than a perfectly slow pool with the same hashrate, the nodes of which never manage to be among the first ⅔. 

To alleviate this disparity to some extent but also maintain a similar level of rewards fast and slow pools were used to earn before desharding, we will change the way co-signer rewards are calculated in the DS committee. We exploit the fact that all nodes that co-sign a DS block in time are recorded in the order the leader received their signatures. We multiply the co-signer reward of the first ⅔ of them by 1.3 and multiply the co-signer reward of the remaining ⅓ of them by 0.4. This will ensure that fast pools will not earn less than 93%, and slow pools will not earn more than 129% of the rewards they earn today. At the same time, the gap between fast and slow pools gets reduced from 3.1x to 2.2x.


## Future Work

The sharded architecture of Zilliqa will be not only restored but largely improved in Zilliqa 2.0 with several benefits such as shorter block intervals and faster finality, smart contract support on all shards, cross-shard transactions and many more.


## Conclusion

Desharding will significantly improve the performance of the Zilliqa network by reducing the block time by up to 50%. At the same time, it will save substantial costs in the area of mining as well as node operation. Last but not least, it will create a fairer opportunity to earn rewards regardless of where miners operate their nodes, without discouraging nodes to supply signatures as fast as they can to ensure a smooth operation of the pBFT consensus.


## References

1. [https://eth2book.info/capella/part2/incentives/rewards/](https://eth2book.info/capella/part2/incentives/rewards/) 

## Copyright Waiver

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
