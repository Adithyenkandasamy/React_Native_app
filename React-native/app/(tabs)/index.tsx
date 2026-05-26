import "@/global.css";
import { Text,Image,View, ScrollView } from "react-native";
import {styled} from "nativewind";
import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import { HOME_BALANCE, HOME_USER, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from 'dayjs';
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import React, { useState } from "react";
import { FlatList } from "react-native";
import SubscriptionCard from "@/components/SubscriptionCard";

const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="home-header">
          <View className="home-user">
            <Image source={images.avatar} className="home-avatar"/>
            <Text className="home-user-name">{HOME_USER.name}</Text>
          </View>
          <Image source={icons.add} className="home-add-icon"></Image>
        </View>      
        <View className="home-balance-card">
          <Text className="home-balance-label">Balance</Text>
          <View className="home-balance-row">
            <Text className="home-balance-amount">
              {formatCurrency(HOME_BALANCE.amount)}
            </Text>
            <Text className="home-balance-date">
              {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
            </Text>
          </View>
        </View>

        <View>
          <ListHeading title="Upcoming"/>
          <FlatList 
              data={UPCOMING_SUBSCRIPTIONS} 
              renderItem={({ item }) => (<UpcomingSubscriptionCard {...item}/>)}
              keyExtractor={( item ) => item.id}
              horizontal
              showsHorizontalScrollIndicator={ false }
              ListEmptyComponent={<Text className="home-empty-state">No upcoming subscriptions</Text>}
          />
        </View>

        <View>
          <ListHeading title="All Subscriptions"/>
          <FlatList 
                data={HOME_SUBSCRIPTIONS} 
                keyExtractor={(item) => item.id }
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (<SubscriptionCard {...item} 
                                                  expanded={expandedSubscriptionId === item.id}
                                                  onPress={() => setExpandedSubscriptionId((currentId) => 
                                                  (currentId === item.id ? null : item.id))}    
                                          />)}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
  