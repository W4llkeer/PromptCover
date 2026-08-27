export const currentContractSourceHash = "76e106cf7c20a787d07dd3537fab2a1cfef6eb6c3013594a54855b0e738fc0b6";
const deployedSourceHash = "76e106cf7c20a787d07dd3537fab2a1cfef6eb6c3013594a54855b0e738fc0b6";
const explorerBaseUrl = "https://explorer-studio.genlayer.com";

export const deploymentMatchesSource = deployedSourceHash === currentContractSourceHash;
export const contractAddress = "0xa01599559B1E3a0498205706197624D110E06407" as `0x${string}`;
export const contractExplorerUrl = `${explorerBaseUrl}/address/${contractAddress}`;
