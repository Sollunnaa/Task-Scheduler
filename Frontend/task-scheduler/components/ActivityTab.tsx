import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


const ActivityTab = () => {
    const [activeTabe, setActiveTab] = useState('Today');
    const tabs = ['Today', 'Upcoming', 'Completed'];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tabButton, activeTabe === tab && styles.activeTabButton]}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={[styles.tabText, activeTabe === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}   
    

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        backgroundColor: '#ffffffff',
        borderWidth: 1,
        borderColor: 'rgba(217,217,217,0.5)',
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        width: '30%',   
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: '#5b50ff',
    },
    tabText: {
        fontSize: 12,
        color: '#555',
        
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ActivityTab;