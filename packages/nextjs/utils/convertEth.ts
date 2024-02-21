// Function to convert Ether to Wei
export const ethToWei = (eth: string): bigint => {
  const weiString = (parseFloat(eth) * 1e18).toString();
  return BigInt(weiString);
};

// Function to convert Wei to Ether
export const weiToEth = (wei: bigint): string => {
  return (parseFloat(wei.toString()) / 1e18).toString();
};
