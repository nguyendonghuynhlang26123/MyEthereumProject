import { AbiItem } from 'web3-utils';
export const faucetAddress = '0x532F646B0cF4BDB82e034F50bA45fb026392E2aa';

export const faucetAbi: AbiItem[] = [
  {
    'anonymous': false,
    'inputs': [
      { 'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address' },
      { 'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' },
    ],
    'name': 'Deposit',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      { 'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address' },
      { 'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256' },
    ],
    'name': 'Withdrawal',
    'type': 'event',
  },
  { 'inputs': [], 'name': 'destroy', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function' },
  {
    'inputs': [{ 'internalType': 'uint256', 'name': 'withdraw_amount', 'type': 'uint256' }],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];
