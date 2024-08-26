import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

type Asset = {
  id: bigint;
  name: string;
  quantity: bigint;
};

type AssetManagementProps = {
  assets: Asset[];
  onAssetCreated: () => void;
  onTradeOfferCreated: () => void;
};

const AssetManagement: React.FC<AssetManagementProps> = ({ assets, onAssetCreated, onTradeOfferCreated }) => {
  const { control, handleSubmit, reset } = useForm();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const onSubmitAsset = async (data: { name: string; quantity: string }) => {
    try {
      const result = await backend.createAsset(data.name, BigInt(data.quantity));
      if ('ok' in result) {
        onAssetCreated();
        reset();
      } else {
        console.error('Error creating asset:', result.err);
      }
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const onSubmitTradeOffer = async (data: { quantity: string; price: string }) => {
    if (!selectedAsset) return;
    try {
      const result = await backend.createTradeOffer(
        selectedAsset.id,
        BigInt(data.quantity),
        BigInt(data.price)
      );
      if ('ok' in result) {
        onTradeOfferCreated();
        setSelectedAsset(null);
        reset();
      } else {
        console.error('Error creating trade offer:', result.err);
      }
    } catch (error) {
      console.error('Error creating trade offer:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Asset Management
        </Typography>
        <form onSubmit={handleSubmit(onSubmitAsset)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Asset name is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Asset Name"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{ required: 'Quantity is required', pattern: { value: /^\d+$/, message: 'Must be a number' } }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Quantity"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Asset
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Your Assets
        </Typography>
        {assets.map((asset) => (
          <Card key={asset.id.toString()} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">
                {asset.name} - Quantity: {asset.quantity.toString()}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setSelectedAsset(asset)}
                sx={{ mt: 1 }}
              >
                Create Trade Offer
              </Button>
            </CardContent>
          </Card>
        ))}

        {selectedAsset && (
          <form onSubmit={handleSubmit(onSubmitTradeOffer)}>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Create Trade Offer for {selectedAsset.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Quantity is required', pattern: { value: /^\d+$/, message: 'Must be a number' } }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Quantity"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Price is required', pattern: { value: /^\d+$/, message: 'Must be a number' } }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Price"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create Trade Offer
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetManagement;
