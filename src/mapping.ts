
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "./generated/MUSDC/MUSDC";
import { User, Transfer } from "./generated/schema";

function getOrCreateUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (!user) {
    user = new User(address.toHexString());
    user.numTransfers = BigInt.fromI32(0);
  }
  return user;
}

export function handleTransfer(event: TransferEvent): void {
    // create a new transfer entity
    let transfer = new Transfer(event.transaction.hash.toHexString() + "-" + event.logIndex.toString());
    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.value = event.params.value;

    // update the user entities
    let user = getOrCreateUser(event.params.from);
    user.numTransfers = user.numTransfers.plus(BigInt.fromI32(1));

    // save the user and transfer entities
    user.save();
    transfer.save();
}
