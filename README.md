# HAAT Delivery App

## Overview
Mobile food delivery application built with React Native with advanced UI features.

## Features

### Advanced Scrolling in MarketDetail Screen
- Sticky section headers with automatic category updates
- Implemented `onViewableItemsChanged` for position tracking
- Added virtualization settings for performance optimization

### 3-Column Product Display
- Used chunkArray() helper to group products into rows of 3
- Added empty space handling for consistent layout

### API Integration
- Fixed API calling pattern: `getMarkets()` → `getMarketsDetail(categoryId)`
- Removed conflicting data requests for consistency

### Intelligent PagerView Control
- Added conditional scrolling logic between PagerView and SectionList
- Implemented boundary detection with 20px threshold

### SectionList Optimization
- Implemented getItemLayout for off-screen scrolling support

### RTL Support
- Created utility functions: rtlText(), rtlRow(), createRTLStyles()
- Used Zustand store (settingsStore) for RTL preferences

### Installation
```sh
# Install dependencies
npm install

# Start Metro
npm start

# Run on Android
npm run android


# For iOS not tested. I am used windows for development
npm run ios
