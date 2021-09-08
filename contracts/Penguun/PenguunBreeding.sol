// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PenguunCore.sol";
import "../dependencies/Ownable.sol";

//In production, we should hide the implementation of this contract.
interface BreedingScienceInterface {
    // Simply a boolean to indicate this is the contract we expect to be (why? idk, just saw cryptokitty do this: https://gist.github.com/arpit/071e54b95a81d13cb29681407680794f)
    function isBreedingScience() external returns (bool);

    /// @notice a function to calculate breeding of 2 penguun
    /// @param dna1 dna of father
    /// @param dna2 dna of mother
    /// @param expAvg (papa.exp + mama.exp) / 2
    function mixDNAs(
        uint256 dna1,
        uint256 dna2,
        uint256 expAvg
    ) external returns (uint256);

    /// @notice a function to calculate the ready time for another breeding
    function breedingTime(uint64 breedCount) external pure returns (uint256);

    /// @notice a function to calculate when the penguun egg will hatch
    /// @param parentBreedingCountAvg (papa.breedingCount + mama.breedingCount) / 2
    /// @return the product egg hatching time
    function hatchingTime(uint64 parentBreedingCountAvg)
        external
        pure
        returns (uint256);

    /// @notice generate random number from 0 -> 2 stands for { FEMALE, MALE, BISEX }
    function randomGender() external returns (uint8);
}

