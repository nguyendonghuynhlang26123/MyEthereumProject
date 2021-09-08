// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "../dependencies/ERC721Full.sol";

contract PenguunCore is ERC721Enumerable {
    enum PenguunGender {
        MALE,
        FEMALE,
        BISEX
    }
    struct Penguun {
        uint256 dna;  
        uint256 generation;
        uint256 hatchedAt;
        uint256 nextBreedTime;
        uint64 papaId;
        uint64 mamaId;
        uint64 breedCount;
        uint64 exp;
        bytes32 name;
        PenguunGender gender;
    }
    Penguun[] penguuns;
    uint256 defaultReadyTime;

    bool debugMode; // TEST ONLY, allow to breed easily

    //LIMITER
    uint64 breedCountLimit; /// TODO: Should we add limit to number of breeds ?
    uint64 expLimit; // Maximum exp a penguun can gain
    uint64 expPerBreedCount; // Maximum exp a penguun can gain

    event PenguunSpawned(
        uint256 indexed penguunId,
        uint64 papaId,
        uint64 mamaId,
        address indexed owner,
        uint256 dna
    );

    modifier onlyTokenOwner(uint64 _penguunId) {
        require(_isValidId(_penguunId));
        require(ownerOf(_penguunId) == msg.sender);
        _;
    }

    function getMyPenguunIds() external view returns (uint256[] memory result) {
        uint256 len = balanceOf(msg.sender);
        result = new uint256[](len);
        for (uint256 i = 0; i < len; i++) {
            result[i] = tokenOfOwnerByIndex(msg.sender, i);
        }
    }

    function getPenguun(uint256 _penguunId)
        external
        view
        returns (
            uint256 dna,
            uint256 generation,
            uint256 hatchedAt,
            uint64 papaId,
            uint64 mamaId,
            uint64 breedCount,
            uint64 exp,
            uint256 nextBreedTime,
            bytes32 name,
            PenguunGender gender
        )
    {
        Penguun storage penguun = penguuns[_penguunId];
        dna = penguun.dna;
        generation = penguun.generation;
        hatchedAt = penguun.hatchedAt;
        papaId = penguun.papaId;
        mamaId = penguun.mamaId;
        breedCount = penguun.breedCount;
        exp = penguun.exp;
        nextBreedTime = penguun.nextBreedTime;
        name = penguun.name;
        gender = penguun.gender;
    }

    /// @notice create a penguun using given argument
    /// @return penguunId return penguun id
    function _createPenguun(
        uint256 _dna,
        uint256 _generation,
        uint64 _papaId,
        uint64 _mamaId,
        bytes32 _name,
        PenguunGender _gender,
        address _owner
    ) internal returns (uint256 penguunId) {
        Penguun memory penguun = Penguun({
            dna: _dna,
            generation: _generation,
            papaId: _papaId,
            mamaId: _mamaId,
            hatchedAt: block.timestamp,
            breedCount: 0,
            nextBreedTime: block.timestamp + defaultReadyTime,
            name: _name,
            gender: _gender,
            exp: 0
        });
        penguunId = penguuns.length;
        penguuns.push(penguun);
        _mint(_owner, penguunId);
        emit PenguunSpawned(penguunId, _papaId, _mamaId, _owner, _dna);
    }

    function _isValidId(uint256 _penguunId) internal view returns (bool) {
        return _penguunId > 0 && _penguunId < penguuns.length; // Out-of-bound check
    }

    /// @notice A function to change penguun name
    function changePenguunName(uint64 _penguunId, bytes32 _name)
        external
        onlyTokenOwner(_penguunId)
    {
        Penguun storage penguun = penguuns[_penguunId];
        require(
            keccak256(abi.encodePacked(_name)) !=
                keccak256(abi.encodePacked(penguun.name))
        );
        penguun.name = _name;
    }
}
