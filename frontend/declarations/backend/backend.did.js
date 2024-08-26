export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Asset = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'quantity' : IDL.Nat,
  });
  const TradeOffer = IDL.Record({
    'id' : IDL.Nat,
    'assetId' : IDL.Nat,
    'quantity' : IDL.Nat,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'acceptTradeOffer' : IDL.Func([IDL.Nat], [Result_1], []),
    'createAsset' : IDL.Func([IDL.Text, IDL.Nat], [Result], []),
    'createTradeOffer' : IDL.Func([IDL.Nat, IDL.Nat, IDL.Nat], [Result], []),
    'getAssets' : IDL.Func([], [IDL.Vec(Asset)], ['query']),
    'getTradeOffers' : IDL.Func([], [IDL.Vec(TradeOffer)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
