import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const TableExample = () => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
          <DataTable.Title>City</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>John Doe</DataTable.Cell>
          <DataTable.Cell numeric>25</DataTable.Cell>
          <DataTable.Cell>New York</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Jane Smith</DataTable.Cell>
          <DataTable.Cell numeric>30</DataTable.Cell>
          <DataTable.Cell>San Francisco</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Michael Brown</DataTable.Cell>
          <DataTable.Cell numeric>35</DataTable.Cell>
          <DataTable.Cell>Los Angeles</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={0}
          numberOfPages={3}
          onPageChange={(page) => console.log(page)}
          label="1-3 of 3"
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default TableExample;
