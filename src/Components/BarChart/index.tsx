import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {  MapData } from '../Map/@types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  const BarChart = () =>{
  const [datas, setDatas] = useState<MapData[]>();
  useEffect(() => {
      async function fetchData() {
        const res = await fetch(
          "https://peaceful-inlet-29134.herokuapp.com/https://s3.ap-south-1.amazonaws.com/hire.isimplexity/data.js"
        );
        const body: MapData[] = await res.json();
        setDatas(body);
      }
      fetchData();
    }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = datas?.map((data) => data.region);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Regions',
        data: datas?.map((data) => data.data),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <div><Bar data={data} options={options} /></div>
  )
}

export default BarChart