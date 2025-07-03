import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import { useSettingsStore } from "../../store/settingsStore";
import AppWrapper from "../../components/appWrapper";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../utils/screen";
import { RootStackParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Languages } from "../../utils/languages";

const MarketsScreen = () => {
    const { width } = useWindowDimensions();
    const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation();
    const { getMarkets, markets, loading } = useAppStore((state) => state);
    const { language } = useSettingsStore((state) => state);
    useEffect(() => {
        getMarkets();
    }, []);
    return (
        <AppWrapper>
            {loading ? <Text>Loading...</Text> :
                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    data={markets?.marketCategories}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(Screen.MARKET_DETAIL, { marketId: item.id, index: index })} style={[styles.marketCategoryItem, { width: width / 2 - 30 }]}>
                                <Image source={{ uri: 'https://im-staging.haat.delivery/' + item.serverImageUrl }}
                                    style={styles.image}
                                    resizeMode="stretch"
                                />
                                <BlurView
                                    blurType="light"
                                    blurAmount={30}
                                    style={styles.marketCategoryTextContainer}>
                                    <Text numberOfLines={1} style={styles.marketCategoryText}>{item.name[language]}</Text>
                                </BlurView>
                            </TouchableOpacity>
                        )
                    }}
                />
            }
        </AppWrapper>
    );
};

export default MarketsScreen;

const styles = StyleSheet.create({
    marketCategoryItem: {
        overflow: "hidden",
        margin: 15,
        height: 100,
        borderRadius: 20,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    marketCategoryTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
    },
    marketCategoryText: {
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
});
