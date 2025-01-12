"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Allowlist from './allowlist'
import { AllowlistPrecompileConfig } from './types'
import { isAllowlistPrecompileConfigValid } from '@/components/tools/common/utils'

interface AllowlistPrecompileConfiguratorProps {
  title: string
  description: string
  precompileAction: string
  config: AllowlistPrecompileConfig
  onUpdateConfig: (newConfig: AllowlistPrecompileConfig) => void
  radioOptionFalseLabel: string
  radioOptionTrueLabel: string
}

export default function AllowlistPrecompileConfigurator({
  title,
  description,
  precompileAction,
  config,
  onUpdateConfig,
  radioOptionFalseLabel,
  radioOptionTrueLabel
}: AllowlistPrecompileConfiguratorProps) {
  const handleUpdateAllowlist = (newAddresses: AllowlistPrecompileConfig['addresses']) => {
    onUpdateConfig({ ...config, addresses: newAddresses })
  }

  const handleActivatedChange = (value: string) => {
    onUpdateConfig({ ...config, activated: value === 'true' })
  }

  const isValid = isAllowlistPrecompileConfigValid(config)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-medium">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <RadioGroup
        defaultValue={config.activated ? 'true' : 'false'}
        onValueChange={handleActivatedChange}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id={`${title}-option-false`} />
          <Label htmlFor={`${title}-option-false`}>{radioOptionFalseLabel}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id={`${title}-option-true`} />
          <Label htmlFor={`${title}-option-true`}>{radioOptionTrueLabel}</Label>
        </div>
      </RadioGroup>

      <div className={`transition-all duration-500 ${config.activated ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
        <Allowlist
          addresses={config.addresses}
          onUpdateAllowlist={handleUpdateAllowlist}
          precompileAction={precompileAction}
        />
      </div>

      {!isValid && (
        <p className="text-red-500">There are errors in the allowlist configuration.</p>
      )}
    </div>
  )
}

