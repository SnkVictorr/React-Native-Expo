import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.card, style]} {...props} />
  )
);

const CardHeader = forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardHeader, style]} {...props} />
  )
);

const CardTitle = forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.cardTitle, style]} {...props} />
  )
);

const CardDescription = forwardRef<Text, React.ComponentProps<typeof Text>>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.cardDescription, style]} {...props} />
  )
);

const CardContent = forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardContent, style]} {...props} />
  )
);

const CardFooter = forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardFooter, style]} {...props} />
  )
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
});

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
