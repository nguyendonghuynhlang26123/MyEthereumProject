// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "../dependencies/IERC721.sol";
import "../dependencies/ReentrancyGuard.sol";
import "../dependencies/Ownable.sol";
import "../dependencies/Initializable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    enum ItemStatus {
        SOLD,
        ON_MARKET,
        CANCELED
    }

    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        address payable seller;
        address payable buyer; //0 means is selling
        uint256 price;
        ItemStatus status;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _sequence;
    Counters.Counter private _itemsSold;

    IERC721 penguunContract;

    // Mapping from (0 -> 10000) to (0.00% -> 100.00%)
    uint256 public marketFeeInPercent;
    //Limit price that can buy and sell (in wei)
    uint256 public minPrice;
    uint256 public maxPrice;

    mapping(uint256 => MarketItem) idToMarketItem;
    mapping(uint256 => MarketItem) tokenToMarketItem;

    //Events
    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event MarketItemSold(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    function initialize(address _nftContract) public initializer {
        ownable_init();
        reentrancyGuard_init();
        penguunContract = IERC721(_nftContract);

        marketFeeInPercent = 100; // 0.1 % fee
        minPrice = 10000000000000000 wei; //0.01 ether;
        maxPrice = 99999999 ether;
    }

    function setVariables(
        uint256 _fee,
        uint256 _minPrice,
        uint256 _maxPrice
    ) public onlyOwner {
        marketFeeInPercent = _fee; // 0.1 % fee
        minPrice = _minPrice; //0.01 ether;
        maxPrice = _maxPrice;
    }

    function _autoIndex() internal returns (uint256) {
        _sequence.increment(); //Start with id = 1
        return _sequence.current();
    }

    /// @notice A function to put sender nft on the market for sale. This function will hold the token in escrow
    /// @dev Penguun contract must setApprovalForAll(marketplace.address) for this function to work
    function createMarketItem(uint256 _tokenId, uint256 _price)
        public
        payable
        nonReentrant
    {
        MarketItem storage item = tokenToMarketItem[_tokenId];
        require(_price >= minPrice, "Price too low");
        require(_price <= maxPrice, "Price too high");
        require(
            item.tokenId == 0 || item.status == ItemStatus.ON_MARKET,
            "This token is being sold on market"
        );

        //Auto index to get new Id
        uint256 itemId = _autoIndex();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            _tokenId,
            payable(msg.sender),
            payable(address(0)),
            _price,
            ItemStatus.ON_MARKET
        );
        tokenToMarketItem[_tokenId] = idToMarketItem[itemId];

        penguunContract.transferFrom(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(itemId, _tokenId, msg.sender, _price);
    }

    /// @notice price after computing fee
    function priceAfterFee(uint256 _price) public view returns (uint256) {
        return _price - (_price * marketFeeInPercent) / 10000;
    }

    function getMarketItem(uint256 tokenId)
        public
        view
        returns (MarketItem memory)
    {
        return tokenToMarketItem[tokenId];
    }

    /// @notice A function to handle buying function. It will take the necessary price, calculate fee, and then transfer the token
    function buyMarketItem(uint256 _itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[_itemId];
        require(
            item.status == ItemStatus.ON_MARKET,
            "This item is not for sale!"
        );
        require(msg.value == item.price, "Insufficient money");

        //Only transfer compromise price and keep fee in contract's balance
        uint256 compromisePrice = priceAfterFee(item.price);
        item.seller.transfer(compromisePrice);

        //Transfer token. Note that this function required the ERC721 implementation has call setApprovalForAll() to this contract
        // For testing we can set approve here
        penguunContract.approve(msg.sender, item.tokenId);
        penguunContract.transferFrom(address(this), msg.sender, item.tokenId);

        item.buyer = payable(msg.sender);
        item.status = ItemStatus.SOLD;

        _itemsSold.increment();
    }

    /// @notice A function to cancel selling an item on the marketplace
    function cancelMarketItemSale(uint256 _itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[_itemId];
        require(
            item.status == ItemStatus.ON_MARKET,
            "Can cancel a selling item only"
        );
        item.status = ItemStatus.CANCELED;
    }

    /// @notice fetch all items from the marketplace in order to display to Frontend.
    function fetchItems() external view returns (MarketItem[] memory result) {
        uint256 itemCount = _sequence.current();
        uint256 unsoldItemCount = itemCount - _itemsSold.current();
        uint256 counter = 0;

        result = new MarketItem[](unsoldItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (idToMarketItem[i].buyer == address(0)) {
                result[counter] = idToMarketItem[i];
                counter += 1;
            }
        }
    }

    /// @notice fetch all items that this sender PUT ON the marketplace including SELLING / SOLD / CANCELED items.
    function fetchMySellingPenguuns()
        external
        view
        returns (MarketItem[] memory result)
    {
        uint256 latestId = _sequence.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Loop through all items to count the number (inorder to declare a memory array)
        // This may be expensive. TODO: Look for another way
        for (uint256 i = 1; i <= latestId; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // Loop through all items to add to result
        // This may be expensive. TODO: Look for another way
        result = new MarketItem[](itemCount);
        for (uint256 i = 1; i <= latestId; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                result[currentIndex] = idToMarketItem[i];
                currentIndex += 1;
            }
        }
    }

    /// @notice fetch all items that this sender BOUGHT ON the marketplace.
    function fetchPurchasedPenguuns()
        external
        view
        returns (MarketItem[] memory result)
    {
        uint256 latestId = _sequence.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Loop through all items to count the number (inorder to declare a memory array)
        // This may be expensive. TODO: Look for another way
        for (uint256 i = 1; i <= latestId; i++) {
            if (idToMarketItem[i].buyer == msg.sender) {
                itemCount += 1;
            }
        }

        // Loop through all items to add to result
        // This may be expensive. TODO: Look for another way
        result = new MarketItem[](itemCount);
        for (uint256 i = 1; i <= latestId; i++) {
            if (idToMarketItem[i].buyer == msg.sender) {
                result[currentIndex] = idToMarketItem[i];
                currentIndex += 1;
            }
        }
    }
}
