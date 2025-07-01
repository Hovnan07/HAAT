import { useState, useRef, useCallback, useMemo } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../../store/settingsStore";
import { Languages } from "../../utils/languages";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface AppWrapperProps {
    children: React.ReactNode;
}

const LANGUAGE_DATA = {
    [Languages.EN]: { name: 'English', flag: '🇬🇧' },
    [Languages.AR]: { name: 'العربية', flag: '🇦🇪' },
    [Languages.FR]: { name: 'Français', flag: '🇫🇷' },
    [Languages.HE]: { name: 'עִברִית', flag: '🇮🇱' },
};

const AppWrapper = ({ children }: AppWrapperProps) => {
    const insets = useSafeAreaInsets();
    const { language, setLanguage } = useSettingsStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['40%'], []);
    
    const handleClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const onChangeLanguage = (selectedLanguage: Languages) => {
        setLanguage(selectedLanguage);
        handleClose();
    };
    
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );
    
    const openLanguageSheet = useCallback(() => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    }, []);
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <StatusBar />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.header, { paddingTop: insets.top }]}>
                        <TouchableOpacity 
                            style={styles.languageSelectorButton}
                            onPress={openLanguageSheet}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.currentLanguage}>
                                {LANGUAGE_DATA[language].flag} {LANGUAGE_DATA[language].name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {children}
                </SafeAreaView>
                
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                    handleIndicatorStyle={styles.indicator}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        {Object.values(Languages).map((lang) => (
                            <TouchableOpacity 
                                key={lang} 
                                onPress={() => onChangeLanguage(lang)} 
                                style={[
                                    styles.languageButton, 
                                    lang === language && styles.selectedLanguage
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.languageFlag}>{LANGUAGE_DATA[lang].flag}</Text>
                                <Text style={[
                                    styles.languageName,
                                    lang == language && styles.selectedLanguageText
                                ]}>
                                    {LANGUAGE_DATA[lang].name}
                                </Text>
                                {lang === language && (
                                    <View style={styles.checkmark}>
                                        <Text>✓</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

export default AppWrapper;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'box-none',
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    languageSelectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    currentLanguage: {
        fontSize: 16,
        fontWeight: '500',
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    languageFlag: {
        fontSize: 22,
        marginRight: 16,
    },
    languageName: {
        fontSize: 16,
        flex: 1,
    },
    selectedLanguage: {
        backgroundColor: '#f0f8ff',
    },
    selectedLanguageText: {
        fontWeight: '600',
    },
    checkmark: {
        width: 20,
        alignItems: 'center',
    },
    sheetHeader: {
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    indicator: {
        backgroundColor: '#bbb',
        width: 40,
    },
});