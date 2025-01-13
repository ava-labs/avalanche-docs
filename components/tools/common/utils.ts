import { AllowlistPrecompileConfig, AddressEntry, Role } from '@/components/tools/common/allowlist-precompile-configurator/types'

export const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

const hasErrors = (entries: AddressEntry[]): boolean =>
  entries.some(entry => entry.error !== undefined);

export const isAllowlistPrecompileConfigValid = (config: AllowlistPrecompileConfig): boolean => {
  if (!config.activated) return true;

  //check if at least one role has a valid address that is not required
  if (
    config.addresses.Admin.filter(entry => !entry.requiredReason && !entry.error).length === 0
    && config.addresses.Manager.filter(entry => !entry.requiredReason && !entry.error).length === 0
    && config.addresses.Enabled.filter(entry => !entry.requiredReason && !entry.error).length === 0
  ) return false;

  return !Object.values(config.addresses).some(entries => hasErrors(entries as AddressEntry[]));
}

export const addressEntryArrayToAddressArray = (entries: AddressEntry[]): string[] => {
  return entries.map(entry => entry.address);
}