'use client'; // this tag resolves an error when running in dev

import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const styles = { backgroundColor: 'rgb(243, 96, 33)', color: '#fff' }
const TimelineElement = ({heading, description} : {heading: string, description: string}) => (
  <VerticalTimelineElement visible iconStyle={styles} contentStyle={styles}>
    <h1>{heading}</h1>
    <p>{description}</p>
  </VerticalTimelineElement>
)

const MilestonesTimeline = () => (
  <div>
    <VerticalTimeline>
      <TimelineElement
        heading="Project Deployed to App Store"
        description=""
      />
      <TimelineElement
        heading="Project Start"
        description="We began this in December"
      />
    </VerticalTimeline>
  </div>
);

export default MilestonesTimeline;