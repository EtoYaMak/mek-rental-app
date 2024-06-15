import React from 'react';
import { FlatList } from 'react-native';
import ListingItem from './ListingItem';

const ListingsList = ({ item, deleteListing }) => {
  return (
    <FlatList
      data={item.image_url}
      renderItem={({ item }) => (
        <ListingItem item={item} deleteListing={deleteListing} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ListingsList;
