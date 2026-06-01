export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  jwt: {
    secret: process.env.JWT_SECRET || 'tilevista_jwt_development_secret_key_change_me_in_production',
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  },
  lowStockThreshold: parseInt(process.env.LOW_STOCK_THRESHOLD || '10', 10),
};
