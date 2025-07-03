import { Image, StyleSheet, Text, View } from "react-native";
import { SectionData } from "../../types/marketDetail";
import { useSettingsStore } from "../../store/settingsStore";

interface SectionListData {
  title: string;
  categoryId: number;
  subcategoryId: number;
  data: any[];
}

const RenderSectionHeader = ({ section }: { section: SectionListData }) => {
    const { language, isRTL } = useSettingsStore((state) => state);
    
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
                {section.title}
            </Text>
            <View style={styles.sectionHeaderLine} />
        </View>
    );
};

export default RenderSectionHeader;

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    sectionHeaderLine: {
        position: 'absolute',
        bottom: 0,
        left: 15,
        right: 15,
        height: 2,
        backgroundColor: '#f15b41',
    },
});