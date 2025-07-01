import { Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import { useSettingsStore } from "../../store/settingsStore";
import AppWrapper from "../../components/appWrapper";

const MarketsScreen = () => {
    const { getMarkets, markets, loading } = useAppStore((state) => state);
    const { setRTL, isRTL } = useSettingsStore();
    useEffect(() => {
        getMarkets();
    }, []);
    console.log(markets);
    return (
        <AppWrapper>
            <View>
                <Text>MarketsScreen</Text>
                <TouchableOpacity onPress={() => setRTL(!isRTL)}>
                    <Text>Toggle Direction</Text>
                </TouchableOpacity>
            </View>
        </AppWrapper>
    );
};

export default MarketsScreen;