import { AbiItem } from 'web3-utils';
export const marketAddress = '0xc26966d39f2169a50a76E29188154f26d50ec529';

export const marketAbi = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'itemId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'seller',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      },
    ],
    'name': 'MarketItemCreated',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'itemId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'seller',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'buyer',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'price',
        'type': 'uint256',
      },
    ],
    'name': 'MarketItemSold',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'OwnershipTransferred',
    'type': 'event',
  },
  {
    'inputs': [],
    'name': 'marketFeeInPercent',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'maxPrice',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'minPrice',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'ownable_init',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address',
      },
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_nftContract',
        'type': 'address',
      },
    ],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_fee',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_minPrice',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_maxPrice',
        'type': 'uint256',
      },
    ],
    'name': 'setVariables',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_tokenId',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '_price',
        'type': 'uint256',
      },
    ],
    'name': 'createMarketItem',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_price',
        'type': 'uint256',
      },
    ],
    'name': 'priceAfterFee',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'getMarketItem',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'itemId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'tokenId',
            'type': 'uint256',
          },
          {
            'internalType': 'address payable',
            'name': 'seller',
            'type': 'address',
          },
          {
            'internalType': 'address payable',
            'name': 'buyer',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'price',
            'type': 'uint256',
          },
          {
            'internalType': 'enum Marketplace.ItemStatus',
            'name': 'status',
            'type': 'uint8',
          },
        ],
        'internalType': 'struct Marketplace.MarketItem',
        'name': '',
        'type': 'tuple',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_itemId',
        'type': 'uint256',
      },
    ],
    'name': 'buyMarketItem',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_itemId',
        'type': 'uint256',
      },
    ],
    'name': 'cancelMarketItemSale',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true,
  },
  {
    'inputs': [],
    'name': 'fetchItems',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'itemId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'tokenId',
            'type': 'uint256',
          },
          {
            'internalType': 'address payable',
            'name': 'seller',
            'type': 'address',
          },
          {
            'internalType': 'address payable',
            'name': 'buyer',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'price',
            'type': 'uint256',
          },
          {
            'internalType': 'enum Marketplace.ItemStatus',
            'name': 'status',
            'type': 'uint8',
          },
        ],
        'internalType': 'struct Marketplace.MarketItem[]',
        'name': 'result',
        'type': 'tuple[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'fetchMySellingPenguuns',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'itemId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'tokenId',
            'type': 'uint256',
          },
          {
            'internalType': 'address payable',
            'name': 'seller',
            'type': 'address',
          },
          {
            'internalType': 'address payable',
            'name': 'buyer',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'price',
            'type': 'uint256',
          },
          {
            'internalType': 'enum Marketplace.ItemStatus',
            'name': 'status',
            'type': 'uint8',
          },
        ],
        'internalType': 'struct Marketplace.MarketItem[]',
        'name': 'result',
        'type': 'tuple[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'fetchPurchasedPenguuns',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'itemId',
            'type': 'uint256',
          },
          {
            'internalType': 'uint256',
            'name': 'tokenId',
            'type': 'uint256',
          },
          {
            'internalType': 'address payable',
            'name': 'seller',
            'type': 'address',
          },
          {
            'internalType': 'address payable',
            'name': 'buyer',
            'type': 'address',
          },
          {
            'internalType': 'uint256',
            'name': 'price',
            'type': 'uint256',
          },
          {
            'internalType': 'enum Marketplace.ItemStatus',
            'name': 'status',
            'type': 'uint8',
          },
        ],
        'internalType': 'struct Marketplace.MarketItem[]',
        'name': 'result',
        'type': 'tuple[]',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
];
