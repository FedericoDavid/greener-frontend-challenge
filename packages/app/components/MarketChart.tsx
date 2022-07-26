import React, { useEffect, useState } from "react";
import { Stack, useToast, Spinner, Button } from "native-base";
import { Line } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

import { useCryptoAPIClient } from "app/services/api/useCryptoAPIClient";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

interface MarketChartProps {
   coinId: string;
}

export const MarketChart: React.FC<MarketChartProps> = ({ coinId }) => {
   const [chartData, setChartData] = useState<any>();
   const [days, setDays] = useState(1);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const cryptoAPIClient = useCryptoAPIClient();
   const toast = useToast();

   const getMarketChartData = async (): Promise<void> => {
      setIsLoading(true);

      const res = await cryptoAPIClient.getMarketChart(coinId, days, "usd");

      if (!res) {
         toast.show({
            title: "Ups! Something went wrong.",
            placement: "bottom",
         });

         setIsLoading(false);
         return;
      }

      setChartData(res.prices);
      setIsLoading(false);
   };

   useEffect(() => {
      getMarketChartData();
   }, [days]);

   const optionDays = [
      {
         label: "24 Hours",
         value: 1,
      },
      {
         label: "30 Days",
         value: 30,
      },
      {
         label: "3 Months",
         value: 90,
      },
      {
         label: "1 Year",
         value: 365,
      },
   ];

   return (
      <>
         {!chartData || isLoading ? (
            <Spinner color="indigo.500" size="lg" />
         ) : (
            <Stack
               width="100%"
               display="flex"
               flexDirection="column"
               alignItems="center"
               justifyContent="center"
            >
               <Line
                  data={{
                     labels: chartData?.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                           date.getHours() > 12
                              ? `${
                                   date.getHours() - 12
                                }:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                     }),

                     datasets: [
                        {
                           data: chartData?.map((coin) => coin[1]),
                           label: `Price ( Past ${days} Days ) in usd`,
                           borderColor: "rgb(99,102,241)",
                        },
                     ],
                  }}
                  options={{
                     elements: {
                        point: {
                           radius: 1,
                        },
                     },
                  }}
               />
               <Stack
                  display="flex"
                  flexDirection="row"
                  marginTop={8}
                  marginBottom={8}
                  justifyContent="space-between"
                  margin="auto"
               >
                  {optionDays.map((day) => (
                     <Button
                        colorScheme="indigo"
                        marginX={2}
                        key={day.value}
                        onPress={() => {
                           setDays(day.value);
                           setIsLoading(false);
                        }}
                        isPressed={day.value === days}
                     >
                        {day.label}
                     </Button>
                  ))}
               </Stack>
            </Stack>
         )}
      </>
   );
};
