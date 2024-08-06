import React from 'react';
import {Box, ScrollView, Text, Heading, Center} from 'native-base';
import {COLORS} from '~/styles';
import {useScannedData} from './ScannedDataContext';

const HistoryScreen = () => {
  const {scannedHistory} = useScannedData();

  const parseScannedData = data => {
    const [code, volume, dateTime, details] = data.split('|');
    return {code, volume, dateTime, details};
  };

  return (
    <Box safeAreaTop flex={1} bg={'#fff'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading fontSize={18} mx={5} my={3}>
          Scan History
        </Heading>
        <Box
          flex={1}      
          py={2}
          px={3}
          shadow={1}
          >
          {scannedHistory.length > 0 ? (
            scannedHistory.map((item, index) => {
              const {code, volume, dateTime, details} = parseScannedData(item);

              return (
                <Box key={index} p={3} mb={3} bg={'#fff'} borderRadius={10}>
                  <Text bold fontSize={14} color={COLORS.secondary[800]}>
                    Scan {index + 1}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Code:</Text> {code}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Volume:</Text> {volume}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Date & Time:</Text> {dateTime}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>Details:</Text> {details}
                  </Text>
                </Box>
              );
            })
          ) : (
            <Center flex={1}>
              <Text bold fontSize={20} color={'#000'}>
                No Data
              </Text>
            </Center>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HistoryScreen;
