// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "../dependencies/Ownable.sol";
import "../dependencies/Initializable.sol";

contract BreedingScience is Initializable, Ownable {
    uint8 mutationPercent;
    uint256 randNonce; // TODO: Replace random function by an oracle

    function initialize(uint8 _mutationPercent) public initializer {
        require(_mutationPercent <= 100 && _mutationPercent >= 0);
        mutationPercent = _mutationPercent;
        randNonce = 0;
    }

    ///// Simply a boolean to indicate this is the contract we expect to be (why? idk, just saw cryptokitty do this: https://gist.github.com/arpit/071e54b95a81d13cb29681407680794f)
    function isBreedingScience() external pure returns (bool) {
        return true;
    }

    /// @notice a function to calculate the ready time for another breeding
    /// @param breedCount penguun breed count
    function breedingTime(uint64 breedCount) external pure returns (uint256) {
        return breedCount * (1 seconds);
    }

    /// @notice a function to calculate when the penguun egg will hatch
    /// @param parentBreedingCountAvg (papa.breedingCount + mama.breedingCount) / 2
    /// @return the product egg hatching time
    function hatchingTime(uint64 parentBreedingCountAvg)
        external
        pure
        returns (uint256)
    {
        return parentBreedingCountAvg * (1 seconds);
    }

    /// @notice generate random number from 0 -> 2 stands for { FEMALE, MALE, BISEX }
    function randomGender() external returns (uint8) {
        return uint8(_randomize(3));
    }

    /// @notice an utiltity function to generate random value from 0-> mol - 1
    //TODO: This method can be exploited by miners. Use oracle to generate random data in
    function _randomize(uint256 mol) internal returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % mol;
    }

    /// @notice an ultility function to tick random
    function _randomResult(uint8 probability) internal returns (bool) {
        return _randomize(100) >= uint256(probability);
    }

    /// @notice the following functions are global configuration. An upgradable contract can implement this
    function digitsPerTrait() public pure returns (uint256) {
        return 2;
    }

    function numberOfTraits() public pure returns (uint256) {
        return 9;
    }

    function maxiumDnaLength() public pure returns (uint256) {
        return 9 * 2;
    }

    /// @notice This function is an utility function that help to split dna into parts
    /// @param dna target dna
    function _separateDnaParts(uint256 dna)
        internal
        pure
        returns (uint256[] memory result)
    {
        result = new uint256[](numberOfTraits());
        uint256 i = 0;
        uint256 d = 10**digitsPerTrait();
        uint256 temp = dna;
        while (temp != 0) {
            result[i] = temp % d;
            temp = (temp - result[i]) / d;
            i++;
        }
    }

    /// @notice This function is an utility function that help to join dna parts (array) to an uint result
    /// @param dnaParts dna parts array
    function _partsToDNA(uint256[] memory dnaParts)
        internal
        pure
        returns (uint256 result)
    {
        require(dnaParts.length == numberOfTraits());
        result = 0;
        uint256 d = 10**digitsPerTrait();
        for (uint256 i = 0; i < dnaParts.length; i++) {
            result = result + dnaParts[i] * (d**i);
        }
    }

    /// @notice This function is an utility function that implement "Cross Over" in GA
    /// @param dnaA dna
    /// @param dnaB dna
    function _crossOver(uint256 dnaA, uint256 dnaB)
        internal
        returns (uint256[] memory resultParts)
    {
        bool swapDna = _randomize(100) > 50; //Swap to randomly perform slicing on papa or mama
        uint256[] memory dnaParts1 = _separateDnaParts(swapDna ? dnaB : dnaA);
        uint256[] memory dnaParts2 = _separateDnaParts(swapDna ? dnaA : dnaB);

        uint256 length = numberOfTraits();
        resultParts = new uint256[](length);

        //random slice a part of dnaA
        uint256 randStartIdx = _randomize(length);
        uint256 randEndIdx = _randomize(length - randStartIdx) + randStartIdx;

        for (uint8 i = 0; i < length; i++) {
            if (i >= randStartIdx && i <= randEndIdx)
                resultParts[i] = dnaParts1[i];
            else resultParts[i] = dnaParts2[i];
        }
        return resultParts;
    }

    /// @notice This function is an utility function that implement "Mutation" in GA
    /// @param dnaParts dna elements array
    function _mutate(uint256[] memory dnaParts)
        internal
        returns (uint256[] memory)
    {
        uint256 idx1 = _randomize(numberOfTraits());
        uint256 idx2 = _randomize(numberOfTraits());

        //Swapp
        uint256 temp = dnaParts[idx1];
        dnaParts[idx1] = dnaParts[idx2];
        dnaParts[idx2] = temp;

        return dnaParts;
    }

    /// @notice This function is an utility function that implement "Mutation" in GA
    /// @param dnaPart A SINGLE dna part you want to upgrade its rarity
    /// TODO: Implement an option for player to "evolve" their penguun when the reach a certain amount of exp
    function _upgradeRarity(uint256 dnaPart) internal returns (uint256) {
        if (dnaPart < 40) return (_randomize(30) + 40); // Common -> Rare
        if (dnaPart < 70) return (_randomize(20) + 70); // Rare -> Epic
        if (dnaPart < 90) return (_randomize(10) + 90); // Epic -> Lengendary
        return dnaPart; // Do nothing to Legendary
    }

    /// @notice a function handle rarity mutation.
    /// @param exp the more experience parents, the more rarity penguun they can breed
    /// @param dnaParts penguun son dna array
    function _rarityMutateHandle(uint256[] memory dnaParts, uint256 exp)
        internal
        returns (uint256[] memory)
    {
        uint8 mutateRate;
        if (exp >= 8_000_000) mutateRate = 20;
        else if (exp >= 5_000_000) mutateRate = 12;
        else if (exp >= 2_000_000) mutateRate = 7;
        else if (exp >= 5000) mutateRate = 3;
        else mutateRate = 0;

        for (uint256 i = 0; i < dnaParts.length; i++) {
            //Legendary parts can not be inherited
            dnaParts[i] = dnaParts[i] >= 90
                ? (_randomize(80) + (dnaParts[i] % 90))
                : dnaParts[i];

            //Only upgrade common / rare penguun
            if (dnaParts[i] < 70 && _randomResult(mutateRate)) {
                mutateRate /= 2;
                _upgradeRarity(dnaParts[i]);
            }
        }
        return dnaParts;
    }

    /// @notice a function to calculate breeding of 2 penguun
    /// @dev this function base on genetic algorithm to mix dnas. More info: https://www.geeksforgeeks.org/genetic-algorithms/
    /// @param papaDna dna of father
    /// @param mamaDna dna of mother
    /// @param expAvg (papa.exp + mama.exp) / 2
    function mixDNAs(
        uint256 papaDna,
        uint256 mamaDna,
        uint256 expAvg
    ) external returns (uint256) {
        //Sanity check
        require(papaDna != 0 && papaDna < 10**(maxiumDnaLength() + 1));
        require(mamaDna != 0 && mamaDna < 10**(maxiumDnaLength() + 1));

        // We should skip some first steps of this algorithm since we only want to breed and mix genes
        // Cross-over:
        uint256[] memory resultParts = _crossOver(papaDna, mamaDna);

        // Mutation
        bool canMutate = _randomResult(mutationPercent);
        if (canMutate) {
            resultParts = _mutate(resultParts);
        }
        // More mutation in dna
        resultParts = _rarityMutateHandle(resultParts, expAvg);

        // Join them all and return
        return _partsToDNA(resultParts);
    }
}
