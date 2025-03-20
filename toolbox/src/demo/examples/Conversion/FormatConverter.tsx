"use client";

import { useState, useCallback } from "react";
import { Button, Input } from "../../ui";
import { utils } from "@avalabs/avalanchejs";
import { Copy, Check } from "lucide-react";

// Utility functions for conversions
const hexToBytes = (hex: string): Uint8Array => {
  // Remove 0x prefix if present
  hex = hex.startsWith("0x") ? hex.slice(2) : hex;
  // Ensure even length
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
};

const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
};

const cleanHexString = (hex: string): string => {
  // Remove non-hex characters but preserve 0x prefix if present
  const hasPrefix = hex.startsWith("0x");
  const cleaned = hex.replace(/^0x/, "").replace(/[^0-9a-fA-F]/g, "");
  return hasPrefix ? "0x" + cleaned : cleaned;
};

// Add a new formatHexString function that adds spaces between bytes
const formatHexString = (hex: string): string => {
  // First clean the hex string
  let cleanedHex = cleanHexString(hex);
  
  // Check if there's a 0x prefix and handle it
  const hasPrefix = cleanedHex.startsWith("0x");
  if (hasPrefix) {
    cleanedHex = cleanedHex.slice(2);
  }
  
  // Insert a space after every 2 characters (1 byte)
  let formattedHex = "";
  for (let i = 0; i < cleanedHex.length; i += 2) {
    formattedHex += cleanedHex.slice(i, i + 2) + " ";
  }
  
  // Trim the trailing space and add the prefix if needed
  formattedHex = formattedHex.trim();
  return hasPrefix ? "0x " + formattedHex : formattedHex;
};

// Convert hex to CB58
const hexToCB58 = (hex: string): string => {
  try {
    // First validate it's a valid hex string
    const cleanedHex = cleanHexString(hex);
    if (cleanedHex.length === 0) {
      throw new Error("Empty hex string");
    }
    
    // Ensure it's a valid hex string (should only contain hex characters)
    if (!/^[0-9a-fA-F]+$/.test(cleanedHex)) {
      throw new Error("Invalid hex string: contains non-hex characters");
    }
    
    // Ensure it has an even length (2 hex chars = 1 byte)
    if (cleanedHex.length % 2 !== 0) {
      throw new Error("Invalid hex string: length must be even");
    }
    
    const bytes = hexToBytes(cleanedHex);
    return utils.base58check.encode(bytes);
  } catch (error) {
    throw error instanceof Error ? error : new Error("Invalid hex string");
  }
};

// Convert CB58 to hex
const cb58ToHex = (cb58: string): string => {
  try {
    if (!cb58 || cb58.trim() === "") {
      throw new Error("Empty CB58 string");
    }
    
    const bytes = utils.base58check.decode(cb58);
    return bytesToHex(bytes);
  } catch (error) {
    throw error instanceof Error ? error : new Error("Invalid CB58 string");
  }
};

// For CB58 to hex with checksum, we add 0x prefix and preserve the checksum
//instead of using utils.base58check.decode() which removes the checksum, use base58 directly and manually work with the raw bytes
const cb58ToHexWithChecksum = (cb58: string): string => {
  try {
    if (!cb58 || cb58.trim() === "") {
      throw new Error("Empty CB58 string");
    }
    
    // Step 1: Decode from Base58 (without check) to get raw bytes including checksum
    const base58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let value = 0n;
    let base = 1n;
    
    // Decode from right to left
    for (let i = cb58.length - 1; i >= 0; i--) {
      const charIndex = base58Alphabet.indexOf(cb58[i]);
      if (charIndex === -1) {
        throw new Error("Invalid Base58 character");
      }
      value += BigInt(charIndex) * base;
      base *= 58n;
    }
    
    // Convert to bytes
    let valueHex = value.toString(16);
    // Ensure even length
    if (valueHex.length % 2 !== 0) {
      valueHex = "0" + valueHex;
    }
    
    // Account for leading zeros in Base58 encoding
    // Each leading '1' in Base58 represents a leading zero byte
    let leadingZeros = "";
    for (let i = 0; i < cb58.length; i++) {
      if (cb58[i] === '1') {
        leadingZeros += "00";
      } else {
        break;
      }
    }
    
    // The full hex string with 0x prefix
    return "0x" + leadingZeros + valueHex;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Invalid CB58 string");
  }
};

// CopyableSuccess component with clipboard functionality
const CopyableSuccess = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg space-y-2 border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-neutral-700 dark:text-neutral-200 font-semibold">{label}:</p>
          <Check className="h-5 w-5 text-green-500" />
        </div>
        <button 
          onClick={handleCopy} 
          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="text-green-500 text-sm font-medium flex items-center">
              <Check className="h-4 w-4 mr-1" /> Copied!
            </span>
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <div 
        className="bg-white dark:bg-neutral-800 p-3 rounded border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors"
        onClick={handleCopy}
        title="Click to copy"
      >
        <p className="font-mono text-sm break-all dark:text-neutral-200">{value}</p>
      </div>
    </div>
  );
};

