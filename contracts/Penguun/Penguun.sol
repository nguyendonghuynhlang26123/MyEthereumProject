// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PenguunBreeding.sol";

contract Penguun is PenguunBreeding {
    address marketplaceContract;

    function initialize(address _address, address _owner)
        public
        override
        initializer
    {
        super.initialize(_address, _owner);

        //Test mode
        debugMode = true; // TEST ONLY, allow to breed easily

        //LIMITER
        breedCountLimit = 64; /// TODO: Should we add limit to number of breeds ?
        expLimit = 10_000_000; // Maximum exp a penguun can gain
        expPerBreedCount = 1000; // Maximum exp a penguun can gain
        defaultReadyTime = 1 seconds;
    }

    // constructor() {
    //     initialize(address(0xd9145CCE52D386f254917e481eB44e9943F39138), address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4));
    // }

    function setTestMode(bool value) public onlyOwner {
        debugMode = value;
    }

    function setVariables(
        uint8 _breedLim,
        uint64 _expLim,
        uint64 _expGain,
        uint256 _defReadyTime
    ) public onlyOwner {
        //LIMITER
        breedCountLimit = _breedLim;
        expLimit = _expLim; // Maximum exp a penguun can gain
        expPerBreedCount = _expGain; // Maximum exp a penguun can gain
        defaultReadyTime = _defReadyTime; // When will a baby able to breed
    }

    function setMarketplaceContract(address _address) public onlyOwner {
        setApprovalForAll(marketplaceContract, false); //Set previous contract to false

        marketplaceContract = _address;
        setApprovalForAll(marketplaceContract, true);
    }
}
