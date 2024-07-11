import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CircularChart({ categoryList }) {
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
    const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);

    useEffect(() => {
        categoryList && updateCircularChart();
    }, [categoryList]);

    const updateCircularChart = () => {
        let totalEstimates = 0;
        let otherCost = 0;

        setSliceColor([1]);
        setValues([Colors.GRAY]);

        categoryList.forEach((item, index) => {
            if (index < 4) {
                let itemTotalCost = 0;
                item.CategoryItems?.forEach((item_) => {
                    itemTotalCost += item_.cost;
                    totalEstimates += item_.cost;
                });
                setSliceColor(sliceColor => [...sliceColor, Colors.COLOR_LIST[index]]);
                setValues(values => [...values, itemTotalCost]);
            } else {
                item.CategoryItems?.forEach((item_) => {
                    otherCost += item_.cost;
                    totalEstimates += item_.cost;
                });
            }
        });

        setTotalCalculatedEstimate(totalEstimates);
        setSliceColor(sliceColor => [...sliceColor, Colors.COLOR_LIST[4]]);
        setValues(values => [...values, otherCost]);
    };

    return (
        <View style={styles.container}>
            {categoryList?.length > 0 && 
            <>
                <Text style={styles.totalEstimateText}>
                Total Estimate : <Text style={styles.boldText}>{totalCalculatedEstimate}</Text>
                </Text>
                <View style={styles.subContainer}>
                    {categoryList?.length > 0 && (
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={values}
                            sliceColor={sliceColor}
                            coverRadius={0.65}
                            coverFill={'#FFF'}
                        />
                    )}
                    <View>
                        {categoryList?.slice(0, 5).map((category, index) => (
                            <View key={index} style={styles.chartNameContainer}>
                                <MaterialCommunityIcons
                                    name="checkbox-blank-circle"
                                    size={24}
                                    color={Colors.COLOR_LIST[index]}
                                />
                                <Text>{index < 4 ? category.name : 'Other'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </>}
            {!(categoryList?.length > 0) &&
                <Text style={styles.totalEstimateText}>
                {getRandomWelcomeMessage()} 
                </Text>
            }
            
        </View>
    );
}

function getRandomWelcomeMessage() {
    const welcomeMessages = [
        "Welcome to Buddy! Let's budget together! 🎉",
        "Hey there, Buddy! Ready to save? 💰",
        "Hi Buddy! Let's track expenses! 📊",
        "Hello Buddy! Let's budget smarter! 💡",
        "Welcome to Buddy! Let's start saving! 🚀"
    ];

    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    return welcomeMessages[randomIndex];
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
