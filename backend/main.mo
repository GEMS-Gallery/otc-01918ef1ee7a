import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor {
  type Asset = {
    id: Nat;
    name: Text;
    quantity: Nat;
  };

  type TradeOffer = {
    id: Nat;
    assetId: Nat;
    quantity: Nat;
    price: Nat;
  };

  stable var nextAssetId: Nat = 0;
  stable var nextTradeOfferId: Nat = 0;

  let assets = HashMap.HashMap<Nat, Asset>(10, Nat.equal, Int.hash);
  let tradeOffers = HashMap.HashMap<Nat, TradeOffer>(10, Nat.equal, Int.hash);

  public func createAsset(name: Text, quantity: Nat): async Result.Result<Nat, Text> {
    let id = nextAssetId;
    nextAssetId += 1;
    let asset: Asset = { id; name; quantity };
    assets.put(id, asset);
    #ok(id)
  };

  public query func getAssets(): async [Asset] {
    Iter.toArray(Iter.map(assets.entries(), func ((k: Nat, asset: Asset)) : Asset { asset }))
  };

  public func createTradeOffer(assetId: Nat, quantity: Nat, price: Nat): async Result.Result<Nat, Text> {
    switch (assets.get(assetId)) {
      case (null) { #err("Asset not found") };
      case (?asset) {
        if (asset.quantity < quantity) {
          #err("Insufficient asset quantity")
        } else {
          let id = nextTradeOfferId;
          nextTradeOfferId += 1;
          let tradeOffer: TradeOffer = { id; assetId; quantity; price };
          tradeOffers.put(id, tradeOffer);
          #ok(id)
        }
      };
    }
  };

  public query func getTradeOffers(): async [TradeOffer] {
    Iter.toArray(Iter.map(tradeOffers.entries(), func ((k: Nat, offer: TradeOffer)) : TradeOffer { offer }))
  };

  public func acceptTradeOffer(tradeOfferId: Nat): async Result.Result<Bool, Text> {
    switch (tradeOffers.get(tradeOfferId)) {
      case (null) { #err("Trade offer not found") };
      case (?offer) {
        switch (assets.get(offer.assetId)) {
          case (null) { #err("Asset not found") };
          case (?asset) {
            if (asset.quantity < offer.quantity) {
              #err("Insufficient asset quantity")
            } else {
              let updatedAsset = { asset with quantity = asset.quantity - offer.quantity };
              assets.put(offer.assetId, updatedAsset);
              ignore tradeOffers.remove(tradeOfferId);
              #ok(true)
            }
          };
        }
      };
    }
  };
}
