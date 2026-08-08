import deployment from "../../deployment.json";

export const currentContractSourceHash = "5a1518583c59b33f07a8f15dddcd700fe1c5e73fd0c5122504be4c4eca57c7a4";
export const deploymentMatchesSource = deployment.sourceHash === currentContractSourceHash;
export const contractAddress = (deploymentMatchesSource ? deployment.contractAddress : "") as `0x${string}` | "";
export const contractExplorerUrl = contractAddress ? `${deployment.explorerBaseUrl}/address/${contractAddress}` : deployment.explorerBaseUrl;
