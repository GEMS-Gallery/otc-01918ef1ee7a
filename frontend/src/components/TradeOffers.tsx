import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { backend } from 'declarations/backend';

type TradeOffer = {
  id: bigint;
  assetId: bigint;
  quantity: bigint;
  price: bigint;
};

type TradeOffersProps = {
  tradeOffers: TradeOffer[];
  onTradeOfferAccepted: () => void;
};

const TradeOffers: React.FC<TradeOffersProps> = ({ tradeOffers, onTradeOfferAccepted }) => {
  const handleAcceptOffer = async (offerId: bigint) => {
    try {
      const result = await backend.acceptTradeOffer(offerId);
      if ('ok' in result) {
        onTradeOfferAccepted();
      } else {
        console.error('Error accepting trade offer:', result.err);
      }
    } catch (error) {
      console.error('Error accepting trade offer:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Trade Offers
        </Typography>
        <Grid container spacing={2}>
          {tradeOffers.map((offer) => (
            <Grid item xs={12} key={offer.id.toString()}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    Asset ID: {offer.assetId.toString()}
                  </Typography>
                  <Typography variant="body1">
                    Quantity: {offer.quantity.toString()}
                  </Typography>
                  <Typography variant="body1">
                    Price: {offer.price.toString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAcceptOffer(offer.id)}
                    sx={{ mt: 1 }}
                  >
                    Accept Offer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TradeOffers;