/// @dev A contract that handle breeding logics
contract PenguunBreeding is PenguunCore, Ownable {
    BreedingScienceInterface public breedingScience;

    event BreedingEvent(
        uint256 indexed papaId,
        uint256 indexed mamaId,
        uint256 indexed penguunId
    );

    /// @dev Update the address of the genetic contract, can only be called by the owner
    /// @param _address An address of a BreedingScience contract instance to be used from this point forward.
    function setBreedingScienceAddress(address _address) external onlyOwner {
        BreedingScienceInterface candidateContract = BreedingScienceInterface(
            _address
        );

        // NOTE: verify that a contract is what we expect - https://github.com/Lunyr/crowdsale-contracts/blob/cfadd15986c30521d8ba7d5b6f57b4fefcc7ac38/contracts/LunyrToken.sol#L117
        require(candidateContract.isBreedingScience());

        // Set the new contract address
        breedingScience = candidateContract;
    }

    /// @notice initialize function for upgradable contract
    function initialize(address _address, address _owner)
        public
        virtual
        initializer
    {
        //Since openzeppelin upgradable proxy won't allow constructor
        super.ownable_init();
        super.erc721_initialize("Penguun the penguin", "PENGUUN");
        breedingScience = BreedingScienceInterface(_address);

        penguuns.push(Penguun(0, 0, 0, 0, 0, 0, 0, 0, "", PenguunGender.BISEX)); //Void penguun

        //Ancestors: 10 legendary penguuns
        _createPenguun(
            909190909090909090,
            0,
            0,
            0,
            "ELIZABETH",
            PenguunGender.BISEX,
            _owner
        );
        _createPenguun(
            781172020206777775,
            0,
            0,
            0,
            "Sena",
            PenguunGender.FEMALE,
            _owner
        );
        _createPenguun(
            700245474007440747,
            0,
            0,
            0,
            "Ginger",
            PenguunGender.MALE,
            _owner
        );
        _createPenguun(
            24043130101170350,
            0,
            0,
            0,
            "Stella",
            PenguunGender.FEMALE,
            _owner
        );
        _createPenguun(
            37006124005457571,
            0,
            0,
            0,
            "Rebecca",
            PenguunGender.FEMALE,
            msg.sender
        );
        _createPenguun(
            774005067103030644,
            0,
            0,
            0,
            "Ali",
            PenguunGender.MALE,
            msg.sender
        );
        _createPenguun(
            44040700173764047,
            0,
            0,
            0,
            "ELEL",
            PenguunGender.BISEX,
            msg.sender
        );
        _createPenguun(
            527071734270444704,
            0,
            0,
            0,
            "Rolli",
            PenguunGender.MALE,
            msg.sender
        );
        _createPenguun(
            520672720072164140,
            0,
            0,
            0,
            "Kara",
            PenguunGender.FEMALE,
            msg.sender
        );
        _createPenguun(
            710773064204431348,
            0,
            0,
            0,
            "Arche",
            PenguunGender.FEMALE,
            msg.sender
        );
    }

    /// @notice Checks that the given penguun egg is hatched
    function isHatched(uint256 _penguunId) public view returns (bool) {
        require(_penguunId > 0);
        Penguun storage penguun = penguuns[_penguunId];

        return penguun.hatchedAt >= block.timestamp;
    }

    function isReadyToBreed(uint256 _penguunId) public view returns (bool) {
        Penguun storage penguun = penguuns[_penguunId];

        return
            penguun.breedCount < breedCountLimit &&
            block.timestamp >= penguun.nextBreedTime;
    }

    /// @notice Checks that given penguuns can be a mating pair
    function _isValidMatingPair(
        Penguun storage _male,
        uint64 _maleId,
        Penguun storage _female,
        uint64 _femaleId
    ) private view returns (bool) {
        // A Penguun can't breed with itself!
        if (_maleId == _femaleId) return false;

        // Penguuns can't breed with their parents.
        if (_male.papaId == _femaleId || _female.papaId == _femaleId)
            return false;

        if (_male.mamaId == _femaleId || _female.mamaId == _femaleId)
            return false;

        // We can short circuit the sibling check (below) if either cat is
        // gen zero (has a matron ID of zero).
        if (_male.papaId == 0 || _female.papaId == 0) return true;

        // Penguun can't breed with siblings.
        if (_male.papaId == _female.papaId || _female.mamaId == _female.mamaId)
            return false;

        // 2 bisexual penguun can mate
        if (
            _male.gender == PenguunGender.BISEX &&
            _male.gender == PenguunGender.BISEX
        ) return true;
        // Penguun can only breed with other sex
        return (_male.gender != _female.gender);
    }

    /// @notice Checks to see if two penguuns can breed together
    function canBreedWith(uint64 _maleId, uint64 _femaleId)
        public
        view
        returns (bool)
    {
        require(_maleId != _femaleId);
        require(_isValidId(_maleId) && _isValidId(_femaleId), "Invalid id");
        if (debugMode) return true;

        Penguun storage male = penguuns[_maleId];
        Penguun storage female = penguuns[_femaleId];
        return
            isReadyToBreed(_maleId) &&
            isReadyToBreed(_femaleId) &&
            _isValidMatingPair(male, _maleId, female, _femaleId);
    }

    /// @dev ultils function to trigger parent breeding cooldowns
    function _triggerCooldown(Penguun storage _penguun) internal {
        _penguun.nextBreedTime =
            block.timestamp +
            breedingScience.breedingTime(_penguun.breedCount);
    }

    /// @dev ultils function to trigger egg hatching time
    function _triggerHatchingTime(
        Penguun storage _penguunDad,
        Penguun storage _penguunMom,
        Penguun storage _penguun
    ) internal {
        uint64 breedCountAvg = (_penguunDad.breedCount +
            _penguunMom.breedCount) / 2;
        _penguun.hatchedAt =
            block.timestamp +
            breedingScience.hatchingTime(breedCountAvg);
    }

    /// @dev Internal utility function to initiate breeding, assumes that all breeding
    ///  requirements have been checked.
    function _breedWith(
        uint64 _maleId,
        uint64 _femaleId,
        bytes32 _childName,
        address _owner
    ) internal {
        // Grab references to the Penguuns from storage.
        Penguun storage papa = penguuns[_maleId];
        Penguun storage mama = penguuns[_femaleId];

        uint64 breedCountSum = papa.breedCount + mama.breedCount;

        // A new penguun born
        uint256 newDna = breedingScience.mixDNAs(
            papa.dna,
            mama.dna,
            breedCountSum / 2
        );
        uint256 generation = (
            papa.generation > mama.generation
                ? papa.generation
                : mama.generation
        ) + 1;
        PenguunGender gender = PenguunGender(breedingScience.randomGender());
        uint256 penguunId = _createPenguun(
            newDna,
            generation,
            _maleId,
            _femaleId,
            _childName,
            gender,
            _owner
        );

        // Trigger the breeding cooldown for both parents.
        _triggerCooldown(papa);
        _triggerCooldown(mama);
        // Increase exp
        mama.exp += expPerBreedCount * breedCountSum;
        papa.exp += expPerBreedCount * breedCountSum;
        // Increase breed count
        papa.breedCount++;
        mama.breedCount++;

        emit BreedingEvent(_maleId, _femaleId, penguunId);
    }

    /// @notice  Breed a Penguun with 2 penguun you owned
    function breedWithAuto(
        uint64 _maleId,
        uint64 _femaleId,
        bytes32 _childName
    ) external payable onlyTokenOwner(_maleId) onlyTokenOwner(_femaleId) {
        uint256 fee = 2000000000000000 wei;
        require(msg.value >= fee, "Insufficient fee value");

        //Sanity check tokens
        require(canBreedWith(_maleId, _femaleId), "Inappropriate pair");

        //Sanity check ERC20 token <- TODO: use ERC token as fee to breed instead!
        _breedWith(_maleId, _femaleId, _childName, _msgSender());
    }
}
