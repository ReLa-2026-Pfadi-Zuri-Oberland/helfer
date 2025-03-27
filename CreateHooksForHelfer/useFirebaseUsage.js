import { ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import { updateUserName, useFirebase } from '../hooks/useFirebase';

export default function TabThreeScreen() {
  const [data, loading, error] = useFirebase('Users');
  const [updatedNames, setUpdatedNames] = useState({});

  if (loading) return <ActivityIndicator size='large' />;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleUpdate = (id, name) => {
    updateUserName(id, name);
  };

  return (
    <View style={{ padding: 10, backgroundColor: 'blue' }}>
      <Text>Tab Three</Text>
      {data.map((user) => (
        <View
          key={user.id}
          style={{ marginBottom: 10, backgroundColor: 'blue' }}
        >
          <Text>{user.name}</Text>
          <TextInput
            placeholder='Update name'
            value={updatedNames[user.id] ?? user.name} // Default to current name
            onChangeText={(text) =>
              setUpdatedNames((prev) => ({ ...prev, [user.id]: text }))
            }
          />
          <TouchableOpacity
            onPress={() =>
              handleUpdate(user.id, updatedNames[user.id] ?? user.name)
            }
          >
            <Text style={{ color: 'white' }}>Update</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
