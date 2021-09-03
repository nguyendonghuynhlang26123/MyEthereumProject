// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FlappyBird is ERC721Enumerable {
    constructor() ERC721("FlappyBirdNFT", "FPB") {}

    function mint(uint256 _value) public {
        _mint(msg.sender, _value);
    }

    function getBirds() public view returns (uint256[] memory) {
        uint256 len = balanceOf(msg.sender);
        uint256[] memory result = new uint256[](len);
        for (uint256 i = 0; i < len; i++)
            result[i] = tokenOfOwnerByIndex(msg.sender, i);
        return result;
    }
}
