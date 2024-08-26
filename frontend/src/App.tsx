import React, { useState, useEffect } from 'react';
import { Container, Grid, AppBar, Toolbar, Typography, Box } from '@mui/material';
import AssetManagement from './components/AssetManagement';
import TradeOffers from './components/TradeOffers';
import { backend } from 'declarations/backend';

type Asset = {
  id: bigint;
  name: string;
  quantity: bigint;
};

type TradeOffer = {
  id: bigint;
  assetId: bigint;
  quantity: bigint;
  price: bigint;
};

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [tradeOffers, setTradeOffers] = useState<TradeOffer[]>([]);

  useEffect(() => {
    fetchAssets();
    fetchTradeOffers();
  }, []);

  const fetchAssets = async () => {
    try {
      const result = await backend.getAssets();
      setAssets(result);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchTradeOffers = async () => {
    try {
      const result = await backend.getTradeOffers();
      setTradeOffers(result);
    } catch (error) {
      console.error('Error fetching trade offers:', error);
    }
  };

  const handleAssetCreated = () => {
    fetchAssets();
  };

  const handleTradeOfferCreated = () => {
    fetchTradeOffers();
  };

  const handleTradeOfferAccepted = () => {
    fetchAssets();
    fetchTradeOffers();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OTC Trading Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AssetManagement
              assets={assets}
              onAssetCreated={handleAssetCreated}
              onTradeOfferCreated={handleTradeOfferCreated}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TradeOffers
              tradeOffers={tradeOffers}
              onTradeOfferAccepted={handleTradeOfferAccepted}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
