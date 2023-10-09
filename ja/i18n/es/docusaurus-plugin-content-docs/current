// Import the Transfer event class generated from the Png ABI
import { Transfer as TransferEvent } from "../generated/Png/Png"; // Import the Transfer entity type generated from the GraphQL schema

import { Transfer } from "../generated/schema"; // Transfer event handler

export function handleTransfer(event: TransferEvent): void {
  // Create a Transfer entity, using the hexadecimal string representation
  // of the transaction hash as the entity ID
  let id = event.transaction.hash.toHex();
  let transfer = new Transfer(id); // Set properties on the entity, using the event parameters

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.amount = event.params.amount; // Save the entity to the store

  transfer.save();
}