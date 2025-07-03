import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../store/settingsStore";
import { SubCategory } from "../../types/marketDetail";

const RenderSubcategoryItem = ({ item, index, activeSubcategoryIndex, handleSubcategoryPress }: { item: SubCategory, index: number, activeSubcategoryIndex: number, handleSubcategoryPress: (id: number) => void }) => {
    const isActive = item.id === activeSubcategoryIndex;
    const { language } = useSettingsStore((state) => state);
    return (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                isActive && styles.activeCategoryItem
            ]}
            onPress={() => handleSubcategoryPress(Number(item.id))}
        >
            <Text
                style={[
                    styles.categoryText,
                    isActive && styles.activeCategoryText,
                ]}
            >
                {item.name[language] || ''}
            </Text>
        </TouchableOpacity>
    );
};

export default RenderSubcategoryItem;

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginHorizontal: 15,
      },
      activeCategoryItem: {
        borderColor: '#000',
        borderBottomWidth: 1,
        borderRadius: 40,
        paddingHorizontal: 10,
        // marginVertical: 15,
      },
      categoryText: {
        fontSize: 12,
        color: '#666',
      },
      activeCategoryText: {
        color: '#000',
        fontWeight: 'bold',
      },
});