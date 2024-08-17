import React from 'react';
import {Box, ScrollView, Text, Heading, Center} from 'native-base';
import {COLORS} from '~/styles';
import {useScannedData} from './ScannedDataContext';

const HistoryScreen = () => {
  const {scannedHistory} = useScannedData();

  const parseScannedData = data => {
    const [
      code,
      volume,
      dateTime,
      details,
      volume1,
      volume2,
      volume3,
      volume4,
      volume5,
      volume6,
      volume7,
      volume8,
      volume9,
      volume10,
      volume12,
      volume11,
      volume13,
      volume14,
    ] = data.split('|');
    return {
      code,
      volume,
      dateTime,
      details,
      volume1,
      volume2,
      volume3,
      volume4,
      volume5,
      volume6,
      volume7,
      volume8,
      volume9,
      volume10,
      volume12,
      volume11,
      volume13,
      volume14,
      

    };
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
              const {code, volume, dateTime, details ,volume1, volume2, volume3, volume4, volume5, volume6, volume7 , volume8 , volume9 , volume10 , volume12 , volume11 } = parseScannedData(item);

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
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume1:</Text> {volume1}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume2:</Text> {volume2}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume3:</Text> {volume3}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume4:</Text> {volume4}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume5:</Text> {volume5}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume6:</Text> {volume6}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume7:</Text> {volume7}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume8:</Text> {volume8}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume9:</Text> {volume9}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume10:</Text> {volume10}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume11:</Text> {volume11}
                  </Text>
                  <Text fontSize={14} color={COLORS.secondary[700]}>
                    <Text bold>volume12:</Text> {volume12}
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
