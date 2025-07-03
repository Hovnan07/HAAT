import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../store/settingsStore";
import { CategoryItem, SubCategory } from "../../types/marketDetail";

const RenderCategoryItem = ({ item, index, activeCategoryIndex, handleCategoryPress }: { item: CategoryItem , index: number, activeCategoryIndex: number, handleCategoryPress: (id: number) => void }) => {
    const isActive = item.id === activeCategoryIndex;
    const { language } = useSettingsStore((state) => state);
    return (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                isActive && styles.activeCategoryItem
            ]}
            onPress={() => handleCategoryPress(Number(item.id))}
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

export default RenderCategoryItem;

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginHorizontal: 15,
      },
      activeCategoryItem: {
        backgroundColor: 'rgba(255, 38, 0, 0.24)',
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