import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface JobLeavingReasonsChartProps {
    data: { 
        "Reason_answer": string; 
        experience_level: string; 
        count: number; 
    }[];
}

const JobLeavingReasonsChart: React.FC<JobLeavingReasonsChartProps> = ({data}) => {
    // Data with only one record
    console.log(data,"exper");
    

    // Prepare data for the chart
    const reasons = data.map(item => item["Reason_answer"]);
    const experienceLevels = data.map(item => item.experience_level);

    // Get unique experience levels
    const uniqueExperienceLevels = experienceLevels.filter((level, index, self) => self.indexOf(level) === index);

    const seriesData = uniqueExperienceLevels.map(level => {
        return {
            name: level,
            data: reasons.map(reason => {
                const reasonData = data.find(item => item["Reason_answer"] === reason && item.experience_level === level);
                return reasonData ? reasonData.count : 0;
            })
        };
    });

    // Chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar' as const // Use 'as const' to ensure TypeScript understands this is a literal type
        },
        title: {
            text: 'Reasons for Leaving a Job by Experience Level'
        },
        xaxis: {
            categories: reasons,
            labels: {
                show: false // Disable x-axis labels
            },
            title: {
                text: 'Reasons'
            }
        },
        yaxis: {
            title: {
                text: 'Candidate Count'
            }
        },
        series: seriesData
    };

    return (
        <div style={{ maxWidth: '800px', margin: '35px auto' }}>
            <Chart options={options} series={options.series} type="bar" height={350} />
        </div>
    );
};

export default JobLeavingReasonsChart;