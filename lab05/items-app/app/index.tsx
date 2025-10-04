/**
 * Index - Main list view displaying all available items
 *
 * This is the primary screen of the application that displays a list
 * of available items. Users can browse through items and tap on any
 * item to navigate to its detailed view.
 */

import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Item } from "../types/Item";
import { commonStyles } from "../styles/common";
import { useItemContext } from "@/context/ItemContext";

export default function Index() {
    // Load items from static JSON data file
    const {items} = useItemContext();
    const router = useRouter();

    // Renders an individual item
    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push({
                pathname: "./details",
                params: { itemId: item.id }
            })}
        >
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
    );

    // Returns the list of individual items
    return (
        <View style={[commonStyles.container, commonStyles.listPadding]}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    itemCategory: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
    },
    arrow: {
        fontSize: 24,
        color: "#ccc",
        marginLeft: 16,
    },
    list: {
        flex: 1,
    },
});

