import { AbiItem } from 'web3-utils';
export const penguunAddress = '0x126E296Fb47BB0F3bFbFa2f3368F17e792cB46F8';

export const penguunAbi: AbiItem[] = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'approved',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'Approval',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool',
      },
    ],
    'name': 'ApprovalForAll',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'papaId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'mamaId',
        'type': 'uint256',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'penguunId',
        'type': 'uint256',
      },
    ],
    'name': 'BreedingEvent',
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
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'penguunId',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'papaId',
        'type': 'uint64',
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'mamaId',
        'type': 'uint64',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'dna',
        'type': 'uint256',
      },
    ],
    'name': 'PenguunSpawned',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'Transfer',
    'type': 'event',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'approve',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
    ],
    'name': 'balanceOf',
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
        'internalType': 'uint64',
        'name': '_maleId',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': '_femaleId',
        'type': 'uint64',
      },
      {
        'internalType': 'bytes32',
        'name': '_childName',
        'type': 'bytes32',
      },
    ],
    'name': 'breedWithAuto',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true,
  },
  {
    'inputs': [],
    'name': 'breedingScience',
    'outputs': [
      {
        'internalType': 'contract BreedingScienceInterface',
        'name': '',
        'type': 'address',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': '_maleId',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': '_femaleId',
        'type': 'uint64',
      },
    ],
    'name': 'canBreedWith',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': '_penguunId',
        'type': 'uint64',
      },
      {
        'internalType': 'bytes32',
        'name': '_name',
        'type': 'bytes32',
      },
    ],
    'name': 'changePenguunName',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'name_',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'symbol_',
        'type': 'string',
      },
    ],
    'name': 'erc721_initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'getApproved',
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
    'name': 'getMyPenguunIds',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': 'result',
        'type': 'uint256[]',
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
        'name': '_penguunId',
        'type': 'uint256',
      },
    ],
    'name': 'getPenguun',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'dna',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'generation',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': 'hatchedAt',
        'type': 'uint256',
      },
      {
        'internalType': 'uint64',
        'name': 'papaId',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'mamaId',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'breedCount',
        'type': 'uint64',
      },
      {
        'internalType': 'uint64',
        'name': 'exp',
        'type': 'uint64',
      },
      {
        'internalType': 'uint256',
        'name': 'nextBreedTime',
        'type': 'uint256',
      },
      {
        'internalType': 'bytes32',
        'name': 'name',
        'type': 'bytes32',
      },
      {
        'internalType': 'enum PenguunCore.PenguunGender',
        'name': 'gender',
        'type': 'uint8',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
    ],
    'name': 'isApprovedForAll',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
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
        'name': '_penguunId',
        'type': 'uint256',
      },
    ],
    'name': 'isHatched',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
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
        'name': '_penguunId',
        'type': 'uint256',
      },
    ],
    'name': 'isReadyToBreed',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
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
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'ownerOf',
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
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
      {
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes',
      },
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address',
      },
      {
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool',
      },
    ],
    'name': 'setApprovalForAll',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_address',
        'type': 'address',
      },
    ],
    'name': 'setBreedingScienceAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'bytes4',
        'name': 'interfaceId',
        'type': 'bytes4',
      },
    ],
    'name': 'supportsInterface',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
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
        'name': 'index',
        'type': 'uint256',
      },
    ],
    'name': 'tokenByIndex',
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
        'internalType': 'address',
        'name': 'owner',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256',
      },
    ],
    'name': 'tokenOfOwnerByIndex',
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
    'name': 'tokenURI',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true,
  },
  {
    'inputs': [],
    'name': 'totalSupply',
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
        'internalType': 'address',
        'name': 'from',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address',
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256',
      },
    ],
    'name': 'transferFrom',
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
        'name': '_address',
        'type': 'address',
      },
      {
        'internalType': 'address',
        'name': '_owner',
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
        'internalType': 'bool',
        'name': 'value',
        'type': 'bool',
      },
    ],
    'name': 'setTestMode',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];
