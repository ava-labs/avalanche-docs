# Input Unpacker and Output Packer

The generator generated the Unpacker and Packer functions for each operation of our precompile.
Furthermore, you might have noticed, that it also generated some structs whenever an operation of
our precompile had more than one input (parameter) or output (return value). These multiple values
are now stored together in the struct.

## Unpacking Multiple Inputs

When a function of our precompile has multiple inputs, a struct is generated. In the example the
function is called "FunctionName". Therefore, the generated strcut is called "FunctionNameInput".

```go
type FunctionNameInput struct {
	Value1 *big.Int
	Value2 *big.Int
}

// UnpackFunctionNameInput attempts to unpack [input] as AddInput
// assumes that [input] does not include selector (omits first 4 func signature bytes)
func UnpackFunctionNameInput(input []byte) (AddInput, error) {
	inputStruct := FunctionNameInput{}
	err := CalculatorABI.UnpackInputIntoInterface(&inputStruct, "FunctionName", input)

	return inputStruct, err
}
```

The generator creates a function "UnpackFunctionNameInput" for us to "unpack" the multiple values
encoded in the input byte array called input.

## Packing Multiple Outputs

Analogous, if there are multiple output values of the function, a Packer function is generated:

```go
type FunctionNameOutput struct {
	Result1 *big.Int
	Result2 *big.Int
}


// PackNextTwoOutput attempts to pack given [outputStruct] of type NextTwoOutput
// to conform the ABI outputs.
func PackFunctionNameOutput(outputStruct FunctionNameOutput) ([]byte, error) {
	return CalculatorABI.PackOutput("FunctionName",
		outputStruct.Result1,
		outputStruct.Result2,
	)
}
```
