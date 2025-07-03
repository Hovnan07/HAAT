import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  SectionList,
  Animated,
  Dimensions,
  ScrollView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSettingsStore } from "../../store/settingsStore";
import { RootStackParamList } from "../../navigation";
import Screen from "../../utils/screen";
import { useAppStore } from "../../store/appStore";
import AppWrapper from "../../components/appWrapper";
import { CategoryItem, SectionData } from "../../types/marketDetail";
import RenderCategoryItem from "../../components/marketDetail/renderCategoryItem";
import PagerView from 'react-native-pager-view';
import RenderSubcategoryItem from "../../components/marketDetail/renderSubcategoryItem";

type Props = NativeStackScreenProps<RootStackParamList, Screen.MARKET_DETAIL>;

const MarketDetailScreen = ({ route }: Props) => {
  const { marketId } = route.params;
  const { getMarketsDetail, marketsDetail, markets, loading } = useAppStore();
  const { language } = useSettingsStore((state) => state);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | string | null>(null);
  const categoryListRef = useRef<FlatList>(null);
  const subCategoryListRef = useRef<FlatList>(null);
  const sectionListRef = useRef<SectionList>(null);
  const [flatListRendered, setFlatListRendered] = useState(false);
  const [subCategoryFlatListRendered, setSubCategoryFlatListRendered] = useState(false);
  const pagerRef = useRef<PagerView>(null);

  const [subCategories, setSubCategories] = useState([]);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState<number | string | null>(null);
  
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [pagerScrollEnabled, setPagerScrollEnabled] = useState(false);
  const [isBlockedScrolling, setIsBlockedScrolling] = useState(true);

  useEffect(() => {
    setCategories(markets?.marketCategories || []);
  }, []);

  useEffect(() => {
    if (categories.length > 0 && flatListRendered) {
      handleCategoryPress(Number(marketId));
    }
  }, [categories, flatListRendered]);

  useEffect(() => {
    if (!activeCategoryIndex) return;
    setActiveSubcategoryIndex(marketsDetail?.marketSubcategories?.[0]?.id);
    setSubCategories(marketsDetail?.marketSubcategories || []);
  }, [marketsDetail]);

  const handleCategoryPress = (id: number) => {
    setActiveCategoryIndex(id);
    
    getMarketsDetail(id.toString());

    const categoryId = id;
    const sectionIndex = categories?.findIndex((category: CategoryItem) => category.id == categoryId) ?? -1;
    pagerRef.current?.setPage(sectionIndex)

    if (sectionIndex !== -1 && categoryListRef.current) {
      categoryListRef.current.scrollToIndex({
        index: sectionIndex,
        animated: true,
        viewPosition: 0.5
      });
    }
  };

  const onPageSelected = useCallback((e: any) => {
    const { position } = e.nativeEvent;
    setActiveCategoryIndex(categories?.[position]?.id);
    getMarketsDetail(categories?.[position]?.id.toString());    
    if (categoryListRef.current && position >= 0 && position < (categories?.length || 0)) {
      categoryListRef.current.scrollToIndex({
        index: position,
        animated: true,
        viewPosition: 0.5
      });
    }
  }, [categories, marketsDetail]);

  const chunkArray = (array: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const handleSubcategoryPress = (id: number) => {
    setActiveSubcategoryIndex(id);

    const categoryId = id;
    const sectionIndex = categories?.findIndex((category: CategoryItem) => category.id == categoryId) ?? -1;
    pagerRef.current?.setPage(sectionIndex)

    if (sectionIndex !== -1 && categoryListRef.current) {
      categoryListRef.current.scrollToIndex({
        index: sectionIndex,
        animated: true,
        viewPosition: 0.5
      });
    }
  };
  const lastScrollY = useRef(0);

  const handleScroll = useCallback((event: any) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const paddingToBottom = 0; 

    const atEnd = contentOffset.y >= contentSize.height - layoutMeasurement.height - paddingToBottom;
    const atStart = contentOffset.y <= paddingToBottom;
  const currentScrollY = contentOffset.y;
  console.log({end: atEnd, start: atStart});
  console.log(contentOffset.y, contentSize.height, layoutMeasurement.height);
  setPagerScrollEnabled(false);
    
    setIsAtEnd(atEnd);
    setIsAtStart(atStart);

    
    setPagerScrollEnabled(atEnd || atStart);
  }, []);

  const handleScrollBeginDrag = useCallback((event: any) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const atEnd = contentOffset.y >= contentSize.height - layoutMeasurement.height;
    const atStart = contentOffset.y <= layoutMeasurement.height;
    const currentScrollY = contentOffset.y;
    if (currentScrollY > lastScrollY.current) {
      console.log('down');
      if(!atEnd){
        setPagerScrollEnabled(true);
      }
    } else if (currentScrollY < lastScrollY.current) {
      console.log('up');
      if(!atStart){
        setPagerScrollEnabled(true);
      }
    }
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    const visibleSection = viewableItems.find((item: any) => item.section);
    if (visibleSection && marketsDetail?.marketSubcategories) {
      const sectionTitle = visibleSection.section.title;
      const visibleSubcategory = marketsDetail.marketSubcategories.find(
        (subcat: any) => subcat?.name?.[language] === sectionTitle
      );
      
      if (visibleSubcategory && visibleSubcategory.id !== activeSubcategoryIndex) {
        setActiveSubcategoryIndex(visibleSubcategory.id);
      }
    }
  }, [marketsDetail, language, activeSubcategoryIndex]);

  const renderItem = ({ item }: { item: any[] }) => {
    return (
      <View style={styles.productRow}>
        {item.map((product, index) => (
          <View key={`${product.id}-${index}`} style={styles.productItem}>
            <Image
              source={{ uri: 'https://im-staging.haat.delivery/' + product?.productImages[0]?.serverImageUrl }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productName}>{product?.name[language]}</Text>
            <Text style={styles.productPrice}>{product?.basePrice}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <AppWrapper>
          <FlatList
            ref={categoryListRef}
            data={categories}
            renderItem={({ item, index }) => 
            <RenderCategoryItem item={item} index={index} activeCategoryIndex={Number(activeCategoryIndex)} handleCategoryPress={handleCategoryPress} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            onLayout={() => {
              setFlatListRendered(true);
            }}
          />

          <PagerView overdrag={true}
            ref={pagerRef}
            overScrollMode="always"
            onPageSelected={onPageSelected}
            scrollEnabled={pagerScrollEnabled}
            style={styles.pagerView} 
            initialPage={Number(activeCategoryIndex)} 
            orientation="vertical" >
            {categories?.map((category) => {
              return (
                <View key={category.id}>

                  {activeCategoryIndex=== marketsDetail.id && (
                    <>
                    {subCategories && subCategories.length > 0 && (
                      <FlatList
                        ref={subCategoryListRef}
                        data={subCategories}
                        renderItem={({ item, index }) => <RenderSubcategoryItem item={item} index={index}
                          activeSubcategoryIndex={Number(activeSubcategoryIndex)} handleSubcategoryPress={handleSubcategoryPress} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesList}
                    stickyHeaderIndices={[0]}
                  />
                  )}
                  {
                    marketsDetail && marketsDetail.marketSubcategories && marketsDetail.marketSubcategories.length > 0 && (
                      <SectionList
                        stickySectionHeadersEnabled={false}
                        ref={sectionListRef}
                        sections={marketsDetail?.marketSubcategories?.map((category: any) => {
                          return {
                            title: category?.name[language],
                            data: chunkArray(category?.products || [], 3), // Chunk products into rows of 3
                          }
                        })}
                        keyExtractor={(item, index) => `row-${index}`}
                        renderItem={renderItem}
                        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section?.title}</Text>}
                        scrollEventThrottle={16}
                        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
                        showsVerticalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        onScroll={handleScroll}
                        onScrollBeginDrag={handleScrollBeginDrag}
                      />
                    )}
                  </>
                  )}
                </View>
              )
            })}
          </PagerView>
    </AppWrapper>
  );
};

export default MarketDetailScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },

  categoriesList: {
    maxHeight: 60,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  productItem: {
    width: Dimensions.get('window').width / 3 - 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginBottom: 8,
  },

  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
    // numberOfLines: 1,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f15b41',
    textAlign: 'center',
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
