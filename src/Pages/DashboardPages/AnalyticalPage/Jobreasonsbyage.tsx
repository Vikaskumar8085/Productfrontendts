import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface JobLeavingReasonsByAgeGroupProps {
    data: { Reason_answer: string; age_group: string; count: number }[];
}

const JobLeavingReasonsByAgeGroup: React.FC<JobLeavingReasonsByAgeGroupProps> = ({ data }) => {
    // Data from the provided JSON
    

    // Prepare data for the chart
    const reasons = data.map(item => item.Reason_answer);
    const uniqueReasons = reasons.filter((reason, index, self) => self.indexOf(reason) === index);

    const ageGroups = data.map(item => item.age_group);
    const uniqueAgeGroups = ageGroups.filter((ageGroup, index, self) => self.indexOf(ageGroup) === index);

    const seriesData = uniqueAgeGroups.map(ageGroup => {
        return {
            name: ageGroup,
            data: uniqueReasons.map(reason => {
                const entry = data.find(item => item.Reason_answer === reason && item.age_group === ageGroup);
                return entry ? entry.count : 0;
            })
        };
    });

    // Chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar' as const // Use 'as const' to ensure TypeScript understands this is a literal type
        },
        title: {
            text: 'Reasons for Leaving a Job by Age Group'
        },
        xaxis: {
            categories: uniqueReasons,
            labels: {
                show: false // Disable x-axis labels
            },
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

export default JobLeavingReasonsByAgeGroup;