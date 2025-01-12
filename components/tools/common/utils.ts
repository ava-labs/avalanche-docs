import { AllowlistPrecompileConfig, AddressEntry, Role } from '@/components/tools/common/allowlist-precompile-configurator/types'

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const isAllowlistPrecompileConfigValid = (config: AllowlistPrecompileConfig): boolean => {
  if (!config.activated) return true;

  const hasErrors = (entries: AddressEntry[]): boolean =>
    entries.some(entry => entry.error !== undefined);

  return !Object.values(config.addresses).some(entries => hasErrors(entries as AddressEntry[]));
}

export const addressEntryArrayToAddressArray = (entries: AddressEntry[]): string[] => {
  return entries.map(entry => entry.address);
}