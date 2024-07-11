import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Heading({  }) {

    // useEffect(() => {
    //     categoryList && updateCircularChart();
    // }, [categoryList]);

    return (
        <View style={styles.container}>
            <Text style={styles.totalEstimateText}>
                Send Emails ✌
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 15,
        elevation: 1,
    },
    subContainer: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 40,
    },
    totalEstimateText: {
        fontSize: 20,
        fontFamily: 'outfit',
        fontWeight: 'bold', // Add bold font weight
    },
    boldText: {
        fontFamily: 'outfit-bold',
    },
    chartNameContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
});
