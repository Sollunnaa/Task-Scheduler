import {useFonts} from 'expo-font';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DateSelector from '../components/DateSelector';
import ActivityTab from '../components/ActivityTab';
import dayjs from 'dayjs';
import ActivityCard from '@/components/ActivityCard';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Home() {
  
    const hour = dayjs().hour();
    const timeZone = dayjs.tz().toString();
     let greeting = "Hello";
        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }
 

  const current_date = dayjs().format('dddd, MMM D');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting} >{greeting}</Text>
        <Text style={styles.title}>Activity Today</Text>
        <Text style={styles.currentDate}>{current_date}</Text>
      </View>
      
      <View style={styles.body}>
        <DateSelector onDateSelect={(date)=> console.log("Selected date:", date)}/>
        <ActivityTab/>

        <ActivityCard title={''} description={''} scheduleTime={''} onToggleDetails={function (): void {
          throw new Error('Function not implemented.');
        } } showDetails={false} />
      </View>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    height:'100%'
    
  },
  header:{
    margin:10
  },
  body: {
    marginTop:10
  },
  greeting: {
    fontSize: 16,
    color: "#777575",

  },
  title: {
    fontSize: 30,
    letterSpacing: 1.5,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily:"Bold"
  },
  currentDate: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#777575",
  },
});