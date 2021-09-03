// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract BreedingScience {
    ///// Simply a boolean to indicate this is the contract we expect to be (why? idk, just saw cryptokitty do this: https://gist.github.com/arpit/071e54b95a81d13cb29681407680794f)
    function isBreedingScience() external pure returns (bool) {
        return true;
    }

    /// @notice a function to calculate breeding of 2 penguun
    /// @param dna1 dna of father
    /// @param dna2 dna of mother
    /// @param expAvg (papa.exp + mama.exp) / 2
    function mixDNAs(
        uint256 dna1,
        uint256 dna2,
        uint256 expAvg
    ) external returns (uint256) {
        //TODO: mix DNA logic here
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
    function randomGender() external view returns (uint8) {
        //TODO: This method can be exploited by miners. Use oracle to generate random data in
        return
            uint8(
                uint256(
                    keccak256(abi.encodePacked(block.timestamp, msg.sender))
                ) % 3
            );
    }
}
