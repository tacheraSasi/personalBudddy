import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import { useRouter } from 'expo-router';
import failed from '../assets/failed.png';

export default function CategoryList({ categoryList, fetchFailed }) {
  const router = useRouter();

  const onCategoryClick = (category) => {
    router.push({
      pathname: '/category-detail',
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (categoryItems) => {
    let totalCost = 0;
    categoryItems.forEach((item) => {
      totalCost = totalCost + item.cost;
    });

    return totalCost;
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>Latest Budget</Text>
      <View>
        {Array.isArray(categoryList) ? (
          categoryList.map((category, index) => (
            <TouchableOpacity key={index} style={styles.container} onPress={() => onCategoryClick(category)}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { backgroundColor: category?.color }]}>{category.icon}</Text>
              </View>
              <View style={styles.subContainer}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Text style={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
                </View>
                <Text style={styles.totalAmountText}>{calculateTotalCost(category?.CategoryItems)}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          fetchFailed && (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={failed}
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 12,
                  borderColor: 'transparent',
                }}
              />
              <Text
                style={{
                  margin: 20,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'gray',
                  textAlign: 'center',
                }}
              >
                Something went wrong 😕
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,
    width: 80,
    textAlign: 'center',
  },
  categoryText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  itemCount: {
    fontFamily: 'outfit',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  totalAmountText: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
  },
});
