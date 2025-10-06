import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

type ActivityCardProps = {
    title: string;
    description: string;
    scheduleTime: string;
    onToggleDetails: () => void;
    showDetails: boolean;
};

export default function ActivityCard({ title, description, scheduleTime, onToggleDetails, showDetails }: ActivityCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onToggleDetails}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View> 
            <View style={styles.footer}>
                <Text style={styles.scheduleTime}>{scheduleTime}</Text>
                <Text style={styles.toggleDetails}>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
            </View>
            {showDetails && (
                <View style={styles.details}>
                    <Text>Additional details about the activity...</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        marginTop: 10,
    },
    scheduleTime: {
        fontSize: 12,
        color: '#888',
    },  
    toggleDetails: {
        fontSize: 12,
        color: '#5b50ff',
        fontWeight: '600',
    },
    details: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
});