export default function FormatConverter() {
  // State for different conversion types
  const [hexToConvert, setHexToConvert] = useState<string>("");
  const [cb58ToConvert, setCb58ToConvert] = useState<string>("");
  const [cb58WithChecksumToConvert, setCb58WithChecksumToConvert] = useState<string>("");
  const [hexToClean, setHexToClean] = useState<string>("");
  const [hexToUnformat, setHexToUnformat] = useState<string>("");
  
  // Results
  const [hexToCb58Result, setHexToCb58Result] = useState<string>("");
  const [cb58ToHexResult, setCb58ToHexResult] = useState<string>("");
  const [cb58ToHexWithChecksumResult, setCb58ToHexWithChecksumResult] = useState<string>("");
  const [cleanHexResult, setCleanHexResult] = useState<string>("");
  const [unformatHexResult, setUnformatHexResult] = useState<string>("");
  
  // Error states
  const [hexToCb58Error, setHexToCb58Error] = useState<string>("");
  const [cb58ToHexError, setCb58ToHexError] = useState<string>("");
  const [cb58ToHexWithChecksumError, setCb58ToHexWithChecksumError] = useState<string>("");

  // Conversion handlers
  const handleHexToCb58Convert = useCallback(() => {
    try {
      setHexToCb58Error("");
      const result = hexToCB58(hexToConvert);
      setHexToCb58Result(result);
    } catch (error) {
      setHexToCb58Error(error instanceof Error ? error.message : "Conversion failed");
      setHexToCb58Result("");
    }
  }, [hexToConvert]);

  const handleCb58ToHexConvert = useCallback(() => {
    try {
      setCb58ToHexError("");
      const result = cb58ToHex(cb58ToConvert);
      setCb58ToHexResult(result);
    } catch (error) {
      setCb58ToHexError(error instanceof Error ? error.message : "Conversion failed");
      setCb58ToHexResult("");
    }
  }, [cb58ToConvert]);

  const handleCb58ToHexWithChecksumConvert = useCallback(() => {
    try {
      setCb58ToHexWithChecksumError("");
      const result = cb58ToHexWithChecksum(cb58WithChecksumToConvert);
      setCb58ToHexWithChecksumResult(result);
    } catch (error) {
      setCb58ToHexWithChecksumError(error instanceof Error ? error.message : "Conversion failed");
      setCb58ToHexWithChecksumResult("");
    }
  }, [cb58WithChecksumToConvert]);

  const handleCleanHex = useCallback(() => {
    // Format the hex string with spaces between bytes
    const result = formatHexString(hexToClean);
    setCleanHexResult(result);
  }, [hexToClean]);

  const handleUnformatHex = useCallback(() => {
    // Remove all whitespace while preserving 0x prefix
    const hasPrefix = hexToUnformat.trim().startsWith("0x");
    const cleaned = hexToUnformat.replace(/\s+/g, "").replace(/^0x/, "");
    const result = hasPrefix ? "0x" + cleaned : cleaned;
    setUnformatHexResult(result);
  }, [hexToUnformat]);

  return (
    <div className="space-y-8">
      {/* Hex to CB58 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Hex to CB58 Encoded</h2>
        <Input
          label="Hex"
          value={hexToConvert}
          onChange={setHexToConvert}
          placeholder="Enter hex value (must be even length)"
          error={hexToCb58Error ? "Invalid hex string" : ""}
        />
        <Button type="primary" onClick={handleHexToCb58Convert}>
          Convert
        </Button>
        {hexToCb58Result && !hexToCb58Error && (
          <CopyableSuccess label="CB58 Encoded Result" value={hexToCb58Result} />
        )}
      </div>

      {/* CB58 to Hex */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">CB58 Encoded to Hex</h2>
        <Input
          label="CB58"
          value={cb58ToConvert}
          onChange={setCb58ToConvert}
          placeholder="Enter CB58 encoded value"
          error={cb58ToHexError ? "Invalid CB58 string" : ""}
        />
        <Button type="primary" onClick={handleCb58ToHexConvert}>
          Convert
        </Button>
        {cb58ToHexResult && !cb58ToHexError && (
          <CopyableSuccess label="Hex Result" value={cb58ToHexResult} />
        )}
      </div>

      {/* CB58 to Hex with Checksum */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">CB58 Encoded to Hex with Checksum</h2>
        <div className="text-sm text-gray-600 mb-2">
          This tool converts a CB58 encoded string to a hex string with checksum. It has 0x as prefix and 4 bytes
          checksum at the end. It won't work if you just copy+paste the hex string into "Hex to CB58 encoded" tool.
        </div>
        <Input
          label="CB58"
          value={cb58WithChecksumToConvert}
          onChange={setCb58WithChecksumToConvert}
          placeholder="Enter CB58 encoded value"
          error={cb58ToHexWithChecksumError ? "Invalid CB58 string" : ""}
        />
        <Button type="primary" onClick={handleCb58ToHexWithChecksumConvert}>
          Convert
        </Button>
        {cb58ToHexWithChecksumResult && !cb58ToHexWithChecksumError && (
          <CopyableSuccess label="Hex Result with Checksum" value={cb58ToHexWithChecksumResult} />
        )}
      </div>

      {/* Clean Hex String */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Clean Hex String</h2>
        <div className="text-sm text-gray-600 mb-2">
          Formats hex by adding spaces between each byte. Preserves 0x prefix if present.
        </div>
        <Input
          label="Hex"
          value={hexToClean}
          onChange={setHexToClean}
          placeholder="Enter hex value to format (e.g. 0x3213213322aab101)"
        />
        <Button type="primary" onClick={handleCleanHex}>
          Format
        </Button>
        {cleanHexResult && (
          <CopyableSuccess label="Formatted Hex Result" value={cleanHexResult} />
        )}
      </div>

      {/* Unformat Hex */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Unformat Hex</h2>
        <div className="text-sm text-gray-600 mb-2">
          Removes all spaces from hex string. Preserves 0x prefix if present.
        </div>
        <Input
          label="Hex"
          value={hexToUnformat}
          onChange={setHexToUnformat}
          placeholder="Enter formatted hex value (e.g. 0x 32 13 21 33 22 aa b1 01)"
        />
        <Button type="primary" onClick={handleUnformatHex}>
          Unformat
        </Button>
        {unformatHexResult && (
          <CopyableSuccess label="Unformatted Hex Result" value={unformatHexResult} />
        )}
      </div>
    </div>
  );
}
