import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Asset { 'id' : bigint, 'name' : string, 'quantity' : bigint }
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Result_1 = { 'ok' : boolean } |
  { 'err' : string };
export interface TradeOffer {
  'id' : bigint,
  'assetId' : bigint,
  'quantity' : bigint,
  'price' : bigint,
}
export interface _SERVICE {
  'acceptTradeOffer' : ActorMethod<[bigint], Result_1>,
  'createAsset' : ActorMethod<[string, bigint], Result>,
  'createTradeOffer' : ActorMethod<[bigint, bigint, bigint], Result>,
  'getAssets' : ActorMethod<[], Array<Asset>>,
  'getTradeOffers' : ActorMethod<[], Array<TradeOffer>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
